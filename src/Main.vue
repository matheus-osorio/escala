<template>
  <div id="main">
    <!-- a nav possui é o ativador da mudança de página -->
    <nav id="nav" class="navbar navbar-expand-lg navbar-light nav-custom">
      <a class="navbar-brand" href="#">
        <img class="Logo" src="./img/logo.svg" alt />
      </a>
      <span class="data-estilo">{{dateText}}</span>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li
            class="nav-item pr-2 pl-2 item-custom"
            :class="{current: active=='Escala'}"
            @click="active='Escala'"
          >
            <a class="nav-link text-light" href="#">Escala de Trabalho</a>
          </li>
          <li
            class="nav-item pr-2 pl-2 item-custom"
            :class="{current: active=='Status'}"
            @click="active='Status'"
          >
            <a class="nav-link text-light" href="#">Status x Dia</a>
          </li>
          <li
            class="nav-item pr-2 pl-2 item-custom"
            :class="{current: active=='Tabela'}"
            @click="active='Tabela'"
          >
            <a class="nav-link text-light" href="#">Tabela</a>
          </li>

          <li
            class="nav-item pr-2 pl-2 item-custom"
            :class="{current: active=='Visualizacao'}"
            @click="active='Visualizacao'"
          >
            <a class="nav-link text-light" href="#">Visualização</a>
          </li>

        </ul>
      </div>
    </nav>

    <div class="corpo" v-if="!loading">
      <Excel
      :func="func"
      :filterObj="filterObj"
      :date="date"
      :users="users"
      :colors="colors"
      :hours="hours"
      :complete="complete"
      v-if="active == 'Tabela'"
      @toggleFilter="filterList"
      @resetFilter="resetFilter(true)"
      @saveData="saveData"
    />
    <Visualizacao :users="users" :colors="colors" v-if="active == 'Visualizacao'" />
    <Status :users="users" v-if="active == 'Status'" :colors="colors"/>
    <Escala :groups="groups" :users="users" v-if="active == 'Escala'" :colors="colors" :date="date"/>
    </div>
  </div>
</template>

<script>
import Excel from "./components/Excel/Excel";
import Visualizacao from "./components/Visualizacao/Visualizacao";
import Status from "./components/Status/Status";
import Escala from './components/Escala/escala'

export default {
  name: "App",
  data() {
    return {
      dateText: {},
      active: "Tabela",
      filterObj: [],
      func: {},
      groups: {},
      columnName: [
        ["number"],
        ["Mat"],
        ["adm"],
        ["CPF"],
        ["residencia"],
        ["VT"],
        ["nasc"],
        ["ASO"],
        ["setor"],
        ["regime"],
        ["salario", "base"],
        ["NOT"],
        ["PER"],
        ["HT"],
        ["salario", "maior"],
        ["ferias"],
        ["user"],
        ["job"]
      ],
      users: [],
      colors: [],
      hours:{},
      date: {},
      complete: true,
      loading:true,
      loadArr:[false,false,false,false,false]
    };
  },
  components: {
    Excel,
    Visualizacao,
    Status,
    Escala
  },
  mounted() {
    //pega os parametros e insere numa variável interna
    this.date.day = 1
    this.date.month = parseInt(this.$route.params.mes)
    this.date.year = parseInt(this.$route.params.ano)
    this.dateText = this.createDateText()
    
    const url = (id) => this.$store.getters.link(id,this.$route.params) //cria função para agilizar a busca pelas APIs

    window.onbeforeunload = this.beforeUnload; //define função antes da página ser fechada

    const cookie = this.getCookies()

    //verifica a existencia do cookie
    if(cookie.token != undefined){
      fetch(url('token').replace('{{mode}}','token'),{
        method:'POST',
        body: cookie.token
      })
      .then(response => response.json())
      .then(obj => {
        //verifica a válidade do cookie
        if(!obj.auth){
            window.location.replace(url('login'))
        }
        
        else{
          this.loadArr[3] = true
          if(this.loadArr.filter(v => !v).length == 0){
            this.loading = false
          }
        }
      })
    }
    else{
      window.location.replace(url('login')) //retorna para a página de login
    }

    fetch(url('grupos')) //busca a API de grupos
    .then(json => json.json())
    .then(obj => {
      const keys = Object.keys(obj)
      const newObj = {}
      keys.forEach(key => {
        obj[key].grupo.forEach(grupo => {
          newObj[grupo] = key
        })
      })

      this.groups = newObj
      this.loadArr[4] = true
      if(this.loadArr.filter(v => !v).length == 0){
        this.loading = false
      }
    })

    fetch(url('escala')) //busca a API dos funcionários
    .then(json => {
      return json.json()
    })
    .then(obj => {
      obj.forEach((user) => {
        this.users.push(user)
        this.loadArr[0] = true
        if(this.loadArr.filter(v => !v).length == 0){
          this.loading = false
        }

      })
    })

    fetch(url('cor')) //busca a API dos status
    .then(json => {
      return json.json()
    })
    .then(obj => {
      obj.forEach((color) => {
        this.colors.push(color)
        this.loadArr[1] = true
        if(this.loadArr.filter(v => !v).length == 0){
          this.loading = false
        }
      })
    })

    fetch(url('hora')) //busca a API de data
    .then(json => {
      return json.json()
    })
    .then(obj => {
      this.hours = obj
      this.loadArr[2] = true
        if(this.loadArr.filter(v => !v).length == 0){
          this.loading = false
        }
    })

    
  },
  methods: {
    createDateText(){ //transforma data em um modelo textual, como Fevereiro - 2021
      const order = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
      return order[this.date.month - 1] + " - " + this.date.year
    },

    setCookie(name,value,days){ //cria novo cookie
      let date = new Date()
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
      const cookie = `${name} = ${value};expires = ${date.toUTCString};path = /`
      document.cookie = cookie
    },

    deleteCookie(name){ //deleta cookie
      let date = new Date()
      date.setTime((2 * 24 * 60 * 60 * 1000))
      const cookie = `${name}=;expires = ${date.toUTCString};path = /`
      document.cookie = cookie
    },  

    getCookies(){ //busca todos os cookies
      let cookies = document.cookie

      cookies = cookies.split('; ')
      
      return cookies.reduce((obj,line) => {
          const values = line.match(/[^=]+/g)
          if(!(values instanceof Array)){
            return obj
          }
          obj[values[0]] = values[1]
          return obj
      },{})
    },
    beforeUnload(e) { //previne o usuário de fechar a página, ele pode não ter salvado
      e = e || window.event;

      // For IE and Firefox prior to version 4
      if (e) {
        e.returnValue = "Tenha certeza que salvou tudo antes de sair";
      }

      // For Safari
      return "Tenha certeza que salvou tudo antes de sair";
    },

    createStringFromUsers(user,param){ //cria uma grande string no formato csv com o matricula seguida do status do funcionário
      let string = user.Mat

      user[param].forEach(status => {
        string += ';' + (status === '' ? '-': status)
      })

      return string
    },

     saveData(){ //salva o status
      document.querySelector('body').classList.add('progress-pointer')
      this.deleteCookie('escala')
      let body = ''
      this.users.forEach(user => {
        body += this.createStringFromUsers(user,'status') + '\n'      
      })
      body = body.slice(0,-1)

      const params = this.$route.params
      params.mode = 'STATUS'

      fetch(this.$store.getters.link('inserir',params),{
        method:'POST',
        cache:'no-store',
        body: body
      })
      .then(() => {
        document.querySelector('body').classList.remove('progress-pointer')
      })
    },

    resetFilter(resetParameters = false) { //reseta o estado dos filtros
      for (const user of this.users) {
        user.show = true;
      }
      if (resetParameters) {
        this.filterObj = [];
      }
    },

    filterList(filterMode) { //essa função está depreciada e provavelmente não tem utilização nenhuma
      if (!filterMode) {
        return;
      }
      this.resetFilter();
      for (const filter of this.filterObj) {
        const direction = this.columnName[filter.index];
        const returned = this.users.filter(user => {
          if (filter.value === undefined) {
            return false;
          }
          const value = direction.reduce((obj, name) => {
            return obj[name];
          }, user);
          return value != filter.value;
        });
        returned.forEach(obj => {
          obj.show = false;
        });
      }
    }
  }
};

</script>


<style>
:root {
  --logo-height: 40px;
  --nav-height: 60px;
  --paint-height: 600px;
  --user-width: 400px;
  --menu-width: 450px;
  --space-view: 50px;
  --space: 0px;
  --painter-height: 200px;
  --painter-width: 500px;
  --vertical-space: 10px;
}

.corpo{
  width: 100%;
  height: 100%;
}

.data-estilo{
  font-family: 'Chilanka', cursive;
}

.nav-custom {
  padding-top: 0px;
  padding-bottom: 0px;
  padding-right: 0px !important;
  background-color: #171a24;
  color: aliceblue;
  height: var(--nav-height);
  grid-area: "nav";
  overflow: hidden;
}

.Logo {
  height: var(--logo-height);
}

.item-custom {
  padding-top: 20px;
  padding-bottom: 20px;
}
.current {
  background: rgb(32, 30, 69);
  background: linear-gradient(
    354deg,
    rgba(32, 30, 69, 1) 1%,
    rgba(31, 104, 111, 1) 60%,
    rgba(23, 242, 255, 1) 100%
  );
}

.progress-pointer {
  cursor: progress !important;
}

#main {
  display: grid;
  grid-template-columns: 1fr;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  grid-template-rows: var(--nav-height) 1fr;
  grid-template-areas: "nav" "table";
}

#nav {
  grid-area: nav;
}

#table {
  grid-area: table;
}


@media print{
    #main{
        height: 100%;
    }
}

</style>
