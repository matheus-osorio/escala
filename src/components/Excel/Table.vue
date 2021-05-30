<template>
  <div class="table-custom">
    <table class="small-text fullsize" v-if="current =='usuarios'" draggable="false">
      <thead class="color-orange">
        <th align="center" class="grid text-nowrap fixed-23 sticky color-orange" draggable="false" > # 
          <i class="fas fa-chevron-down"></i>
          </th>
          <th align="center" class="grid text-nowrap fixed-23 sticky color-orange" draggable="false" > Mat 
            <i class="fas fa-chevron-down"></i>
          </th>
          <th align="center" class="grid text-nowrap fixed-23 sticky color-orange" draggable="false" > Dt Adm 
            <i class="fas fa-chevron-down"></i>
          </th>
          <th align="center" class="grid text-nowrap fixed-23 sticky color-orange" draggable="false" > CPF 
            <i class="fas fa-chevron-down"></i>
          </th>
          <th align="center" class="grid text-nowrap fixed-23 sticky color-orange" draggable="false"  :class="{'dropdown-area': dropdownActivator.func.residencia}"> Residencia 
            <i class="fas fa-chevron-down" @click="dropdownActivator.func.residencia = !dropdownActivator.func.residencia"></i>
            <ndd column='residencia' :changed="dropdownChanged" :filters='dropdownBoolean.residencia' :items="dropdownItems.residencia" @filterActivation='(column) => activateFilter(column)'/>
          </th>
          <th align="center" class="grid text-nowrap fixed-23 sticky color-orange" draggable="false" > VT 
            <i class="fas fa-chevron-down"></i>
          </th>
          <th align="center" class="grid text-nowrap fixed-23 sticky color-orange" draggable="false" > Dt 
              <i class="fas fa-chevron-down"></i>
          </th>
          <th align="center" class="grid text-nowrap fixed-23 sticky color-orange" draggable="false" > Venc 
            <i class="fas fa-chevron-down"></i>
          </th>
          <th align="center" class="grid text-nowrap fixed-23 sticky color-orange" draggable="false"  :class="{'dropdown-area': dropdownActivator.func.setor}"> Setor 
            <i class="fas fa-chevron-down" @click="dropdownActivator.func.setor = !dropdownActivator.func.setor"></i>
            <ndd column='setor' :changed="dropdownChanged" :filters='dropdownBoolean.setor' :items="dropdownItems.setor" @filterActivation='(column) => activateFilter(column)'/>
          </th>
          <th align="center" class="grid text-nowrap fixed-23 sticky color-orange" draggable="false" > Regime 
            <i class="fas fa-chevron-down"></i>
          </th>
          <th align="center" class="grid text-nowrap fixed-23 sticky color-orange" draggable="false" > Salário 
            <i class="fas fa-chevron-down"></i>
          </th>
          <th align="center" class="grid text-nowrap fixed-23 sticky color-orange" draggable="false" > NOT. 
            <i class="fas fa-chevron-down"></i>
          </th>
          <th align="center" class="grid text-nowrap fixed-23 sticky color-orange" draggable="false" > PER. 
            <i class="fas fa-chevron-down"></i>
          </th>
          <th align="center" class="grid text-nowrap fixed-23 sticky color-orange" draggable="false" > H.T. 
            <i class="fas fa-chevron-down"></i>
          </th>
          <th align="center" class="grid text-nowrap fixed-23 sticky color-orange" draggable="false" > Maior 
              <i class="fas fa-chevron-down"></i>
          </th>
          <th align="center" class="grid text-nowrap fixed-23 sticky color-orange" draggable="false" > FÉRIAS 
            <i class="fas fa-chevron-down"></i>
          </th>
          <th align="center" class="grid text-nowrap fixed-23 sticky color-orange" draggable="false" :class="{'dropdown-area': dropdownActivator.func.nome}"> Nome 
            <i class="fas fa-chevron-down"  @click="dropdownActivator.func.nome = !dropdownActivator.func.nome"></i>
            <ndd column='user' :changed="dropdownChanged" :filters='dropdownBoolean.user' :items="dropdownItems.user" @filterActivation='(column) => activateFilter(column)'/>
          </th>
          <th align="center" class="grid text-nowrap fixed-23 sticky color-orange" draggable="false" :class="{'dropdown-area': dropdownActivator.func.funcao}"> Função 
            <i class="fas fa-chevron-down" @click="dropdownActivator.func.funcao = !dropdownActivator.func.funcao"></i>
            <ndd column='job' :changed="dropdownChanged" :filters='dropdownBoolean.job' :items="dropdownItems.job" @filterActivation='(column) => activateFilter(column)'/>
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
          <td class="grid">{{line.user}}</td>
          <td class="grid">{{line.job}}</td>
        </tr>
      </tbody>
    </table>
    <table draggable="false" v-if="current =='status'">
      <thead>
        <th align="center" draggable="false">
          Escala: Aberto
        </th>
        <th align="center" draggable="false">
          {{dateExtended}}
        </th>
        <th draggable="false" align="center" class="grid week" v-for="day in weekDays" :key="day.id" :class="{'weekend weekend-background':day.weekend}">{{day.name}}</th>
      </thead>
      <thead>
        <!--
        <th align="center" class="grid sticky bg-light">Usuário<i class="fas fa-chevron-down" @click="(event) => {toggleDropdown(event,dropdownObjects[16].dropdown)}"></i></th>
        -->
        <th align="center" draggable="false" class="grid sticky bg-light" :class="{'dropdown-area':dropdownActivator.status.usuario}">Usuário
          <i class="fas fa-chevron-down" @click="dropdownActivator.status.usuario = !dropdownActivator.status.usuario"></i>
          <ndd column='user' :filters='dropdownBoolean.user' :items="dropdownItems.user" @filterActivation='(column) => activateFilter(column)'/></th>
        <th draggable="false" align="center" class="grid sticky bg-light" :class="{'dropdown-area': dropdownActivator.status.funcao}">Função
          <i class="fas fa-chevron-down" @click="dropdownActivator.status.funcao = !dropdownActivator.status.funcao"></i>
          <ndd column='job' :filters='dropdownBoolean.job' :items="dropdownItems.job" @filterActivation='(column) => activateFilter(column)'/>
        </th>
        <th draggable="false" align="center" class="grid status sticky bg-light" v-for="(day,index) in days" :key="day.id" :class="{'weekend weekend-background':weekDays[index].weekend}">{{day}}</th>
      </thead>
      <tbody>
        <tr draggable="false" v-for="(line,lindex) in usersFiltered" :key="line.id" class="black-on-hover">
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
            @dragstart="(e) => { e.preventDefault()}"
            @drag="(e) => { e.preventDefault()}"
            @dragover="(e) => { e.preventDefault()}"
            @mouseup="paintRange"
            @mousedown="(event) => {dragRange(event,true)}"
            @mouseenter="selectedArea"
            
            :key="value.id"
            :class="{weekend:weekDays[cindex].weekend}"
          >{{value}}</td>
        </tr>
      </tbody>
    </table>
    <horaExtra  :users="users" v-if="current=='horaExtra'"></horaExtra>
    <hora50  :users="users" v-if="current=='HE50'"></hora50>
    <hora100  :users="users" v-if="current=='HE100'"></hora100>
    <hh  :users="users" v-if="current=='HH'"></hh>

    <Beneficios  ref="ben" :users="users" :colors="colors" :hours="hours" :date="date" v-if="current=='beneficios'"></Beneficios>
  </div>
  
</template>

<script>
import Vue from "vue";
import Beneficios from './Beneficios';
import horaExtra from './horaExtra'
import hora50 from './he50'
import hora100 from './he100'
import hh from './hh'
import ndd from './newDropdown'
export default {
  components: {
    Beneficios,
    horaExtra,
    hora50,
    hora100,
    hh,
    ndd
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
      dropdownObjects: {},
      dropdownActivator:{
        status:{
          usuario:false,
          funcao:false
        },
        func:{
          nome:false,
          funcao:false,
          residencia:false,
          setor:false
        }
      },
      dropdownItems: {},
      dropdownBoolean: {},
      dropdownChanged: {}
    };
  },
  computed: {
    dateExtended(){
      const order = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
      return order[this.date.month - 1] + " - " + this.date.year
    },
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
    createExcelFile(){
      this.$refs.ben.createExcelFile()
    },
    setCookie(name,value,days){
      let date = new Date()
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
      const cookie = `${name} = ${value};expires = ${date.toUTCString()};path = /`
      console.log('cookie: ',cookie)
      document.cookie = cookie
    },
    dropdownItemsCreator(){
      const columns = ['user','job','residencia','setor']
      const users = this.users
      const obj = {}

      columns.forEach(c => {
        this.getSetOfItems(users,obj,c)
      })

      return obj
    },
    dropdownChangedCreator(){
      const keys = Object.keys(this.dropdownItems)
      const obj = {}
      for(let key of keys){
        obj[key] = false
      }

      return obj
    },
    dropdownBooleanCreator(){
      const keys = Object.keys(this.dropdownItems)
      const obj = {}
      for(let key of keys){
        const arr = this.dropdownItems[key]
        obj[key] = {}
        const state = this.users.reduce((obj,user)=> {
          if(obj[key] === undefined){
            obj[key] = {}
          }
          if(obj[key][user[key]] === undefined){
            obj[key][user[key]] = false
          }
          obj[key][user[key]] = obj[key][user[key]] || user.show
          return obj
        },{})

        arr.forEach(i => {
          obj[key][i] = state[key][i]
        })
      }
      return obj
    },
    resetFilter(){
      console.log('Entrou nessa função')
      this.dropdownBoolean = this.dropdownBooleanCreator()
    },
    activateFilter(){
      let ddb = this.dropdownBoolean
      let keys = Object.keys(ddb)
      this.users.forEach(u => u.show = true)
      const newValues = this.users.map(() => true)
      for(let key of keys){
        let values = ddb[key]
        this.users.forEach((u,i) => {
          console.log(values[u[key]])
          newValues[i] =  newValues[i] && values[u[key]]
        })
      }

      this.users.forEach((u,i) => {
        u.show = newValues[i]
      })
      /*let values = ddb[column]
      this.users.forEach(u => {
          u.show = values[u[column]]
      })*/
      
    },
    getSetOfItems(main,obj,item){
      let result = main.map(m => m[item])
      result = Array.from(new Set(result))
      result = result.sort()
      obj[item] = result 
      return obj
    },
    renderBeneficio(){
      console.log(this.$refs)
      //this.$refs.ben.changeKey()
    },
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
      const filtered = this.users.filter(u => u.show)
      Vue.set(filtered[x].status, y, this.painting);
    },
    getXY(event) {
      const target = event.target;
      const coordinates = {};
      coordinates.x = target.getAttribute("line");
      coordinates.y = target.getAttribute("column");
      return coordinates;
    },
    dragRange(event, reset) {
      event.preventDefault();
      if (reset) {
        this.dragCoordinates = [];
      }
      this.dragCoordinates.push(this.getXY(event));
    },
    paintRange(event) {
      event.preventDefault();
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
      const header = ['#','Mat','Dt Adm','CPF','Residencia','VT','Dt','Venc','Setor','Regime','Salário','NOT.','PER.','H.T.','Maior','FÉRIAS','Nome','Função']
      const columnName = [['number'],['Mat'],['adm'],['CPF'],['residencia'],['VT'],['nasc'],['ASO'],['setor'],['regime'],['salario','base'],['NOT'],['PER'],['HT'],['salario','maior'],['ferias'],['user'],['job']]
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
    this.dropdownItems = this.dropdownItemsCreator()
    this.dropdownBoolean = this.dropdownBooleanCreator()
    this.dropdownChanged = this.dropdownChangedCreator()
    this.return.reset = this.resetValues;
    this.return.remake = this.remakeTable;
    this.dropdownObjects = this.createDropdownObjects()

    
    let u = JSON.stringify(this.users)
    setInterval(() => {
      let novo = JSON.stringify(this.users)
      if(u != novo ){
        this.setCookie('escala', 'true',14)
        u = novo
      }
    },(1000 * 60) * 0.1)
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
      el.innerHTML = value.substring(0,10)
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

.dropdown-content {
  display: none;
  position: absolute;
  overflow: scroll;
  background-color: #f9f9f9;
  min-width: 160px;
  max-height: 400px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
}

.dropdown-area:hover .dropdown-content {
  display: block;
}

.dropdown-color-menu{
  position: fixed;
  z-index: 10000;
  top: 0;
  width: 40%;
  margin-left: 25%;
  height: 40px;
  background-color: red;
}

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

.black-on-hover:hover{
  box-shadow: 0 0 20px black;
  
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