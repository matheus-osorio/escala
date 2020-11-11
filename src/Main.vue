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
  </div>
</template>

<script>
import Excel from "./components/Excel/Excel";
import Visualizacao from "./components/Visualizacao/Visualizacao";
import Status from "./components/Status/Status";

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
      complete: true
    };
  },
  components: {
    Excel,
    Visualizacao,
    Status
  },
  mounted() {
    // const estab = this.$route.params.estab
    this.date.day = 1
    this.date.month = parseInt(this.$route.params.mes)
    this.date.year = parseInt(this.$route.params.ano)
    this.dateText = this.createDateText()
    //const src = 'http://webrun.perbras.com.br:8080/dev/'
    // const src = 'https://webrun.perbras.com.br/medicao/'
    const src = 'http://localhost:3000/'
    window.onbeforeunload = this.beforeUnload;

    fetch(src + 'users')
    // fetch(src + `escalaAPI.rule?sys=MDC&mes=${this.date.month}&ano=${this.date.year}&estab=${estab}`)
    .then(json => {
      return json.json()
    })
    .then(obj => {
      obj.forEach((user) => {
        this.users.push(user)
      })
    })

    fetch(src + 'colors')
    // fetch(src + `colorAPI.rule?sys=MDC&estab=${estab}`)
    .then(json => {
      return json.json()
    })
    .then(obj => {
      obj.forEach((color) => {
        this.colors.push(color)
      })
    })

    fetch(src + `hours`)
    // fetch(src + `horaAPI.rule?sys=MDC&estab=${estab}`)
    .then(json => {
      return json.json()
    })
    .then(obj => {
      this.hours = obj
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
      let bodyStatus = ''
      let bodyHE = ''
      let bodyHE50 = ''
      let bodyHE100 = ''
      let bodyHH = ''
      this.users.forEach(user => {
        bodyStatus += this.createStringFromUsers(user,'status') + '\n'
        bodyHE += this.createStringFromUsers(user,'extra') + '\n'
        bodyHE50 += this.createStringFromUsers(user,'extra50') + '\n'
        bodyHE100 += this.createStringFromUsers(user,'extra100') + '\n'
        bodyHH += this.createStringFromUsers(user,'extrahora') + '\n'
       
      })
      bodyStatus = bodyStatus.slice(0,-1)
      bodyHE = bodyHE.slice(0,-1)
      bodyHE50 = bodyHE50.slice(0,-1)
      bodyHE100 = bodyHE100.slice(0,-1)
      bodyHH = bodyHH.slice(0,-1)


      // const paramStatus = {
      //   method:'POST',
      //   cache:'no-store',
      //   body: bodyStatus
      // }

      // const paramHE = {
      //   method:'POST',
      //   cache:'no-store',
      //   body: bodyHE
      // }
      
      fetch(`https://webrun.perbras.com.br/medicao/inserirEscalaAPI.rule?sys=MDC&mes=${this.date.month}&ano=${this.date.year}&modo=status`,{
        method:'POST',
        cache:'no-store',
        body: bodyStatus
      })
      fetch(`https://webrun.perbras.com.br/medicao/inserirEscalaAPI.rule?sys=MDC&mes=${this.date.month}&ano=${this.date.year}&modo=he`,{
        method:'POST',
        cache:'no-store',
        body: bodyHE
      })
      fetch(`https://webrun.perbras.com.br/medicao/inserirEscalaAPI.rule?sys=MDC&mes=${this.date.month}&ano=${this.date.year}&modo=he50`,{
        method:'POST',
        cache:'no-store',
        body: bodyHE50
      })
      fetch(`https://webrun.perbras.com.br/medicao/inserirEscalaAPI.rule?sys=MDC&mes=${this.date.month}&ano=${this.date.year}&modo=he100`,{
        method:'POST',
        cache:'no-store',
        body: bodyHE100
      })
      fetch(`https://webrun.perbras.com.br/medicao/inserirEscalaAPI.rule?sys=MDC&mes=${this.date.month}&ano=${this.date.year}&modo=hh`,{
        method:'POST',
        cache:'no-store',
        body: bodyHH
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
        console.log(returned);
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
