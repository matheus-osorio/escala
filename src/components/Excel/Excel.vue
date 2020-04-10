<template>
  <div id="Excel">
      <Options @resetValue="resetValue"   @changeColor="changeColor" class="Options-menu" id="Options"></Options>
     <Painter :colors="colors" id="painter" @resetValue="resetValue"   @changeColor="changeColor"/>
     <Table :return="func" :users="users" :colors="colors" :painting="statusName" id="data"></Table>
  </div>
</template>

<script>
import Painter from './Painter'

import Table from './Table'

import Options from './Options'

export default {
 components:{
     Painter,
     Table,
     Options
 },
 props:['users','colors'],
 data(){
     return {
        statusName:"AT",
        func: {}
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
    grid-template-columns: var(--user-width) 1fr;
    grid-template-rows: var(--space) var(--painter-height) 1fr;
    grid-template-areas: 
    "space space"
    "Options painter"
    "data data";
}

#painter{
    grid-area: painter;
}


#data{
    grid-area: data;
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