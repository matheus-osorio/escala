<template>
  <fragment>
    <button v-if="!icon" :style="colorStyle()" class="btn btn-custom">{{name}}</button>
    <button v-if="icon" :style="colorStyle()" class="btn btn-custom"> <i :class="name"></i></button>
  </fragment>
</template>

<script>
export default {
    props:['color','name','icon'],
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

</style>