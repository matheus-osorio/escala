import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    /*urls: {
      grafico: "/medicao/graficoNovoAPI.rule?sys=MDC&mes={{periodo}}&contrato={{contrato}}", //validado
      periodo: "/medicao/periodoAPI.rule?sys=MDC&mes={{periodo}}&contrato={{contrato}}", //validado
      hoje: "/medicao/statusHojeAPI.rule?sys=MDC&estab={{estab}}", //validado
      cor: "/medicao/colorAPI.rule?sys=MDC&estab={{estab}}", //validado
      //historico: "/medicao/historicoAPI.rule?sys=MDC&contrato={{contrato}}" //validado
      historico: "/medicao/historicoCacheAPI.rule?sys=MDC&contrato={{contrato}}",
      grupo: "/medicao/gruposAPI.rule?sys=MDC&contrato={{contrato}}",
      PPU: "/medicao/ppuTotalAPI.rule?sys=MDC&contrato={{contrato}}",
      contrato: "/medicao/contratoAPI.rule?sys=MDC&contrato={{contrato}}",
      retencao: "/medicao/retencaoAPI.rule?sys=MDC&contrato={{contrato}}",
      escala: "/medicao/escalaAPI.rule?sys=MDC&mes={{mes}}&ano={{ano}}&estab={{estab}}",
      sinistro: "/medicao/sinistralidadeAPI.rule?sys=MDC&contrato={{contrato}}
    }*/
    urls: {
        escala: 'http://localhost:3000/users',
        cor: 'http://localhost:3000/colors',
        hora: 'http://localhost:3000/hours',
        inserir: '#'

    },
    /*urls:{
        escala: '/medicao/escalaAPI.rule?sys=MDC&mes={{mes}}&ano={{ano}}&estab={{estab}}',
        cor: '/medicao/colorAPI.rule?sys=MDC&estab={{estab}}',
        hora: '/medicao/horaAPI.rule?sys=MDC&estab={{estab}}',
        inserir:'/medicao/inserirEscalaAPI.rule?sys=MDC&mes={{mes}}&ano={{ano}}&estab={{estab}}&modo={{mode}}',
        inserirDia: '/medicao/inserirEscalaAPI.rule?sys=MDC&mes={{mes}}&ano={{ano}}&dia={{dia}}&estab={{estab}}&modo={{mode}}'
    },*/
    /*urls:{
        escala: '/dev/escalaAPI.rule?sys=MDC&mes={{mes}}&ano={{ano}}&estab={{estab}}',
        cor: '/dev/colorAPI.rule?sys=MDC&estab={{estab}}',
        hora: '/dev/horaAPI.rule?sys=MDC&estab={{estab}}',
        inserir:'/dev/inserirEscalaAPI.rule?sys=MDC&mes={{mes}}&ano={{ano}}&estab={{estab}}&modo={{mode}}',
        inserirDia: '/dev/inserirEscalaAPI.rule?sys=MDC&mes={{mes}}&ano={{ano}}&dia={{dia}}&estab={{estab}}&modo={{mode}}'
    }*/

  },
  mutations: {

  },

  getters: {
    link: (state) => (id, params) => {
      let link = state.urls[id]
      for(let key of Object.keys(params)){
          link = link.replace('{{' + key + '}}',params[key])
      }
      console.log(link)
      return link
    },

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