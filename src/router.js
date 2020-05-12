import Vue from 'vue'
import Router from 'vue-router'


import main from './Main.vue'


const routes = [
    {path:'/main/:mes/:ano',name:'main',component:main}
]

Vue.use(Router)

export default new Router({
    routes
})