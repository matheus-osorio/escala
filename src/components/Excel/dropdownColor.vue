<template>
  <div class="dropdown-color">
      <div id="inside-menu">
          <div id="fullname">
              {{fullname}}
          </div>
          <Button @clickEvent="() => $emit('changeColor',color.name)"    @mouseEnterEvent="() => {updateName(color.fullName)}" v-for="color in colors" :color="color.color"  :name="color.name" :key="color.id" ></Button>
      </div>
  </div>
</template>

<script>

import Button from '../shared/Button'

export default {
    props:['colors'],
    data(){
        return {
            fullname: 'TESTE'
        }
    },
    components:{
        Button
    },
    methods:{
        updateName(name){
            this.fullname = name
        }
    },
    mounted(){
    }
}
</script>

<style>

.dropdown-color{
  position: fixed;
  z-index: 10000;
  top: 0;
  width: 40%;
  margin-left: 25%;
  height: 40px;
  background-color: rgba(255, 0, 0, 0);
}

.dropdown-color:hover > #inside-menu{
    transition: 0.8s;
    top: 0;
    background-color:rgba(204, 204, 204, 0.938);
}

#fullname{
    grid-column-start: 1;
    grid-column-end: 11;
    text-align: center;
    vertical-align: center;
    padding-top: 10px;
    height: 60px;
    background-color:rgba(150, 150, 150, 0.938)
}

#inside-menu{
    position: fixed;
    display: grid;
    grid-template-columns: repeat(10,1fr);
    grid-auto-rows: 70px;
    transition: 0.4s;
    padding: 15px;
    top: -600px;
    width: 40%;
    height: 600px;
   
}

#inside-menu:hover{
    transition: 1s;
    top: 0;
    background-color:rgba(204, 204, 204, 0.938);
}


</style>