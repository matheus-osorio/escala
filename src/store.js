import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //links para o acesso às APIs
    /*urls: {
        escala: 'http://localhost:3000/users',
        cor: 'http://localhost:3000/colors',
        hora: 'http://localhost:3000/hours',
        token: 'http://localhost:3000/tok',
        main: 'http://localhost:8080/medicao/escala/#/main/11/2020/1/1',
        grupos: 'http://localhost:3000/grupos',
        login: 'http://localhost:8080/medicao/escala/#/login/11/2020/1/1',
        print:'http://localhost:3000/colors',
        inserir: '#'
    },*/
    urls:{
        escala: '/medicao/escalaAPI.rule?sys=MDC&mes={{mes}}&ano={{ano}}&estab={{estab}}',
        cor: '/medicao/colorAPI.rule?sys=MDC&estab={{estab}}',
        hora: '/medicao/horaAPI.rule?sys=MDC&estab={{estab}}',
        inserir:'/medicao/inserirEscalaAPI.rule?sys=MDC&mes={{mes}}&ano={{ano}}&estab={{estab}}&modo={{mode}}',
        token: '/medicao/tokenAPI.rule?sys=MDC&mode={{mode}}&sistema=ESCALA',
        main: '/medicao/escala/#/main/{{mes}}/{{ano}}/{{estab}}/{{contrato}}',
        login: '/medicao/escala/#/login/{{mes}}/{{ano}}/{{estab}}/{{contrato}}',
        inserirDia: '/medicao/inserirEscalaAPI.rule?sys=MDC&mes={{mes}}&ano={{ano}}&dia={{dia}}&estab={{estab}}&modo={{mode}}',
        grupos: '/medicao/gruposAPI.rule?sys=MDC&contrato={{contrato}}',
        print: '/medicao/print/#/main/escala/{{mes}}/{{ano}}/{{estab}}/{{contrato}}'
    },
    /*urls:{
      escala: '/dev/escalaAPI.rule?sys=MDC&mes={{mes}}&ano={{ano}}&estab={{estab}}',
      cor: '/dev/colorAPI.rule?sys=MDC&estab={{estab}}',
      hora: '/dev/horaAPI.rule?sys=MDC&estab={{estab}}',
      inserir:'/dev/inserirEscalaAPI.rule?sys=MDC&mes={{mes}}&ano={{ano}}&estab={{estab}}&modo={{mode}}',
      token: '/dev/tokenAPI.rule?sys=MDC&mode={{mode}}&sistema=ESCALA',
      main: '/dev/escala/#/main/{{mes}}/{{ano}}/{{estab}}/{{contrato}}',
      login: '/dev/escala/#/login/{{mes}}/{{ano}}/{{estab}}/{{contrato}}',
      inserirDia: '/dev/inserirEscalaAPI.rule?sys=MDC&mes={{mes}}&ano={{ano}}&dia={{dia}}&estab={{estab}}&modo={{mode}}',
      grupos: '/dev/gruposAPI.rule?sys=MDC&contrato={{contrato}}',
      print: '/dev/print/#/main/escala/{{mes}}/{{ano}}/{{estab}}/{{contrato}}'
  },*/

  },
  mutations: {

  },

  getters: {
    //função para a inserção dos parâmetros no link
    link: (state) => (id, params) => {
      let link = state.urls[id]
      for(let key of Object.keys(params)){
          link = link.replace('{{' + key + '}}',params[key])
      }
      console.log(link)
      return link
    },

    //função para as APIs de inserção
    insert: (state) => (params,mode) => {
        let link = state.urls['inserirDia']
        for(let key of Object.keys(params)){
            link = link.replace('{{' + key + '}}',params[key])
        }

        link = link.replace('{{mode}}',mode)
        console.log(link)
        return link
    }
  
  },

  actions: {

  }
})