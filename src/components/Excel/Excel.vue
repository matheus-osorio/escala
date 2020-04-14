<template>
  <div id="Excel">
      <Options @resetValue="resetValue"   @changeColor="changeColor" class="Options-menu" id="Options"></Options>
     <Painter :text="textData" :colors="colors" id="painter" @resetValue="resetValue"   @changeColor="changeColor"></Painter>
     <Extended :text="textData" id="text"></Extended>
     <Table :date="date" :return="func" :users="users" :colors="colors" :painting="statusName" id="data"></Table>
  </div>
</template>

<script>

import Painter from './Painter'

import Table from './Table'

import Options from './Options'

import Extended from './Text'

export default {
 components:{
     Painter,
     Table,
     Options,
     Extended
 },
 props:['users','colors','date'],
 data(){
     return {
        statusName:"AT",
        func: {},
        textData:{
            color:'blue',
            text:'Valor de Teste',
            hide:true
        }
     }
 },
 methods:{
     changeColor(newStatus){
         this.statusName = newStatus
     },
     resetValue(){
         this.func.reset()
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
    "Options painter text"
    "data data data";
}

#painter{
    grid-area: painter;
}


#data{
    grid-area: data;
}

#text{
    grid-area: text;
}

.Options-menu{
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

#Options{
    grid-area: Options;
}

</style>