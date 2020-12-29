<template>
  <div id="main">
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
    <Escala :users="users" v-if="active == 'Escala'" :colors="colors" :date="date"/>
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
      loadArr:[false,false,false]
    };
  },
  components: {
    Excel,
    Visualizacao,
    Status,
    Escala
  },
  mounted() {
    //const estab = this.$route.params.estab
    this.date.day = 1
    this.date.month = parseInt(this.$route.params.mes)
    this.date.year = parseInt(this.$route.params.ano)
    this.dateText = this.createDateText()
    
    const url = (id) => this.$store.getters.link(id,this.$route.params)

    window.onbeforeunload = this.beforeUnload;

    fetch(url('escala'))
    //fetch(src + `escalaAPI.rule?sys=MDC&mes=${this.date.month}&ano=${this.date.year}&estab=${estab}`)
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

    fetch(url('cor'))
    //fetch(src + `colorAPI.rule?sys=MDC&estab=${estab}`)
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

    fetch(url('hora'))
    //fetch(src + `horaAPI.rule?sys=MDC&estab=${estab}`)
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
    createDateText(){
      const order = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
      return order[this.date.month - 1] + " - " + this.date.year
    },
    beforeUnload(e) {
      e = e || window.event;

      // For IE and Firefox prior to version 4
      if (e) {
        e.returnValue = "Tenha certeza que salvou tudo antes de sair";
      }

      // For Safari
      return "Tenha certeza que salvou tudo antes de sair";
    },

    createStringFromUsers(user,param){
      let string = user.Mat

      user[param].forEach(status => {
        string += ';' + (status === '' ? '-': status)
      })

      return string
    },

     saveData(){
      document.querySelector('body').classList.add('progress-pointer')
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

    resetFilter(resetParameters = false) {
      for (const user of this.users) {
        user.show = true;
      }
      if (resetParameters) {
        this.filterObj = [];
      }
    },
    filterList(filterMode) {
      if (!filterMode) {
        return;
      }
      this.resetFilter();
      console.log('filterObj: ',this.filterObj)
      for (const filter of this.filterObj) {
        const direction = this.columnName[filter.index];
        console.log('direction: ', direction)
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
</style>
