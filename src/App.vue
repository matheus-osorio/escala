<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light nav-custom">
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

    <Excel :date="date" :users="users" :colors="colors" v-if="active == 'Tabela'" />
    <Visualizacao :users="users" :colors="colors" v-if="active == 'Visualizacao'" />
  </div>
</template>

<script>
import Excel from "./components/Excel/Excel";
import Visualizacao from "./components/Visualizacao/Visualizacao";

export default {
  name: "App",
  data() {
    return {
      active: "Tabela",
      users: [
        {
          user: "Joao da Silva",
          job: "Tecnico de qualquer coisa",
          status: [
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT"
          ]
        },
        {
          user: "Maria das Dores",
          job: "Um trabalho qualquer",
          status: [
            "TT",
            "TT",
            "AT",
            "TT",
            "BT",
            "TT",
            "TT",
            "TT",
            "AT",
            "TT",
            "BT",
            "TT",
            "TT",
            "TT",
            "AT",
            "TT",
            "BT",
            "TT",
            "TT",
            "TT",
            "AT",
            "TT",
            "BT",
            "TT",
            "TT",
            "TT",
            "AT",
            "TT",
            "BT",
            "TT",
            "TT",
            "TT"
          ]
        },
        {
          user: "Joao da Silva",
          job: "Tecnico de qualquer coisa",
          status: [
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT"
          ]
        },
        {
          user: "Maria das Dores",
          job: "Um trabalho qualquer",
          status: [
            "TT",
            "TT",
            "AT",
            "TT",
            "BT",
            "TT",
            "TT",
            "TT",
            "AT",
            "TT",
            "BT",
            "TT",
            "TT",
            "TT",
            "AT",
            "TT",
            "BT",
            "TT",
            "TT",
            "TT",
            "AT",
            "TT",
            "BT",
            "TT",
            "TT",
            "TT",
            "AT",
            "TT",
            "BT",
            "TT",
            "TT",
            "TT"
          ]
        },
        {
          user: "Joao da Silva",
          job: "Tecnico de qualquer coisa",
          status: [
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT"
          ]
        },
        {
          user: "Maria das Dores",
          job: "Um trabalho qualquer",
          status: [
            "TT",
            "TT",
            "AT",
            "TT",
            "BT",
            "TT",
            "TT",
            "TT",
            "AT",
            "TT",
            "BT",
            "TT",
            "TT",
            "TT",
            "AT",
            "TT",
            "BT",
            "TT",
            "TT",
            "TT",
            "AT",
            "TT",
            "BT",
            "TT",
            "TT",
            "TT",
            "AT",
            "TT",
            "BT",
            "TT",
            "TT",
            "TT"
          ]
        },
        {
          user: "Joao da Silva",
          job: "Tecnico de qualquer coisa",
          status: [
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT"
          ]
        },
        {
          user: "Maria das Dores",
          job: "Um trabalho qualquer",
          status: [
            "TT",
            "TT",
            "AT",
            "TT",
            "BT",
            "TT",
            "TT",
            "TT",
            "AT",
            "TT",
            "BT",
            "TT",
            "TT",
            "TT",
            "AT",
            "TT",
            "BT",
            "TT",
            "TT",
            "TT",
            "AT",
            "TT",
            "BT",
            "TT",
            "TT",
            "TT",
            "AT",
            "TT",
            "BT",
            "TT",
            "TT",
            "TT"
          ]
        },
        {
          user: "Joao da Silva",
          job: "Tecnico de qualquer coisa",
          status: [
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT",
            "TT"
          ]
        },
        {
          user: "Maria das Dores",
          job: "Um trabalho qualquer",
          status: [
            "TT",
            "TT",
            "AT",
            "ST",
            "BT",
            "ST",
            "ST",
            "ST",
            "AT",
            "ST",
            "BT",
            "TT",
            "TT",
            "TT",
            "AT",
            "TT",
            "BT",
            "TT",
            "TT",
            "TT",
            "AT",
            "TT",
            "BT",
            "TT",
            "TT",
            "TT",
            "AT",
            "TT",
            "BT",
            "TT",
            "TT",
            "TT"
          ]
        }
      ],
      colors: [
        { name: "TT", color: "red" , fullName:"nome Completo TT"},
        { name: "AT", color: "blue" , fullName:"nome Completo T"},
        { name: "CC", color: "orange" , fullName:"nome Completo CC"},
        { name: "BT", color: "purple" , fullName:"nome Completo BT"},
        { name: "ST", color: "green" , fullName:"nome Completo ST"}
      ],
      date:{
        day:13,
        month:4,
        year: 2020
      }
    };
  },
  components: {
    Excel,
    Visualizacao
  },
  /*mounted() {
    window.onbeforeunload = this.beforeUnload
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
    }
  }*/
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
  --painter-width:500px;
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

#app {
  display: grid;
  grid-template-columns: 1fr;
  height: 100vh;
  grid-template-rows: var(--nav-height) 1fr;
  grid-template-areas: "nav" "table";
}

#table {
  grid-area: "table";
}
</style>
