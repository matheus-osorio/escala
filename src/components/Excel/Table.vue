<template>
  <div class="table-custom">
    <Beneficios :users="users" :colors="colors" :hours="hours" v-if="current=='beneficios'"/>
    <table class="small-text fullsize" v-if="current =='usuarios'">
      <thead class="color-orange">
        <th align="center" class="grid text-nowrap fixed-23 sticky color-orange" v-for="data in dropdownObjects" :key="data.id">
          {{data.text}}
          <i class="fas fa-chevron-down" @click="(event) => {toggleDropdown(event,data.dropdown)}"></i>
        </th>
      </thead>
      <tbody>
        <tr v-for="(line,index) in usersFiltered" :class="{'color-grey': index%2 == 1}" :key="line.id" class="fixed-23">
          <td class="grid color-red">{{line.number}}</td>
          <td class="grid">{{line.Mat}}</td>
          <td v-date class="grid">{{line.adm}}</td>
          <td v-cpf class="grid">{{line.CPF}}</td>
          <td class="grid">{{line.residencia}}</td>
          <td class="grid">{{line.VT}}</td>
          <td v-date class="grid">{{line.nasc}}</td>
          <td v-date class="grid">{{line.ASO}}</td>
          <td class="grid">{{line.setor}}</td>
          <td class="grid">{{line.regime}}</td>
          <td v-money class="grid">{{line.salario.base}}</td>
          <td class="grid">{{line.NOT}}</td>
          <td class="grid">{{line.PER}}</td>
          <td class="grid">{{line.HT}}</td>
          <td v-money class="grid">{{line.salario.maior}}</td>
          <td class="grid"><i :class="{'fas fa-times': !line.ferias,'fas fa-check':line.ferias}"></i></td>
          <td class="grid">{{line.job}}</td>
          <td class="grid">{{line.user}}</td>
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
        <th align="center" class="grid week" v-for="day in weekDays" :key="day.id" :class="{'weekend weekend-background':day.weekend}">{{day.name}}</th>
      </thead>
      <thead>
        <th align="center" class="grid sticky bg-light">Usuário <i class="fas fa-chevron-down" @click="(event) => {toggleDropdown(event,dropdownObjects[16].dropdown)}"></i></th>
        <th align="center" class="grid sticky bg-light">Trabalho <i class="fas fa-chevron-down" @click="(event) => {toggleDropdown(event,dropdownObjects[17].dropdown)}"></i></th>
        <th align="center" class="grid status sticky bg-light" v-for="(day,index) in days" :key="day.id" :class="{'weekend weekend-background':weekDays[index].weekend}">{{day}}</th>
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
            :id="'index' + lindex + '-' + cindex"
            v-for="(value,cindex) in line.status"
            @mouseup="paintRange"
            @mousedown="(event) => {dragRange(event,true)}"
            @mouseenter="selectedArea"
            :key="value.id"
            :class="{weekend:weekDays[cindex].weekend}"
          >{{value}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Vue from "vue";
import Dropdown from "./Dropdown";
import Beneficios from './Beneficios';
export default {
  components: {
    Dropdown,
    Beneficios
  },
  props: {
    painting: {},
    colors: {},
    users: {},
    date: {},
    return: {},
    current: {},
    filter: {},
    colorFilter:{},
    filterObj: {},
    dolumnName:{},
    hours:{}
  },
  data() {
    return {
      dragCoordinates: {},
      history: [],
      dropdownObjects: {}
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
      const m = this.date.month - 1;
      const y = this.date.year;
      const date = new Date(y, m, d);
      const startDay = date.getDay();
      const monthSize = this.users[0].status.length;
      const daysOfTheWeek = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
      const daysOfMonth = [];
      for (let i = 0; i < monthSize; i++) {
        let day = (startDay + i) % 7
        let dayName = daysOfTheWeek[day]
        daysOfMonth.push({
          name: dayName,
          weekend: day == 0 || day == 6
        });
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

      if(this.filter){return}

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
          let square = document.querySelector("#" + "index" + x + "-" + y);
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
          let square = document.querySelector("#" + "index" + x + "-" + y);
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
      const excel = el.parentElement.parentElement.parentElement
      while (el) {
          // deal with browser quirks with body/window/document and page scroll
          var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
          var yScroll = el.scrollTop || document.documentElement.scrollTop;
          xPos += el.offsetLeft - xScroll + el.clientLeft;
          yPos += el.offsetTop - yScroll + el.clientTop;

        el = el.offsetParent;
      }
      
      xPos += -excel.parentElement.scrollLeft ;
      yPos += -excel.parentElement.scrollTop;
      
      return {
        x: xPos,
        y: yPos
      };
    },
    createDropdownObjects(){
      const header = ['#','Mat','Dt Adm','CPF','Residencia','VT','Dt','Venc','Setor','Regime','Salário','NOT.','PER.','H.T.','Maior','FÉRIAS','Função','Nome']
      const columnName = [['number'],['Mat'],['adm'],['CPF'],['residencia'],['VT'],['nasc'],['ASO'],['setor'],['regime'],['salario','base'],['NOT'],['PER'],['HT'],['salario','maior'],['ferias'],['job'],['user']]
      const directive = ['none','none','date','cpf','none','none','date','date','none','none','money','none','none','none','money','none','none','none']
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
          setOfItems:array.map((value) => {return {data:value,show:true}}),
          directive: directive[index],
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
    setTimeout(() => {
      this.dropdownObjects = this.createDropdownObjects()
    },1000)
  }
};


Vue.directive('money',{
    inserted(el){
        let value = el.innerHTML
        value = value.replace('.',',').replace(/(\d)(?=(?:\d{3})+,)/,'$1.')
        el.innerHTML = value
    }
})

Vue.directive('date',{
  inserted(el){
    let value = el.innerHTML
      value = value.replace(/(\d{2})(\d{2})(\d{4})/g,'$1/$2/$3')
      el.innerHTML = value
  }
})

Vue.directive('cpf',{
  inserted(el){
    let value = el.innerHTML + ''
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,'$1.$2.$3-$4')
      el.innerHTML = value
  }
})

</script>

<style scoped>

.sticky{
  position: sticky;
  top: 0;
  z-index: 1000;
  border-style: solid;
  border-width: 1px;
}

.weekend{
  filter: grayscale(60%) brightness(80%);
  color:aliceblue ;
  border-color:black !important;
  z-index: 2;
}

.weekend-background{
  filter: grayscale(0%) brightness(100%) !important;
  background-color:lightsalmon !important;
  color:black !important;
}

.week {
  font-size: 0.8rem;
}

.color-red{
  background-color:#ff6a57 !important;
}

.color-orange{
  background-color:#fce51e !important;
}

.color-grey{
  background-color:lightgray;
}

table,
th {
  z-index: -1;
  text-align: center !important;
}
table{
  margin-bottom: 60px;
}
tr{
  text-align: center !important;
}

i{
  cursor:pointer;
}

div {
  width: 100%;
}

.table-custom {
  height: 100%;
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
  filter: grayscale(0%) brightness(100%) !important;
  background-color: #2384b8 !important;
  color:black;
}

.small-text {
  font-size: 0.82rem;
}

.fullsize {
  width: 100%;
  margin-top:23px;
}

.fixed-23{
  line-height: 24px !important;
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