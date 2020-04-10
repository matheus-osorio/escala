<template>
  <div>
     <Nav @changeCurrent="changeCurrent"></Nav>
     <Avaliados v-if="current == 'Dados'" :user="user"></Avaliados>
     <Graphs :user="user" :colors="colors" v-if="current == 'Graficos'"></Graphs>
  </div>
</template>

<script>
import Nav from './Nav'
import Avaliados from './Avaliados'
import Graphs from './Graphs'

export default {
    components:{
        Avaliados,
        Nav,
        Graphs
    },
    props:['user','colors'],
    data(){
        return {
            current:"Dados"
        }
    },
    methods:{
        changeCurrent(value){
            console.log(value)
            this.current = value
        }
    }
}
</script>

<style scoped>

</style>