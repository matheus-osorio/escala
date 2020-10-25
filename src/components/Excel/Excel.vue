<template>
  <div id="Excel">
     <Options @undoFilter="undoFilter" @resetValue="resetValue" @toggleFilter="toggleFilter" @saveData="$emit('saveData')" @changeColor="changeColor" class="Options-menu" id="Options"></Options>
     <Painter :text="textData" :colors="colors" id="painter" @resetValue="resetValue"   @changeColor="changeColor"></Painter>
     <Extras :current="current" :text="textData" id="extras" @changeCurrent="changeCurrent"></Extras>
     <Table ref="table" :filterObj="filterObj" :filter="filter" :current="current" :date="date" :return="func" :users="users" :colors="colors" :painting="statusName" :hours="hours" :complete="complete" id="data" @toggleFilter="$emit('toggleFilter',filter)"></Table>
  </div>
</template>

<script>

import Painter from './Painter'

import Table from './Table'

import Options from './Options'

import Extras from './Extras'


export default {
 components:{
     Painter,
     Table,
     Options,
     Extras
 },
 props:['users','colors','date','filterObj','func','hours','complete'],
 data(){
     return {
        statusName:"AT",
        textData:{
            color:'blue',
            text:'Valor de Teste',
            hide:true
        },
        current:"usuarios",
        filter:false
     }
 },
 methods:{
     changeColor(newStatus){
         this.statusName = newStatus
     },
     resetValue(){
         this.func.reset()
     },
     changeCurrent(newTable){
         this.current = newTable
         this.$refs.table.renderBeneficio()
     },
     undoFilter(){
         this.filter = false
         this.changeColor(undefined)
         this.users.forEach(user => user.show = true)
         this.$emit('resetFilter')
     },
    toggleFilter(){
        this.changeColor(undefined)
        this.filter = true
    }


 }
}
</script>

<style>


#Excel{
    display:grid;
    grid-template-columns: var(--user-width) var(--painter-width) 1fr;
    grid-template-rows: var(--space) var(--painter-height) 1fr;
    grid-template-areas: 
    "space space space"
    "Options painter extras"
    "data data data";
    overflow-y: scroll;
}

#painter{
    grid-area: painter;
}


#data{
    grid-area: data;
}

#extras{
    grid-area: extras;
}

.Options-menu{
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

#Options{
    grid-area: Options;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
  height:5px;
  margin-right: 2px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 50px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #999999; 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #666666; 
}
</style>