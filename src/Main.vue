<template>
  <div id="main">
    <nav id="nav" class="navbar navbar-expand-lg navbar-light nav-custom">
      <a class="navbar-brand" href="#">
        <img class="Logo" src="./img/logo.svg" alt />
      </a>
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
      v-if="active == 'Tabela'"
      @toggleFilter="filterList"
      @resetFilter="resetFilter(true)"
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
      date: {
        day: 13,
        month: 4,
        year: 2020
      }
    };
  },
  components: {
    Excel,
    Visualizacao,
    Status
  },
  mounted() {
    const src = 'http://localhost:3000/'
    window.onbeforeunload = this.beforeUnload;
    fetch(src + 'colors')
    .then(json => {
      console.log(json)
      return json.json()
    })
    .then(obj => {
      obj.forEach((color) => {
        this.colors.push(color)
      })
    })

    fetch(src + 'users')
    .then(json => {
      return json.json()
    })
    .then(obj => {
      obj.forEach((user) => {
        this.users.push(user)
      })
    })

    fetch(src + 'hours')
    .then(json => {
      return json.json()
    })
    .then(obj => {
      this.hours = obj
    })

    this.date.day = 1
    this.date.month = parseInt(this.$route.params.mes) - 1
    this.date.year = parseInt(this.$route.params.ano)
  },
  methods: {
    beforeUnload(e) {
      e = e || window.event;

      // For IE and Firefox prior to version 4
      if (e) {
        e.returnValue = "Tenha certeza que salvou tudo antes de sair";
      }

      // For Safari
      return "Tenha certeza que salvou tudo antes de sair";
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
