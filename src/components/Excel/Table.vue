<template>
  <div class="table-custom">
    <table class="small-text fullsize" v-if="current =='usuarios'">
      <thead>
        <th align="center" class="grid text-nowrap" v-for="data in dropdownObjects" :key="data.id">
          {{data.text}}
          <i class="fas fa-chevron-down" @click="(event) => {toggleDropdown(event,data.dropdown)}"></i>
        </th>
      </thead>
      <tbody>
        <tr v-for="line in usersFiltered" :key="line.id">
          <td class="grid">{{line.number}}</td>
          <td class="grid">{{line.Mat}}</td>
          <td class="grid">{{line.adm}}</td>
          <td class="grid">{{line.CPF}}</td>
          <td class="grid">{{line.residencia}}</td>
          <td class="grid">{{line.VT}}</td>
          <td class="grid">{{line.nasc}}</td>
          <td class="grid">{{line.ASO}}</td>
          <td class="grid">{{line.setor}}</td>
          <td class="grid">{{line.regime}}</td>
          <td class="grid">{{line.salario.base}}</td>
          <td class="grid">{{line.NOT}}</td>
          <td class="grid">{{line.PER}}</td>
          <td class="grid">{{line.HT}}</td>
          <td class="grid">{{line.salario.maior}}</td>
          <td class="grid">{{line.ferias}}</td>
          <td class="grid">{{line.user}}</td>
          <td class="grid">{{line.job}}</td>
        </tr>
      </tbody>
    </table>
    <Dropdown :index="index" :filterObj="filterObj" v-for="(column,index) of dropdownObjects" :key="column.id" :params="column.dropdown" @filterClick="addToFilter"></Dropdown>
    <table draggable="false" v-if="current =='status'">
      <thead>
        <th align="center">
          <br />
        </th>
        <th align="center">
          <br />
        </th>
        <th align="center" class="grid week" v-for="day in weekDays" :key="day.id">{{day}}</th>
      </thead>
      <thead>
        <th align="center" class="grid">Usuário</th>
        <th align="center" class="grid">Trabalho</th>
        <th align="center" class="grid status" v-for="day in days" :key="day.id">{{day}}</th>
      </thead>
      <tbody>
        <tr draggable="false" v-for="(line,lindex) in usersFiltered" :key="line.id">
          <td draggable="false" align="center" class="grid info text-nowrap">{{line.user}}</td>
          <td draggable="false" align="center" class="grid info text-nowrap">{{line.job}}</td>
          <td
            draggable="false"
            align="center"
            class="grid status"
            :style="{'background-color': colorObj[value]}"
            :column="cindex"
            :line="lindex"
            :id="'index' + lindex + '' + cindex"
            v-for="(value,cindex) in line.status"
            @mouseup="paintRange"
            @mousedown="(event) => {dragRange(event,true)}"
            @mouseenter="selectedArea"
            :key="value.id"
          >{{value}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Vue from "vue";
import Dropdown from "./Dropdown";

export default {
  components: {
    Dropdown
  },
  props: {
    painting: {},
    colors: {},
    users: {},
    date: {},
    return: {},
    current: {},
    filter: {},
    filterObj: {},
    dolumnName:{}
  },
  data() {
    return {
      dragCoordinates: {},
      history: [],
      dropdownObjects: this.createDropdownObjects()
    };
  },
  computed: {
    days() {
      return this.users[0].status.map((value, index) => index + 1);
    },
    colorObj() {
      const obj = {};

      for (const color of this.colors) {
        obj[color.name] = color.color;
      }

      return obj;
    },
    weekDays() {
      const d = this.date.day;
      const m = this.date.month;
      const y = this.date.year;
      const date = new Date(y, m, d);
      const startDay = date.getDay();
      const monthSize = this.users[0].status.length;
      const daysOfTheWeek = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
      const daysOfMonth = [];
      for (let i = 0; i < monthSize; i++) {
        daysOfMonth.push(daysOfTheWeek[(startDay + i) % 7]);
      }
      return daysOfMonth;
    },
    usersFiltered() {
      const filtered = [];
      for (const user of this.users) {
        if (user.show) {
          filtered.push(user);
        }
      }
      return filtered;
    }
  },
  methods: {
    addToFilter(item){
      const index = this.filterObj.reduce((result, obj, index) => {
        if(obj.index == item.index){
          return index
        }
        return result
      },-1)

      if(index >= 0){
        this.filterObj[index] = {...item}
      }
      else{
        this.filterObj.push({...item})
      }
      this.$emit('toggleFilter')
    },
    newValue(event) {
      if (!this.painting || this.filter) {
        return;
      }
      const coordinates = this.getXY(event);
      this.paintColor(coordinates.x, coordinates.y);
    },
    paintColor(x, y) {
      Vue.set(this.users[x].status, y, this.painting);
    },
    getXY(event) {
      const target = event.target;
      const coordinates = {};
      coordinates.x = target.getAttribute("line");
      coordinates.y = target.getAttribute("column");
      return coordinates;
    },
    dragRange(event, reset) {
      if (reset) {
        this.dragCoordinates = [];
      }
      this.dragCoordinates.push(this.getXY(event));
    },
    paintRange(event) {
      this.makeCopy();

      this.dragRange(event, false);
      let initial = { ...this.dragCoordinates[0] };
      let end = { ...this.dragCoordinates[1] };

      let aux = Math.min(initial.x, end.x);
      end.x = Math.max(initial.x, end.x);
      initial.x = aux;
      aux = Math.min(initial.y, end.y);
      end.y = Math.max(initial.y, end.y);
      initial.y = aux;

      for (let i = initial.x; i <= end.x; i++) {
        for (let j = initial.y; j <= end.y; j++) {
          this.paintColor(i, j);
        }
      }
      this.dragCoordinates = [];
      const xMax = this.users.length;
      const yMax = this.users[0].status.length;

      for (let x = 0; x < xMax; x++) {
        for (let y = 0; y < yMax; y++) {
          let square = document.querySelector("#" + "index" + x + "" + y);
          square.classList.remove("selected");
        }
      }
    },

    makeCopy() {
      this.history.push(
        this.users.map(user => {
          return {
            user: user.user,
            job: user.job,
            status: [...user.status]
          };
        })
      );
    },
    selectedArea(event) {
      if (this.filter) {
        return;
      }

      let i = { ...this.dragCoordinates[0] };

      if (i == undefined) {
        return;
      }

      const e = this.getXY(event);
      let aux = Math.min(i.x, e.x);
      e.x = Math.max(i.x, e.x);
      i.x = aux;
      aux = Math.min(i.y, e.y);
      e.y = Math.max(i.y, e.y);
      i.y = aux;
      const xMax = this.users.length;
      const yMax = this.users[0].status.length;

      for (let x = 0; x < xMax; x++) {
        for (let y = 0; y < yMax; y++) {
          let square = document.querySelector("#" + "index" + x + "" + y);
          if (x >= i.x && x <= e.x && y >= i.y && y <= e.y) {
            square.classList.add("selected");
          } else {
            square.classList.remove("selected");
          }
        }
      }
    },

    resetValues() {
      const xMax = this.users.length;
      const yMax = this.users[0].status.length;
      const last = this.history.pop();
      for (let x = 0; x < xMax; x++) {
        for (let y = 0; y < yMax; y++) {
          Vue.set(this.users[x].status, y, last[x].status[y]);
        }
      }
    },

    toggleDropdown(event, obj) {
      console.log(obj)
      this.updateDropdown(event, obj);
      obj.display = !obj.display;
    },
    updateDropdown(event, obj) {
      const el = event.target.parentNode;

      const values = this.getPosition(el);
      values.width = el.offsetWidth;
      values.y += el.offsetHeight;
      obj.x = values.x;
      obj.y = values.y;
      obj.width = values.width;
    },

    getPosition(el) {
      var xPos = 0;
      var yPos = 0;

      while (el) {
        if (el.tagName == "BODY") {
          // deal with browser quirks with body/window/document and page scroll
          var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
          var yScroll = el.scrollTop || document.documentElement.scrollTop;

          xPos += el.offsetLeft - xScroll + el.clientLeft;
          yPos += el.offsetTop - yScroll + el.clientTop;
        } else {
          // for all other non-BODY elements
          xPos += el.offsetLeft - el.scrollLeft + el.clientLeft;
          yPos += el.offsetTop - el.scrollTop + el.clientTop;
        }

        el = el.offsetParent;
      }
      return {
        x: xPos,
        y: yPos
      };
    },
    createDropdownObjects(){
      const header = ['#','Mat','Dt Adm','CPF','Residencia','VT','Dt','Venc','Setor','Regime','Salário','NOT.','PER.','H.T.','Maior','FÉRIAS','Função','Nome']
     const columnName = [['number'],['Mat'],['adm'],['CPF'],['residencia'],['VT'],['nasc'],['ASO'],['setor'],['regime'],['salario','base'],['NOT'],['PER'],['HT'],['salario','maior'],['ferias'],['user'],['job']]
      const objArray = []
      for(const index in header){

        let obj = {}

        obj.text = header[index]

        
        let identification = columnName[index]

        let array = this.users.map(user => {
          const value = identification.reduce((last, current) => {return last[current]},user)
          return value
        })
        array = Array.from(new Set(array))
        let dropdown = {
          x:0,
          y:0,
          width:0,
          setOfItems:array,
          display:false
        }

        obj.dropdown = dropdown

        objArray.push(obj)
      }

      return objArray
    },
    remakeTable(){
      this.dropdownObjects
    }
  },
  mounted() {
    this.return.reset = this.resetValues;
    this.return.remake = this.remakeTable;
  }
};
</script>

<style scoped>
.week {
  font-size: 0.8rem;
}

table,
th {
  z-index: -1;
}

i{
  cursor:pointer;
}

div {
  width: 100%;
}

.table-custom {
  overflow-x: auto;
}

.grid {
  border-style: solid;
  border-width: 1px;
  cursor: cell;
}

::selection {
  background: rgba(0, 0, 0, 0);
}

.status {
  width: 40px;
}

.info {
  width: 400px;
  height: 27px !important;
  overflow: hidden;
}

.selected {
  background-color: #2384b8 !important;
}

.small-text {
  font-size: 0.9rem;
}

.fullsize {
  width: 100%;
}

.fixed-head {
  height: 32px !important;
  overflow: hidden;
}

.btn-sm-custom {
  height: 28px;
  width: 28px;
}
</style>