<template>
  <div class="areas">
      <Menu @changeCurrent="(prop) => $emit('changeCurrent',prop)"></Menu>
      <Extended :text="text" id="extended"></Extended>
  </div>
</template>

<script>
import Extended from './Text'
import Menu from './Menu'

export default {
    props:{
        text:{},
        current:{}
    },
    components:{
        Extended,
        Menu
    }
}
</script>

<style scoped>
.areas{
    display:grid;
    grid-template-columns: 1fr;
    grid-template-rows: 60% 40%;
    grid-template-areas: 
    "menu"
    "extended";
}

#menu{
    grid-area:menu;
}

#extended{
    grid-area:extended;
}
</style>