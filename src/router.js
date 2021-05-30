import Vue from 'vue'
import Router from 'vue-router'



import login from './login'
import main from './Main.vue'


const routes = [
    {path:'/main/:mes/:ano/:estab/:contrato',name:'main',component:main}, //pagina principal
    {path:'/login/:mes/:ano/:estab/:contrato',name:'login',component:login} //pagina de login
]

Vue.use(Router)

export default new Router({
    routes
})