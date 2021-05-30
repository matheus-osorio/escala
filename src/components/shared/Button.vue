<template>
  <fragment>
    <button  @click="$emit('clickEvent')" @mouseenter="$emit('mouseEnterEvent')" v-if="!icon" :class="{'active':active}" :style="colorStyle()" class="btn btn-custom">{{name}}</button>
    <button @click="$emit('clickEvent')" @mouseenter="$emit('mouseEnterEvent')" v-if="icon" :class="{'active':active}" :style="colorStyle()" class="btn btn-custom"> <i :class="name"></i></button>
  </fragment>
</template>

<script>
export default {
    props:['color','name','icon','active'],
    methods:{
      colorStyle(){
        return {
          
          '--color':this.color

        }
      }
    }
}
</script>

<style scoped>
.btn-custom{
  border-color: var(--color);
  color: var(--color);
  width: 45px;
}

.btn-custom:hover{
  background-color: var(--color);
  color:whitesmoke
}


.active{
  background-color: var(--color);
  color:whitesmoke
}
</style>