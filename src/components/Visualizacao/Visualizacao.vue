<template>
  <div id="visualizacao">
    <User :users="users" id="users" @changeCurrentUser="changeUser"></User>   
    <Dados id="view" :colors="colors" :user="users[current]"/>
  </div>
</template>

<script>
import User from './User'
import Dados from './Dados'


export default {
    components:{
        User,
        Dados
    },
    data(){
        return{
            current: 0
        }
    },
    props:['users','colors'],
    methods:{
        changeUser(index){
            this.current = index
        }
    }
}
</script>

<style scoped>


#visualizacao{
    height: 100vh;
    width: 100%;

    display: grid;

    grid-template-columns: var(--menu-width) var(--vertical-space) 1fr;

    grid-template-rows: var(--space-view) 1fr;

    grid-template-areas: 
    "space space space"
    "users division view";

}

#users{
    grid-area: users;
}

#view{
    grid-area: view;
}
</style>