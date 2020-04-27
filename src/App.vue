<template>
  <div id="app">
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
      v-if="active == 'Tabela'"
      @toggleFilter="filterList"
      @resetFilter="resetFilter(true)"
    />
    <Visualizacao :users="users" :colors="colors" v-if="active == 'Visualizacao'" />
    <Status :users="users" v-if="active == 'Status'" />
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
      users: [{"show":true,"number":7101,"Mat":6597,"adm":"21/05/1973","CPF":"305.659.467-1","residencia":"Rio de Janeiro","VT":"VT MACAÉ","salario":{"base":"12009.66","maior":"12100.15"},"nasc":"09/04/1957","ASO":"06/10/1995","setor":"SPT","regime":158,"NOT":"","PER":"","HT":"","ferias":true,"user":"Humberto Figueroa","job":"Piloto de avião","status":["CC","ST","CC","BT","AT","TT","TT","BT","AT","ST","TT","TT","AT","CC","BT","ST","ST","TT","BT","TT","ST","CC","ST","ST","CC","CC","BT","CC","TT","AT","BT"]},{"show":true,"number":8454,"Mat":8275,"adm":"11/02/1972","CPF":"334.461.735-4","residencia":" Niterói","VT":"SEM VT","salario":{"base":"12006.58","maior":"12103.85"},"nasc":"03/05/1958","ASO":"26/09/1993","setor":"SPM","regime":170,"NOT":"","PER":"","HT":"","ferias":false,"user":"Jandaíra Penha","job":"Engenheiro de Projeto","status":["CC","ST","ST","CC","ST","BT","ST","CC","AT","ST","CC","TT","CC","CC","BT","AT","BT","TT","CC","CC","BT","AT","ST","BT","BT","ST","ST","ST","AT","CC","AT"]},{"show":true,"number":9595,"Mat":7355,"adm":"23/11/1974","CPF":"705.428.50-5","residencia":"Campos","VT":"VT MACAÉ","salario":{"base":"12004.02","maior":"12100.70"},"nasc":"12/10/1998","ASO":"23/03/1968","setor":"OFICINA","regime":168,"NOT":"","PER":"","HT":"","ferias":true,"user":"Antero Alancastre","job":"Engenheiro de Projeto","status":["CC","CC","BT","ST","TT","ST","TT","AT","TT","BT","CC","ST","AT","AT","TT","BT","TT","CC","CC","CC","ST","ST","TT","BT","CC","BT","ST","BT","CC","BT","BT"]},{"show":true,"number":7492,"Mat":1972,"adm":"16/04/1975","CPF":"621.559.958-7","residencia":"Unamar","VT":"VT MACAÉ","salario":{"base":"12006.77","maior":"12108.14"},"nasc":"00/08/1976","ASO":"15/00/1973","setor":"OFICINA","regime":189,"NOT":"","PER":"","HT":"","ferias":true,"user":"Jónatas Galindo","job":"Tecnico de Alguma coisa","status":["BT","ST","TT","BT","CC","TT","ST","ST","BT","TT","CC","BT","TT","CC","TT","ST","BT","TT","CC","CC","AT","TT","AT","ST","CC","BT","TT","ST","TT","AT","BT"]},{"show":true,"number":9096,"Mat":5835,"adm":"05/07/1996","CPF":"150.548.263-5","residencia":"Mar do Norte","VT":"VT MACAÉ","salario":{"base":"12008.75","maior":"12104.05"},"nasc":"11/02/1956","ASO":"06/06/1958","setor":"SPT","regime":176,"NOT":"","PER":"","HT":"","ferias":false,"user":"Hermenegildo Grangeia","job":"Cozinheiro","status":["CC","BT","CC","BT","BT","TT","BT","ST","TT","BT","BT","CC","CC","CC","AT","AT","ST","CC","AT","TT","CC","BT","AT","AT","TT","ST","TT","TT","ST","ST","AT"]},{"show":true,"number":4299,"Mat":8514,"adm":"02/02/1964","CPF":"459.688.771-7","residencia":"Rio de Janeiro","VT":"VT MACAÉ","salario":{"base":"12002.98","maior":"12106.32"},"nasc":"12/06/1978","ASO":"11/07/1971","setor":"SPT","regime":159,"NOT":"","PER":"","HT":"","ferias":false,"user":"Cândida Hipólito","job":"Cientista da computação","status":["CC","BT","ST","AT","AT","TT","AT","CC","BT","ST","TT","ST","CC","BT","ST","ST","AT","AT","TT","BT","CC","CC","CC","AT","AT","CC","AT","TT","ST","BT","AT"]},{"show":true,"number":6776,"Mat":9195,"adm":"16/03/1991","CPF":"911.130.321-8","residencia":"Mar do Norte","VT":"VT MACAÉ","salario":{"base":"12005.63","maior":"12107.80"},"nasc":"01/04/1955","ASO":"09/00/1963","setor":"SPT","regime":171,"NOT":"","PER":"","HT":"","ferias":true,"user":"Eudes Cambezes","job":"Piloto de avião","status":["AT","AT","ST","BT","CC","ST","AT","AT","BT","BT","ST","ST","BT","TT","ST","AT","BT","BT","TT","AT","BT","CC","AT","ST","CC","BT","BT","ST","BT","ST","CC"]},{"show":true,"number":8355,"Mat":5834,"adm":"08/08/1978","CPF":"675.545.457-3","residencia":"Campos","VT":"VT MACAÉ","salario":{"base":"12009.74","maior":"12107.85"},"nasc":"24/05/1986","ASO":"05/03/1987","setor":"SPT","regime":158,"NOT":"","PER":"","HT":"","ferias":true,"user":"Lénia Garrau","job":"Guitarrista","status":["TT","TT","ST","TT","BT","TT","ST","AT","AT","ST","TT","ST","AT","CC","AT","BT","CC","CC","TT","AT","ST","BT","TT","ST","BT","ST","CC","BT","ST","TT","CC"]},{"show":true,"number":2494,"Mat":2738,"adm":"07/09/1962","CPF":"17.168.64-6","residencia":"Rio das Ostras","VT":"SEM VT","salario":{"base":"12004.73","maior":"12104.48"},"nasc":"29/07/1957","ASO":"21/03/1957","setor":"SPT","regime":154,"NOT":"","PER":"","HT":"","ferias":true,"user":"Ilídio Xavier","job":"Engenheiro de Projeto","status":["AT","CC","TT","ST","ST","CC","ST","TT","CC","ST","TT","TT","BT","AT","AT","TT","ST","ST","BT","CC","BT","TT","AT","TT","BT","CC","ST","CC","AT","TT","BT"]},{"show":true,"number":1348,"Mat":9354,"adm":"24/04/1979","CPF":"816.498.641-2","residencia":"Campinas","VT":"VT MACAÉ","salario":{"base":"12002.45","maior":"12102.97"},"nasc":"00/02/1980","ASO":"17/08/1996","setor":"SPM","regime":180,"NOT":"","PER":"","HT":"","ferias":true,"user":"Odete Mourinho","job":"Engenheiro de Projeto","status":["TT","ST","TT","AT","CC","TT","BT","AT","ST","ST","CC","ST","CC","AT","ST","BT","CC","TT","AT","ST","BT","BT","ST","BT","AT","TT","CC","BT","ST","BT","TT"]},{"show":true,"number":7602,"Mat":1724,"adm":"22/02/1970","CPF":"139.728.944-0","residencia":"Campinas","VT":"VT MACAÉ","salario":{"base":"12009.55","maior":"12104.89"},"nasc":"14/05/1974","ASO":"12/08/1983","setor":"SPM","regime":159,"NOT":"","PER":"","HT":"","ferias":true,"user":"Tiago Garrido","job":"Cozinheiro","status":["ST","ST","BT","ST","TT","CC","AT","CC","TT","AT","BT","BT","TT","CC","AT","CC","BT","ST","TT","TT","AT","CC","AT","CC","BT","CC","BT","BT","ST","BT","CC"]},{"show":true,"number":7163,"Mat":7647,"adm":"20/10/1958","CPF":"390.661.338-0","residencia":"Unamar","VT":"VT MACAÉ","salario":{"base":"12009.26","maior":"12108.61"},"nasc":"19/03/1954","ASO":"18/11/1997","setor":"OFICINA","regime":152,"NOT":"","PER":"","HT":"","ferias":true,"user":"Rosália Matoso","job":"Guitarrista","status":["CC","TT","CC","TT","AT","CC","TT","CC","ST","ST","TT","ST","TT","TT","BT","AT","ST","CC","BT","TT","BT","TT","ST","TT","TT","BT","BT","ST","BT","BT","BT"]},{"show":true,"number":2127,"Mat":889,"adm":"06/05/1984","CPF":"62.267.721-3","residencia":"Campinas","VT":"VT MACAÉ","salario":{"base":"12008.82","maior":"12102.65"},"nasc":"08/06/1989","ASO":"05/11/1955","setor":"SPM","regime":180,"NOT":"","PER":"","HT":"","ferias":false,"user":"Jandaíra Penha","job":"Engenheiro de Projeto","status":["ST","BT","BT","BT","ST","CC","BT","CC","CC","ST","CC","BT","AT","CC","AT","ST","CC","ST","ST","ST","CC","AT","AT","AT","TT","ST","CC","TT","ST","ST","AT"]},{"show":true,"number":3268,"Mat":6881,"adm":"14/00/1971","CPF":"213.209.550-3","residencia":"Barra de São João","VT":"VT MACAÉ","salario":{"base":"12000.99","maior":"12102.12"},"nasc":"10/10/1989","ASO":"15/08/1950","setor":"OFICINA","regime":151,"NOT":"","PER":"","HT":"","ferias":true,"user":"Filipe Tupinambá","job":"Tecnico de Alguma coisa","status":["CC","TT","AT","CC","ST","TT","BT","TT","ST","TT","CC","ST","BT","CC","BT","CC","AT","AT","CC","AT","BT","BT","ST","ST","AT","ST","AT","ST","CC","CC","TT"]},{"show":true,"number":921,"Mat":9125,"adm":"24/05/1952","CPF":"682.489.60-4","residencia":"Mar do Norte","VT":"VT MACAÉ","salario":{"base":"12003.65","maior":"12108.06"},"nasc":"09/09/1960","ASO":"10/10/1994","setor":"SPT","regime":156,"NOT":"","PER":"","HT":"","ferias":true,"user":"Florinda Mattos","job":"Engenheiro de Projeto","status":["CC","BT","TT","CC","BT","BT","TT","CC","BT","BT","CC","TT","BT","TT","CC","AT","AT","ST","ST","ST","TT","TT","AT","ST","CC","ST","CC","CC","ST","BT","ST"]},{"show":true,"number":3108,"Mat":4507,"adm":"27/06/1994","CPF":"12.491.241-6","residencia":"São Paulo","VT":"VT MACAÉ","salario":{"base":"12001.29","maior":"12108.93"},"nasc":"21/02/1984","ASO":"21/05/1959","setor":"SPM","regime":162,"NOT":"","PER":"","HT":"","ferias":false,"user":"Feliciana Ramos","job":"Cozinheiro","status":["TT","ST","BT","ST","AT","AT","AT","TT","BT","ST","CC","BT","ST","TT","CC","BT","TT","ST","AT","CC","ST","TT","AT","AT","CC","CC","ST","CC","BT","BT","TT"]},{"show":true,"number":1306,"Mat":9701,"adm":"05/11/1978","CPF":"215.78.262-7","residencia":"Unamar","VT":"SEM VT","salario":{"base":"12002.55","maior":"12107.35"},"nasc":"07/02/1971","ASO":"24/09/1979","setor":"SPM","regime":189,"NOT":"","PER":"","HT":"","ferias":false,"user":"Palmiro Landim","job":"Cozinheiro","status":["BT","CC","CC","ST","TT","AT","TT","TT","BT","AT","BT","CC","AT","BT","TT","CC","ST","ST","AT","AT","CC","CC","CC","ST","BT","AT","AT","CC","CC","AT","CC"]},{"show":true,"number":3763,"Mat":4119,"adm":"23/02/1983","CPF":"345.906.658-4","residencia":"Campinas","VT":"VT MACAÉ","salario":{"base":"12008.57","maior":"12100.49"},"nasc":"29/06/1989","ASO":"03/04/1967","setor":"SPT","regime":153,"NOT":"","PER":"","HT":"","ferias":false,"user":"Moaci Lóio","job":"Cozinheiro","status":["AT","AT","CC","ST","CC","CC","TT","CC","TT","BT","BT","CC","TT","BT","AT","AT","BT","CC","BT","ST","TT","BT","AT","CC","AT","ST","BT","BT","AT","ST","AT"]},{"show":true,"number":6035,"Mat":5482,"adm":"09/05/1967","CPF":"619.403.49-0","residencia":"Rio das Ostras","VT":"VT MACAÉ","salario":{"base":"12000.14","maior":"12107.40"},"nasc":"10/10/1951","ASO":"00/06/1988","setor":"SPM","regime":162,"NOT":"","PER":"","HT":"","ferias":false,"user":"Quintilien Guerra","job":"Engenheiro de Projeto","status":["CC","ST","ST","TT","BT","AT","TT","TT","TT","ST","CC","AT","CC","AT","BT","CC","ST","CC","TT","AT","CC","BT","ST","BT","AT","CC","AT","AT","ST","BT","TT"]},{"show":true,"number":7486,"Mat":3945,"adm":"05/05/1975","CPF":"823.476.490-0","residencia":"Rio de Janeiro","VT":"SEM VT","salario":{"base":"12008.11","maior":"12105.17"},"nasc":"02/08/1950","ASO":"15/01/1974","setor":"SPM","regime":169,"NOT":"","PER":"","HT":"","ferias":true,"user":"Ximeno Fernandes","job":"Quem dirige barco, n sei o nome","status":["CC","TT","TT","ST","AT","ST","BT","AT","TT","ST","BT","TT","BT","CC","ST","TT","TT","AT","TT","TT","AT","AT","TT","TT","CC","BT","CC","ST","AT","AT","BT"]},{"show":true,"number":648,"Mat":3832,"adm":"22/08/1976","CPF":"5.214.760-1","residencia":" Niterói","VT":"SEM VT","salario":{"base":"12000.79","maior":"12104.56"},"nasc":"09/00/1962","ASO":"03/04/1984","setor":"OFICINA","regime":162,"NOT":"","PER":"","HT":"","ferias":true,"user":"Cauê Conde","job":"Cozinheiro","status":["CC","TT","BT","CC","AT","AT","TT","TT","ST","BT","BT","BT","ST","ST","ST","BT","AT","CC","BT","AT","BT","CC","TT","ST","ST","TT","AT","CC","BT","CC","TT"]},{"show":true,"number":2595,"Mat":5010,"adm":"02/07/1966","CPF":"1.386.282-0","residencia":" Niterói","VT":"SEM VT","salario":{"base":"12009.47","maior":"12100.75"},"nasc":"05/09/1983","ASO":"01/08/1963","setor":"SPM","regime":167,"NOT":"","PER":"","HT":"","ferias":false,"user":"Isilda Arouca","job":"Piloto de avião","status":["CC","TT","TT","CC","TT","ST","BT","BT","ST","BT","BT","TT","BT","CC","ST","AT","BT","ST","BT","ST","BT","AT","AT","AT","ST","ST","TT","BT","ST","TT","CC"]},{"show":true,"number":2235,"Mat":117,"adm":"08/11/1997","CPF":"766.199.319-6","residencia":"Mar do Norte","VT":"VT MACAÉ","salario":{"base":"12000.77","maior":"12108.29"},"nasc":"27/04/1961","ASO":"08/00/1998","setor":"SPT","regime":174,"NOT":"","PER":"","HT":"","ferias":false,"user":"Ubirajara Lagoa","job":"Cozinheiro","status":["ST","TT","AT","BT","TT","BT","ST","CC","ST","ST","AT","CC","TT","TT","ST","TT","BT","CC","BT","ST","CC","AT","ST","BT","BT","CC","AT","CC","BT","ST","BT"]},{"show":true,"number":3320,"Mat":7962,"adm":"28/10/1974","CPF":"68.25.392-8","residencia":"Campos","VT":"SEM VT","salario":{"base":"12005.53","maior":"12105.60"},"nasc":"02/02/1986","ASO":"19/10/1965","setor":"SPT","regime":187,"NOT":"","PER":"","HT":"","ferias":false,"user":"Jónatas Galindo","job":"Cientista da computação","status":["BT","AT","AT","CC","TT","TT","BT","TT","ST","BT","ST","BT","AT","ST","BT","AT","BT","TT","ST","TT","ST","BT","AT","AT","TT","TT","AT","BT","TT","TT","BT"]},{"show":true,"number":3693,"Mat":977,"adm":"08/05/1980","CPF":"667.128.482-0","residencia":"Macaé","VT":"VT MACAÉ","salario":{"base":"12009.87","maior":"12106.73"},"nasc":"15/02/1967","ASO":"19/07/1983","setor":"SPM","regime":161,"NOT":"","PER":"","HT":"","ferias":false,"user":"Léia Guilheiro","job":"Guitarrista","status":["TT","AT","BT","AT","BT","ST","AT","CC","CC","BT","CC","CC","CC","BT","BT","BT","TT","AT","AT","ST","CC","CC","BT","BT","ST","BT","AT","ST","TT","TT","CC"]},{"show":true,"number":8695,"Mat":4934,"adm":"24/07/1971","CPF":"615.560.894-3","residencia":"São Paulo","VT":"VT MACAÉ","salario":{"base":"12007.74","maior":"12104.04"},"nasc":"27/09/1964","ASO":"11/05/1997","setor":"OFICINA","regime":157,"NOT":"","PER":"","HT":"","ferias":false,"user":"Léia Guilheiro","job":"Piloto de avião","status":["AT","TT","TT","CC","AT","TT","ST","ST","AT","ST","BT","AT","ST","CC","AT","BT","ST","AT","ST","CC","CC","TT","BT","BT","BT","CC","BT","ST","TT","ST","ST"]},{"show":true,"number":3956,"Mat":8119,"adm":"21/09/1986","CPF":"654.454.16-9","residencia":"Mar do Norte","VT":"SEM VT","salario":{"base":"12003.26","maior":"12105.76"},"nasc":"01/00/1998","ASO":"19/00/1997","setor":"OFICINA","regime":153,"NOT":"","PER":"","HT":"","ferias":false,"user":"José Ríos","job":"Piloto de avião","status":["AT","BT","AT","AT","AT","CC","AT","ST","AT","BT","ST","AT","ST","CC","ST","CC","TT","ST","AT","CC","TT","BT","CC","CC","AT","TT","ST","ST","TT","BT","AT"]},{"show":true,"number":7034,"Mat":1336,"adm":"06/03/1955","CPF":"241.563.499-4","residencia":"Campinas","VT":"SEM VT","salario":{"base":"12004.17","maior":"12104.21"},"nasc":"18/11/1970","ASO":"06/01/1966","setor":"SPT","regime":151,"NOT":"","PER":"","HT":"","ferias":false,"user":"Américo Mirandela","job":"Cozinheiro","status":["BT","TT","AT","TT","BT","CC","CC","ST","BT","ST","AT","ST","ST","BT","AT","AT","AT","CC","CC","TT","AT","CC","CC","TT","AT","BT","CC","AT","AT","TT","TT"]},{"show":true,"number":2199,"Mat":4899,"adm":"13/08/1999","CPF":"574.302.174-6","residencia":"Macaé","VT":"SEM VT","salario":{"base":"12007.56","maior":"12103.20"},"nasc":"16/07/1977","ASO":"00/02/1967","setor":"OFICINA","regime":161,"NOT":"","PER":"","HT":"","ferias":false,"user":"Porfírio Villela","job":"Cientista da computação","status":["TT","ST","ST","AT","BT","CC","AT","BT","AT","ST","ST","ST","ST","CC","BT","ST","BT","BT","ST","ST","BT","CC","CC","ST","CC","BT","BT","CC","BT","BT","AT"]},{"show":true,"number":988,"Mat":8909,"adm":"29/06/1951","CPF":"518.151.715-8","residencia":"Rio de Janeiro","VT":"SEM VT","salario":{"base":"12009.11","maior":"12100.90"},"nasc":"15/04/1954","ASO":"24/07/1994","setor":"SPT","regime":186,"NOT":"","PER":"","HT":"","ferias":true,"user":"Antero Alancastre","job":"Guitarrista","status":["ST","ST","CC","TT","BT","BT","BT","ST","TT","ST","CC","TT","CC","AT","ST","AT","CC","BT","CC","ST","CC","BT","AT","BT","BT","BT","TT","ST","ST","ST","ST"]},{"show":true,"number":8206,"Mat":145,"adm":"27/06/1967","CPF":"117.875.257-5","residencia":"Mar do Norte","VT":"SEM VT","salario":{"base":"12005.57","maior":"12106.53"},"nasc":"01/00/1966","ASO":"18/05/1986","setor":"SPT","regime":158,"NOT":"","PER":"","HT":"","ferias":true,"user":"Berengária Assis","job":"Tecnico de Alguma coisa","status":["TT","ST","TT","TT","ST","TT","BT","CC","AT","CC","TT","BT","BT","CC","BT","TT","AT","ST","BT","ST","ST","CC","ST","BT","TT","ST","ST","CC","TT","CC","AT"]},{"show":true,"number":6270,"Mat":2828,"adm":"12/10/1977","CPF":"835.628.82-4","residencia":"Rio das Ostras","VT":"SEM VT","salario":{"base":"12002.30","maior":"12106.11"},"nasc":"13/07/1981","ASO":"28/02/1994","setor":"OFICINA","regime":165,"NOT":"","PER":"","HT":"","ferias":true,"user":"Isaac, Isaque Neiva","job":"Cientista da computação","status":["BT","TT","AT","CC","TT","ST","BT","ST","CC","TT","ST","AT","ST","AT","AT","AT","TT","AT","AT","BT","AT","BT","BT","CC","CC","TT","ST","AT","ST","AT","ST"]},{"show":true,"number":5650,"Mat":7999,"adm":"11/02/1989","CPF":"931.317.106-8","residencia":"Barra de São João","VT":"SEM VT","salario":{"base":"12000.67","maior":"12103.59"},"nasc":"05/00/1962","ASO":"21/09/1955","setor":"OFICINA","regime":176,"NOT":"","PER":"","HT":"","ferias":true,"user":"Claudemira Neto","job":"Piloto de avião","status":["ST","CC","ST","BT","AT","AT","ST","CC","CC","ST","TT","TT","ST","AT","BT","BT","ST","AT","AT","BT","AT","BT","BT","ST","ST","ST","ST","TT","CC","AT","TT"]},{"show":true,"number":3904,"Mat":6968,"adm":"13/00/1974","CPF":"308.799.382-1","residencia":"Campinas","VT":"SEM VT","salario":{"base":"12006.13","maior":"12100.54"},"nasc":"07/08/1990","ASO":"00/08/1950","setor":"SPM","regime":188,"NOT":"","PER":"","HT":"","ferias":true,"user":"Cosperranho Jucá","job":"Quem dirige barco, n sei o nome","status":["TT","BT","ST","ST","CC","BT","CC","TT","TT","CC","BT","TT","ST","AT","CC","CC","CC","BT","ST","CC","TT","AT","AT","CC","AT","TT","TT","AT","AT","ST","ST"]},{"show":true,"number":7289,"Mat":5391,"adm":"28/02/1961","CPF":"193.647.42-3","residencia":"Macaé","VT":"VT MACAÉ","salario":{"base":"12002.94","maior":"12102.48"},"nasc":"07/07/1990","ASO":"28/10/1978","setor":"SPT","regime":159,"NOT":"","PER":"","HT":"","ferias":false,"user":"Cândida Hipólito","job":"Engenheiro de Projeto","status":["BT","ST","AT","AT","AT","ST","BT","ST","BT","BT","AT","TT","BT","ST","ST","CC","CC","ST","BT","ST","TT","TT","CC","ST","AT","BT","ST","ST","BT","TT","TT"]},{"show":true,"number":8733,"Mat":151,"adm":"24/07/1957","CPF":"791.555.77-5","residencia":" Niterói","VT":"VT MACAÉ","salario":{"base":"12004.42","maior":"12108.15"},"nasc":"24/06/1953","ASO":"19/11/1966","setor":"OFICINA","regime":150,"NOT":"","PER":"","HT":"","ferias":true,"user":"Berengária Assis","job":"Guitarrista","status":["TT","BT","ST","ST","ST","ST","ST","AT","AT","CC","AT","CC","BT","ST","ST","ST","TT","TT","TT","CC","ST","TT","ST","BT","ST","CC","ST","CC","TT","BT","ST"]},{"show":true,"number":4520,"Mat":5129,"adm":"09/10/1981","CPF":"309.117.395-8","residencia":"Unamar","VT":"SEM VT","salario":{"base":"12006.76","maior":"12109.36"},"nasc":"02/06/1965","ASO":"18/11/1994","setor":"SPM","regime":167,"NOT":"","PER":"","HT":"","ferias":false,"user":"Tristão Monte","job":"Tecnico de Alguma coisa","status":["AT","TT","BT","AT","AT","CC","AT","BT","BT","ST","BT","TT","BT","CC","CC","TT","BT","AT","CC","ST","CC","BT","ST","TT","CC","CC","BT","TT","AT","AT","TT"]},{"show":true,"number":7115,"Mat":77,"adm":"26/02/1977","CPF":"102.243.154-8","residencia":"Campinas","VT":"VT MACAÉ","salario":{"base":"12004.85","maior":"12105.42"},"nasc":"23/05/1986","ASO":"28/04/1958","setor":"SPT","regime":160,"NOT":"","PER":"","HT":"","ferias":false,"user":"Guálter, Walter Vilar","job":"Guitarrista","status":["AT","BT","TT","AT","ST","ST","AT","TT","CC","TT","ST","TT","TT","CC","TT","TT","AT","ST","TT","TT","CC","BT","TT","CC","AT","BT","ST","AT","ST","ST","BT"]},{"show":true,"number":9194,"Mat":2652,"adm":"14/02/1950","CPF":"984.52.199-6","residencia":"Barra de São João","VT":"SEM VT","salario":{"base":"12002.46","maior":"12107.87"},"nasc":"20/07/1975","ASO":"08/04/1975","setor":"OFICINA","regime":156,"NOT":"","PER":"","HT":"","ferias":false,"user":"Álvaro Figueiredo","job":"Quem dirige barco, n sei o nome","status":["CC","TT","ST","TT","BT","AT","ST","BT","CC","BT","CC","BT","CC","AT","AT","AT","BT","TT","AT","BT","AT","ST","ST","AT","AT","TT","BT","CC","TT","CC","CC"]},{"show":true,"number":5859,"Mat":305,"adm":"28/10/1997","CPF":"452.193.234-2","residencia":" Niterói","VT":"SEM VT","salario":{"base":"12004.76","maior":"12109.10"},"nasc":"13/01/1988","ASO":"06/03/1967","setor":"OFICINA","regime":150,"NOT":"","PER":"","HT":"","ferias":false,"user":"Mateus Arouca","job":"Engenheiro de Projeto","status":["ST","AT","BT","TT","ST","ST","CC","ST","ST","BT","TT","TT","CC","AT","TT","TT","TT","TT","CC","BT","AT","AT","AT","ST","AT","ST","AT","BT","AT","CC","CC"]},{"show":true,"number":5040,"Mat":3094,"adm":"01/08/1957","CPF":"986.111.868-3","residencia":"Unamar","VT":"SEM VT","salario":{"base":"12002.29","maior":"12107.52"},"nasc":"03/02/1993","ASO":"22/07/1974","setor":"SPM","regime":160,"NOT":"","PER":"","HT":"","ferias":false,"user":"Aida Pitangui","job":"Cientista da computação","status":["BT","ST","CC","CC","CC","BT","BT","ST","AT","AT","TT","AT","BT","ST","ST","CC","AT","AT","BT","CC","ST","TT","CC","BT","TT","TT","AT","BT","BT","AT","AT"]},{"show":true,"number":1311,"Mat":1615,"adm":"01/07/1962","CPF":"137.465.577-9","residencia":"Rio de Janeiro","VT":"VT MACAÉ","salario":{"base":"12003.27","maior":"12102.19"},"nasc":"10/04/1980","ASO":"06/05/1985","setor":"SPM","regime":174,"NOT":"","PER":"","HT":"","ferias":false,"user":"Jorgina Paes","job":"Piloto de avião","status":["BT","TT","AT","AT","TT","AT","ST","AT","ST","ST","BT","AT","CC","CC","AT","ST","CC","ST","TT","TT","CC","BT","AT","CC","BT","BT","CC","ST","AT","CC","TT"]},{"show":true,"number":9653,"Mat":5811,"adm":"28/03/1985","CPF":"0.736.122-0","residencia":"Campos","VT":"VT MACAÉ","salario":{"base":"12006.26","maior":"12104.33"},"nasc":"00/01/1988","ASO":"24/11/1983","setor":"SPM","regime":189,"NOT":"","PER":"","HT":"","ferias":true,"user":"Ricardina Albernaz","job":"Piloto de avião","status":["CC","ST","ST","AT","BT","BT","TT","BT","BT","TT","ST","BT","AT","AT","CC","AT","ST","CC","ST","TT","CC","AT","CC","CC","CC","CC","CC","AT","ST","AT","AT"]},{"show":true,"number":4774,"Mat":2437,"adm":"23/08/1973","CPF":"830.748.867-6","residencia":" Niterói","VT":"SEM VT","salario":{"base":"12007.75","maior":"12108.85"},"nasc":"20/10/1967","ASO":"09/03/1986","setor":"OFICINA","regime":164,"NOT":"","PER":"","HT":"","ferias":false,"user":"Lineu Robalo","job":"Cozinheiro","status":["ST","BT","TT","CC","TT","TT","BT","ST","CC","AT","BT","AT","BT","CC","TT","AT","ST","CC","AT","BT","ST","BT","TT","AT","CC","CC","CC","AT","AT","AT","AT"]},{"show":true,"number":2701,"Mat":5536,"adm":"06/01/1998","CPF":"141.4.292-5","residencia":"Macaé","VT":"SEM VT","salario":{"base":"12008.09","maior":"12105.86"},"nasc":"17/04/1960","ASO":"00/10/1956","setor":"SPT","regime":169,"NOT":"","PER":"","HT":"","ferias":true,"user":"Josias Machado","job":"Quem dirige barco, n sei o nome","status":["AT","TT","AT","AT","ST","CC","ST","BT","AT","ST","BT","BT","CC","TT","CC","ST","BT","TT","BT","BT","TT","AT","AT","CC","AT","ST","ST","TT","CC","TT","ST"]},{"show":true,"number":1488,"Mat":9675,"adm":"01/03/1972","CPF":"185.544.395-9","residencia":"Mar do Norte","VT":"SEM VT","salario":{"base":"12002.58","maior":"12106.66"},"nasc":"22/04/1990","ASO":"11/07/1978","setor":"OFICINA","regime":156,"NOT":"","PER":"","HT":"","ferias":true,"user":"Heloísa Severo","job":"Quem dirige barco, n sei o nome","status":["TT","TT","AT","ST","TT","TT","TT","CC","BT","CC","CC","CC","ST","TT","BT","TT","CC","TT","TT","BT","ST","ST","CC","ST","AT","TT","ST","BT","AT","ST","TT"]},{"show":true,"number":5227,"Mat":1436,"adm":"05/00/1963","CPF":"210.100.581-2","residencia":" Niterói","VT":"VT MACAÉ","salario":{"base":"12004.26","maior":"12104.09"},"nasc":"04/02/1982","ASO":"07/06/1988","setor":"SPT","regime":181,"NOT":"","PER":"","HT":"","ferias":true,"user":"Palmiro Landim","job":"Piloto de avião","status":["AT","CC","TT","AT","CC","AT","TT","ST","ST","TT","BT","TT","BT","ST","CC","AT","BT","TT","ST","TT","TT","CC","BT","ST","CC","TT","AT","ST","TT","ST","TT"]},{"show":true,"number":609,"Mat":9207,"adm":"14/06/1983","CPF":"546.380.205-0","residencia":"Mar do Norte","VT":"VT MACAÉ","salario":{"base":"12005.99","maior":"12103.32"},"nasc":"26/06/1996","ASO":"15/11/1985","setor":"SPT","regime":156,"NOT":"","PER":"","HT":"","ferias":true,"user":"Joaquim Viveiros","job":"Guitarrista","status":["CC","BT","BT","TT","CC","ST","CC","TT","AT","AT","BT","BT","BT","BT","ST","TT","BT","TT","ST","BT","ST","AT","AT","TT","CC","ST","CC","TT","AT","AT","CC"]},{"show":true,"number":489,"Mat":6805,"adm":"10/06/1982","CPF":"617.841.360-1","residencia":" Niterói","VT":"SEM VT","salario":{"base":"12009.66","maior":"12104.80"},"nasc":"15/09/1987","ASO":"21/09/1995","setor":"SPM","regime":185,"NOT":"","PER":"","HT":"","ferias":false,"user":"Collin Porto","job":"Engenheiro de Projeto","status":["CC","CC","AT","BT","ST","AT","ST","ST","CC","BT","AT","BT","BT","AT","ST","BT","CC","CC","BT","CC","CC","TT","AT","TT","AT","TT","CC","AT","AT","ST","TT"]},{"show":true,"number":9251,"Mat":5082,"adm":"15/10/1961","CPF":"462.425.4-9","residencia":"Macaé","VT":"VT MACAÉ","salario":{"base":"12003.33","maior":"12107.36"},"nasc":"00/01/1984","ASO":"09/02/1991","setor":"SPT","regime":156,"NOT":"","PER":"","HT":"","ferias":true,"user":"Marli Santos","job":"Engenheiro de Projeto","status":["CC","CC","CC","AT","BT","BT","CC","BT","AT","CC","TT","TT","TT","CC","ST","TT","TT","AT","AT","AT","ST","BT","BT","CC","TT","CC","CC","BT","CC","BT","BT"]},{"show":true,"number":971,"Mat":255,"adm":"01/02/1974","CPF":"365.358.781-7","residencia":"Mar do Norte","VT":"VT MACAÉ","salario":{"base":"12004.15","maior":"12105.01"},"nasc":"20/01/1966","ASO":"21/06/1986","setor":"OFICINA","regime":156,"NOT":"","PER":"","HT":"","ferias":true,"user":"Bibiana Soares","job":"Cozinheiro","status":["CC","TT","BT","AT","CC","CC","CC","TT","BT","BT","CC","BT","CC","ST","AT","BT","AT","CC","TT","CC","ST","AT","CC","AT","ST","CC","TT","AT","AT","BT","AT"]},{"show":true,"number":5609,"Mat":1096,"adm":"06/02/1964","CPF":"732.379.468-6","residencia":"Rio de Janeiro","VT":"SEM VT","salario":{"base":"12005.79","maior":"12109.32"},"nasc":"25/10/1976","ASO":"01/06/1965","setor":"OFICINA","regime":176,"NOT":"","PER":"","HT":"","ferias":false,"user":"Ramiro Castanheira","job":"Cozinheiro","status":["TT","TT","AT","ST","CC","AT","BT","TT","TT","BT","BT","BT","TT","TT","BT","ST","BT","AT","TT","AT","BT","TT","BT","CC","AT","BT","BT","ST","ST","BT","AT"]},{"show":true,"number":304,"Mat":9777,"adm":"15/10/1969","CPF":"805.565.38-1","residencia":"Mar do Norte","VT":"VT MACAÉ","salario":{"base":"12001.64","maior":"12107.08"},"nasc":"10/09/1971","ASO":"15/01/1997","setor":"OFICINA","regime":169,"NOT":"","PER":"","HT":"","ferias":false,"user":"Uriel Galante","job":"Guitarrista","status":["BT","AT","TT","BT","AT","BT","TT","AT","CC","BT","AT","CC","AT","CC","ST","TT","ST","AT","TT","ST","BT","CC","CC","TT","BT","ST","TT","AT","TT","ST","ST"]},{"show":true,"number":5077,"Mat":7601,"adm":"28/09/1970","CPF":"411.302.69-8","residencia":"Barra de São João","VT":"SEM VT","salario":{"base":"12004.24","maior":"12107.82"},"nasc":"02/10/1961","ASO":"27/00/1981","setor":"SPM","regime":167,"NOT":"","PER":"","HT":"","ferias":false,"user":"Márcio Viveiros","job":"Engenheiro de Projeto","status":["AT","CC","AT","AT","BT","AT","ST","CC","CC","TT","CC","ST","AT","ST","ST","ST","BT","ST","CC","TT","AT","ST","BT","TT","ST","ST","AT","BT","CC","BT","BT"]},{"show":true,"number":3966,"Mat":1512,"adm":"00/07/1982","CPF":"877.141.180-0","residencia":"Campinas","VT":"VT MACAÉ","salario":{"base":"12008.77","maior":"12101.32"},"nasc":"09/03/1960","ASO":"28/05/1958","setor":"OFICINA","regime":166,"NOT":"","PER":"","HT":"","ferias":false,"user":"Glória Cezar","job":"Cientista da computação","status":["TT","ST","TT","AT","AT","AT","CC","TT","TT","ST","AT","ST","CC","AT","ST","AT","TT","ST","CC","TT","TT","AT","BT","TT","TT","CC","BT","TT","ST","TT","TT"]},{"show":true,"number":9943,"Mat":7543,"adm":"20/02/1982","CPF":"703.183.142-3","residencia":"Barra de São João","VT":"VT MACAÉ","salario":{"base":"12005.99","maior":"12109.98"},"nasc":"13/08/1959","ASO":"13/02/1999","setor":"OFICINA","regime":153,"NOT":"","PER":"","HT":"","ferias":true,"user":"Tristão Monte","job":"Engenheiro de Projeto","status":["BT","CC","TT","CC","TT","AT","CC","AT","AT","TT","ST","AT","ST","BT","BT","TT","BT","CC","AT","BT","TT","TT","TT","AT","AT","ST","ST","ST","CC","ST","AT"]},{"show":true,"number":5892,"Mat":3698,"adm":"27/06/1989","CPF":"846.595.570-8","residencia":" Niterói","VT":"SEM VT","salario":{"base":"12003.92","maior":"12108.35"},"nasc":"18/10/1980","ASO":"04/02/1980","setor":"SPM","regime":151,"NOT":"","PER":"","HT":"","ferias":false,"user":"Pandora Cardin","job":"Engenheiro de Projeto","status":["TT","ST","ST","TT","CC","BT","TT","ST","AT","ST","BT","AT","ST","ST","AT","BT","AT","TT","TT","TT","TT","TT","CC","ST","ST","ST","AT","CC","TT","ST","CC"]},{"show":true,"number":8488,"Mat":5507,"adm":"00/06/1971","CPF":"255.431.129-0","residencia":"Unamar","VT":"SEM VT","salario":{"base":"12002.12","maior":"12102.24"},"nasc":"03/01/1968","ASO":"11/02/1997","setor":"SPT","regime":152,"NOT":"","PER":"","HT":"","ferias":true,"user":"Lorena Cavalheiro","job":"Quem dirige barco, n sei o nome","status":["CC","TT","TT","BT","AT","BT","TT","ST","TT","AT","BT","ST","TT","BT","ST","AT","ST","TT","BT","CC","AT","TT","ST","BT","CC","AT","ST","ST","ST","TT","AT"]},{"show":true,"number":2595,"Mat":3058,"adm":"20/04/1956","CPF":"120.353.130-2","residencia":" Niterói","VT":"VT MACAÉ","salario":{"base":"12002.08","maior":"12101.30"},"nasc":"08/09/1969","ASO":"14/00/1973","setor":"OFICINA","regime":154,"NOT":"","PER":"","HT":"","ferias":true,"user":"Collin Porto","job":"Guitarrista","status":["ST","CC","TT","TT","TT","TT","BT","BT","CC","CC","AT","CC","TT","ST","ST","ST","CC","CC","CC","CC","TT","CC","CC","AT","CC","CC","CC","CC","ST","CC","AT"]},{"show":true,"number":5528,"Mat":2398,"adm":"06/09/1985","CPF":"486.711.364-5","residencia":"Macaé","VT":"SEM VT","salario":{"base":"12005.58","maior":"12103.25"},"nasc":"06/11/1977","ASO":"00/06/1965","setor":"SPM","regime":168,"NOT":"","PER":"","HT":"","ferias":true,"user":"Filipe Tupinambá","job":"Tecnico de Alguma coisa","status":["TT","TT","BT","CC","TT","ST","CC","TT","AT","BT","AT","AT","CC","BT","AT","TT","BT","TT","AT","CC","TT","BT","BT","TT","CC","CC","AT","BT","BT","ST","ST"]},{"show":true,"number":5433,"Mat":9509,"adm":"07/10/1959","CPF":"18.110.448-5","residencia":"Campos","VT":"SEM VT","salario":{"base":"12003.08","maior":"12106.47"},"nasc":"02/06/1968","ASO":"16/02/1982","setor":"OFICINA","regime":170,"NOT":"","PER":"","HT":"","ferias":false,"user":"Hermenegildo Grangeia","job":"Cientista da computação","status":["CC","ST","TT","TT","TT","AT","TT","BT","AT","AT","AT","TT","CC","CC","TT","ST","AT","BT","AT","ST","AT","ST","BT","ST","BT","ST","ST","BT","BT","BT","CC"]},{"show":true,"number":2239,"Mat":2628,"adm":"06/03/1954","CPF":"206.546.893-6","residencia":"Mar do Norte","VT":"VT MACAÉ","salario":{"base":"12001.76","maior":"12101.90"},"nasc":"23/08/1969","ASO":"09/03/1966","setor":"SPM","regime":156,"NOT":"","PER":"","HT":"","ferias":true,"user":"Sancho Simões","job":"Cientista da computação","status":["ST","ST","AT","ST","BT","CC","TT","AT","TT","AT","TT","AT","ST","BT","AT","AT","BT","BT","TT","TT","ST","AT","TT","CC","BT","CC","TT","CC","TT","AT","BT"]},{"show":true,"number":2869,"Mat":9317,"adm":"25/02/1990","CPF":"442.253.341-2","residencia":"Campos","VT":"VT MACAÉ","salario":{"base":"12004.71","maior":"12106.53"},"nasc":"14/04/1970","ASO":"06/11/1980","setor":"SPT","regime":181,"NOT":"","PER":"","HT":"","ferias":true,"user":"Flávia Vasconcelos","job":"Piloto de avião","status":["BT","ST","BT","AT","BT","CC","AT","BT","TT","TT","ST","BT","AT","TT","AT","ST","AT","AT","CC","BT","BT","AT","BT","ST","ST","ST","ST","BT","BT","ST","CC"]},{"show":true,"number":3530,"Mat":6727,"adm":"03/04/1984","CPF":"942.140.461-2","residencia":"Barra de São João","VT":"VT MACAÉ","salario":{"base":"12008.66","maior":"12104.23"},"nasc":"08/07/1983","ASO":"29/02/1971","setor":"OFICINA","regime":188,"NOT":"","PER":"","HT":"","ferias":true,"user":"Cristiana Espírito Santo","job":"Tecnico de Alguma coisa","status":["CC","BT","TT","ST","BT","AT","AT","BT","BT","CC","CC","CC","TT","ST","CC","BT","CC","ST","BT","CC","ST","TT","ST","AT","CC","CC","TT","CC","AT","BT","ST"]},{"show":true,"number":4605,"Mat":8370,"adm":"07/04/1950","CPF":"780.846.84-7","residencia":"São Paulo","VT":"VT MACAÉ","salario":{"base":"12003.53","maior":"12103.32"},"nasc":"06/01/1963","ASO":"04/06/1973","setor":"SPT","regime":184,"NOT":"","PER":"","HT":"","ferias":false,"user":"Flávia Vasconcelos","job":"Cozinheiro","status":["TT","BT","AT","CC","AT","AT","BT","BT","AT","AT","ST","AT","BT","CC","AT","BT","BT","AT","TT","ST","AT","AT","TT","BT","TT","TT","BT","CC","BT","CC","AT"]},{"show":true,"number":4251,"Mat":9676,"adm":"06/08/1988","CPF":"208.214.714-8","residencia":"Rio de Janeiro","VT":"VT MACAÉ","salario":{"base":"12009.69","maior":"12109.76"},"nasc":"17/10/1956","ASO":"06/02/1987","setor":"SPM","regime":186,"NOT":"","PER":"","HT":"","ferias":true,"user":"Uriel Galante","job":"Guitarrista","status":["ST","ST","ST","ST","ST","ST","ST","BT","ST","TT","CC","AT","BT","CC","CC","BT","CC","ST","TT","TT","TT","BT","AT","TT","ST","AT","TT","BT","ST","BT","AT"]},{"show":true,"number":2408,"Mat":1271,"adm":"04/09/1977","CPF":"396.168.45-5","residencia":"São Paulo","VT":"SEM VT","salario":{"base":"12009.52","maior":"12103.79"},"nasc":"10/01/1966","ASO":"15/03/1968","setor":"SPM","regime":156,"NOT":"","PER":"","HT":"","ferias":true,"user":"Cosperranho Rego","job":"Guitarrista","status":["TT","ST","TT","BT","BT","TT","AT","TT","AT","BT","ST","TT","BT","TT","CC","AT","CC","ST","TT","ST","AT","ST","TT","ST","ST","ST","ST","TT","BT","AT","ST"]},{"show":true,"number":5868,"Mat":3109,"adm":"03/09/1988","CPF":"662.750.194-8","residencia":"Mar do Norte","VT":"VT MACAÉ","salario":{"base":"12007.26","maior":"12100.63"},"nasc":"04/09/1972","ASO":"11/10/1966","setor":"SPM","regime":163,"NOT":"","PER":"","HT":"","ferias":true,"user":"Amália Costa","job":"Cozinheiro","status":["TT","CC","TT","BT","TT","AT","AT","AT","BT","CC","CC","AT","BT","TT","BT","AT","BT","AT","BT","TT","BT","CC","TT","ST","ST","AT","CC","TT","AT","AT","ST"]},{"show":true,"number":6414,"Mat":1402,"adm":"19/06/1989","CPF":"114.291.628-1","residencia":"Rio de Janeiro","VT":"SEM VT","salario":{"base":"12000.66","maior":"12109.67"},"nasc":"26/02/1966","ASO":"25/08/1969","setor":"SPM","regime":158,"NOT":"","PER":"","HT":"","ferias":true,"user":"Heloísa Severo","job":"Engenheiro de Projeto","status":["BT","BT","BT","ST","BT","TT","BT","CC","BT","TT","CC","ST","ST","AT","AT","CC","ST","AT","BT","TT","AT","CC","ST","BT","AT","TT","ST","ST","BT","BT","ST"]},{"show":true,"number":4869,"Mat":3823,"adm":"14/10/1988","CPF":"185.920.598-1","residencia":" Niterói","VT":"SEM VT","salario":{"base":"12007.42","maior":"12108.36"},"nasc":"09/03/1988","ASO":"18/07/1957","setor":"OFICINA","regime":156,"NOT":"","PER":"","HT":"","ferias":false,"user":"Guálter, Walter Vilar","job":"Cientista da computação","status":["CC","AT","TT","BT","AT","TT","ST","CC","BT","AT","AT","ST","AT","TT","ST","TT","CC","CC","TT","TT","TT","BT","AT","TT","CC","TT","ST","TT","TT","BT","AT"]},{"show":true,"number":3636,"Mat":3678,"adm":"20/08/1968","CPF":"948.342.16-1","residencia":"Rio de Janeiro","VT":"SEM VT","salario":{"base":"12000.95","maior":"12103.85"},"nasc":"26/03/1954","ASO":"27/03/1997","setor":"OFICINA","regime":158,"NOT":"","PER":"","HT":"","ferias":true,"user":"Cauê Conde","job":"Engenheiro de Projeto","status":["TT","CC","AT","AT","TT","ST","AT","AT","BT","BT","CC","CC","ST","TT","TT","TT","ST","ST","TT","ST","AT","CC","CC","TT","ST","CC","CC","CC","ST","TT","AT"]},{"show":true,"number":2227,"Mat":8599,"adm":"21/07/1990","CPF":"64.965.8-0","residencia":"Barra de São João","VT":"VT MACAÉ","salario":{"base":"12008.90","maior":"12104.34"},"nasc":"01/07/1952","ASO":"10/09/1961","setor":"SPM","regime":161,"NOT":"","PER":"","HT":"","ferias":true,"user":"Humberto Figueroa","job":"Piloto de avião","status":["ST","ST","AT","CC","TT","TT","CC","AT","CC","AT","BT","AT","AT","AT","AT","AT","TT","CC","ST","AT","CC","CC","TT","AT","BT","AT","TT","BT","AT","CC","AT"]},{"show":true,"number":9681,"Mat":2835,"adm":"15/03/1958","CPF":"610.992.813-9","residencia":"Campos","VT":"SEM VT","salario":{"base":"12004.52","maior":"12106.24"},"nasc":"22/07/1963","ASO":"24/03/1991","setor":"OFICINA","regime":180,"NOT":"","PER":"","HT":"","ferias":false,"user":"Trajano Sanches","job":"Tecnico de Alguma coisa","status":["AT","BT","AT","CC","CC","CC","ST","BT","CC","BT","CC","AT","BT","CC","CC","ST","CC","CC","ST","ST","AT","AT","ST","CC","BT","BT","BT","CC","AT","CC","BT"]},{"show":true,"number":8830,"Mat":8029,"adm":"11/02/1989","CPF":"307.709.262-1","residencia":"Campos","VT":"SEM VT","salario":{"base":"12000.86","maior":"12104.87"},"nasc":"21/09/1997","ASO":"00/07/1950","setor":"SPM","regime":162,"NOT":"","PER":"","HT":"","ferias":true,"user":"Filipe Tupinambá","job":"Engenheiro de Projeto","status":["CC","BT","BT","AT","AT","BT","CC","CC","AT","AT","TT","CC","AT","TT","BT","BT","CC","BT","CC","CC","TT","AT","ST","ST","BT","TT","CC","CC","CC","ST","TT"]},{"show":true,"number":5013,"Mat":2445,"adm":"19/03/1965","CPF":"383.755.997-6","residencia":" Niterói","VT":"VT MACAÉ","salario":{"base":"12002.48","maior":"12103.04"},"nasc":"27/08/1997","ASO":"00/11/1977","setor":"SPM","regime":157,"NOT":"","PER":"","HT":"","ferias":false,"user":"Roquita Quintela","job":"Guitarrista","status":["CC","ST","CC","ST","ST","CC","TT","TT","AT","CC","BT","CC","BT","BT","BT","AT","TT","TT","CC","CC","ST","TT","TT","BT","TT","ST","BT","TT","BT","ST","ST"]},{"show":true,"number":9432,"Mat":6701,"adm":"01/03/1972","CPF":"331.475.852-1","residencia":"Rio das Ostras","VT":"VT MACAÉ","salario":{"base":"12005.17","maior":"12101.56"},"nasc":"27/08/1998","ASO":"21/07/1961","setor":"SPT","regime":188,"NOT":"","PER":"","HT":"","ferias":true,"user":"Olga Vilaverde","job":"Cozinheiro","status":["ST","TT","TT","CC","ST","BT","CC","AT","AT","CC","BT","ST","ST","CC","BT","AT","AT","AT","CC","ST","CC","CC","BT","CC","BT","CC","AT","ST","TT","TT","TT"]},{"show":true,"number":8703,"Mat":3603,"adm":"12/04/1967","CPF":"682.571.432-6","residencia":"Macaé","VT":"SEM VT","salario":{"base":"12008.16","maior":"12100.65"},"nasc":"01/05/1988","ASO":"27/08/1969","setor":"OFICINA","regime":178,"NOT":"","PER":"","HT":"","ferias":false,"user":"Rómulo Bessa","job":"Cozinheiro","status":["BT","AT","ST","BT","CC","TT","AT","CC","BT","CC","TT","BT","CC","ST","ST","CC","TT","ST","CC","TT","ST","TT","CC","CC","CC","CC","ST","CC","CC","AT","BT"]},{"show":true,"number":419,"Mat":2920,"adm":"12/09/1961","CPF":"953.586.643-0","residencia":"Rio de Janeiro","VT":"SEM VT","salario":{"base":"12000.59","maior":"12101.05"},"nasc":"02/07/1994","ASO":"13/11/1970","setor":"OFICINA","regime":159,"NOT":"","PER":"","HT":"","ferias":true,"user":"Casimiro Caeira","job":"Piloto de avião","status":["ST","TT","CC","BT","AT","CC","BT","ST","BT","ST","BT","ST","ST","ST","BT","CC","CC","CC","TT","AT","ST","ST","ST","ST","AT","ST","AT","CC","TT","AT","AT"]},{"show":true,"number":3367,"Mat":7227,"adm":"22/02/1973","CPF":"439.965.860-4","residencia":"Campos","VT":"VT MACAÉ","salario":{"base":"12006.91","maior":"12100.79"},"nasc":"28/01/1961","ASO":"25/05/1969","setor":"SPM","regime":171,"NOT":"","PER":"","HT":"","ferias":true,"user":"Roquita Quintela","job":"Piloto de avião","status":["TT","CC","AT","BT","AT","CC","ST","TT","CC","BT","AT","ST","BT","TT","TT","AT","TT","BT","CC","CC","AT","ST","CC","AT","CC","BT","CC","AT","TT","TT","ST"]},{"show":true,"number":1835,"Mat":3066,"adm":"17/02/1956","CPF":"815.259.392-5","residencia":" Niterói","VT":"SEM VT","salario":{"base":"12009.17","maior":"12101.27"},"nasc":"04/03/1986","ASO":"27/00/1956","setor":"OFICINA","regime":174,"NOT":"","PER":"","HT":"","ferias":true,"user":"Patrícia Pereira","job":"Tecnico de Alguma coisa","status":["AT","ST","AT","TT","TT","AT","AT","AT","BT","CC","TT","AT","AT","CC","BT","ST","BT","BT","BT","TT","BT","ST","ST","BT","ST","BT","ST","ST","ST","CC","CC"]},{"show":true,"number":8900,"Mat":3650,"adm":"28/02/1992","CPF":"212.282.440-3","residencia":" Niterói","VT":"VT MACAÉ","salario":{"base":"12008.70","maior":"12109.65"},"nasc":"07/01/1996","ASO":"27/05/1964","setor":"SPM","regime":173,"NOT":"","PER":"","HT":"","ferias":true,"user":"Edgar Beça","job":"Tecnico de Alguma coisa","status":["TT","ST","ST","BT","TT","AT","TT","CC","CC","ST","BT","TT","TT","TT","AT","CC","BT","CC","CC","ST","ST","TT","TT","TT","CC","ST","BT","TT","TT","CC","AT"]},{"show":true,"number":6930,"Mat":2036,"adm":"04/05/1976","CPF":"85.49.943-9","residencia":"São Paulo","VT":"SEM VT","salario":{"base":"12002.38","maior":"12101.45"},"nasc":"00/09/1994","ASO":"01/02/1978","setor":"SPT","regime":163,"NOT":"","PER":"","HT":"","ferias":false,"user":"Bibiana Soares","job":"Piloto de avião","status":["TT","AT","CC","ST","BT","AT","BT","AT","CC","TT","BT","AT","AT","TT","CC","BT","BT","TT","BT","BT","AT","BT","ST","BT","CC","BT","ST","TT","BT","CC","AT"]},{"show":true,"number":5648,"Mat":4818,"adm":"00/11/1957","CPF":"246.996.869-2","residencia":"Campinas","VT":"SEM VT","salario":{"base":"12005.07","maior":"12104.88"},"nasc":"08/11/1962","ASO":"13/04/1955","setor":"SPT","regime":187,"NOT":"","PER":"","HT":"","ferias":false,"user":"Pandora Cardin","job":"Engenheiro de Projeto","status":["BT","TT","TT","CC","AT","ST","ST","ST","CC","TT","TT","TT","BT","TT","AT","BT","ST","AT","CC","CC","BT","ST","ST","AT","TT","ST","ST","ST","ST","AT","ST"]},{"show":true,"number":1372,"Mat":7856,"adm":"09/00/1985","CPF":"688.67.40-1","residencia":"Rio de Janeiro","VT":"VT MACAÉ","salario":{"base":"12005.98","maior":"12105.22"},"nasc":"26/06/1969","ASO":"13/03/1951","setor":"SPM","regime":188,"NOT":"","PER":"","HT":"","ferias":true,"user":"Joaquim Viveiros","job":"Quem dirige barco, n sei o nome","status":["AT","CC","BT","TT","TT","CC","BT","CC","AT","ST","AT","TT","ST","TT","ST","TT","ST","TT","ST","ST","TT","CC","CC","ST","BT","ST","CC","ST","AT","BT","TT"]},{"show":true,"number":929,"Mat":5330,"adm":"07/06/1968","CPF":"755.624.496-5","residencia":"Rio de Janeiro","VT":"SEM VT","salario":{"base":"12006.06","maior":"12102.53"},"nasc":"22/02/1960","ASO":"08/04/1953","setor":"SPM","regime":182,"NOT":"","PER":"","HT":"","ferias":false,"user":"Edgar Beça","job":"Piloto de avião","status":["BT","ST","CC","ST","CC","TT","BT","AT","CC","TT","BT","TT","CC","BT","AT","TT","AT","AT","ST","CC","TT","AT","BT","CC","ST","AT","CC","AT","TT","BT","ST"]},{"show":true,"number":7917,"Mat":8621,"adm":"08/00/1970","CPF":"36.965.240-2","residencia":"Unamar","VT":"VT MACAÉ","salario":{"base":"12006.43","maior":"12101.68"},"nasc":"12/06/1982","ASO":"28/02/1964","setor":"OFICINA","regime":162,"NOT":"","PER":"","HT":"","ferias":true,"user":"Aida Pitangui","job":"Piloto de avião","status":["CC","AT","ST","TT","AT","AT","ST","AT","AT","TT","AT","CC","BT","BT","ST","BT","TT","ST","AT","BT","ST","TT","AT","BT","BT","TT","CC","ST","BT","AT","TT"]},{"show":true,"number":6853,"Mat":8179,"adm":"20/03/1954","CPF":"707.713.633-0","residencia":"Rio de Janeiro","VT":"SEM VT","salario":{"base":"12003.64","maior":"12100.51"},"nasc":"07/06/1957","ASO":"07/06/1984","setor":"SPM","regime":171,"NOT":"","PER":"","HT":"","ferias":false,"user":"Rómulo Bessa","job":"Quem dirige barco, n sei o nome","status":["TT","BT","BT","CC","CC","AT","CC","TT","BT","BT","CC","TT","BT","BT","TT","BT","CC","CC","ST","BT","ST","TT","AT","ST","ST","BT","ST","CC","TT","TT","AT"]},{"show":true,"number":3489,"Mat":4755,"adm":"13/01/1962","CPF":"773.535.883-7","residencia":"Macaé","VT":"SEM VT","salario":{"base":"12004.05","maior":"12105.82"},"nasc":"10/07/1971","ASO":"28/07/1956","setor":"SPM","regime":172,"NOT":"","PER":"","HT":"","ferias":true,"user":"Vanessa Castella","job":"Cozinheiro","status":["ST","ST","TT","CC","ST","AT","ST","BT","ST","ST","CC","ST","BT","ST","BT","CC","TT","ST","AT","BT","AT","CC","TT","AT","ST","CC","CC","ST","AT","ST","TT"]},{"show":true,"number":3154,"Mat":9724,"adm":"05/10/1958","CPF":"2.395.183-5","residencia":"Macaé","VT":"VT MACAÉ","salario":{"base":"12000.12","maior":"12107.43"},"nasc":"09/05/1993","ASO":"05/06/1984","setor":"OFICINA","regime":188,"NOT":"","PER":"","HT":"","ferias":true,"user":"Tiago Garrido","job":"Cozinheiro","status":["AT","BT","AT","AT","ST","ST","CC","AT","TT","AT","CC","ST","ST","CC","TT","ST","BT","ST","AT","BT","ST","ST","AT","ST","ST","CC","CC","CC","CC","CC","ST"]},{"show":true,"number":3290,"Mat":454,"adm":"16/04/1974","CPF":"89.134.811-6","residencia":"Campinas","VT":"VT MACAÉ","salario":{"base":"12002.43","maior":"12104.21"},"nasc":"20/10/1973","ASO":"03/00/1980","setor":"SPT","regime":183,"NOT":"","PER":"","HT":"","ferias":true,"user":"Leonel Castelo","job":"Quem dirige barco, n sei o nome","status":["AT","AT","ST","BT","AT","CC","AT","TT","ST","TT","BT","BT","ST","TT","CC","CC","AT","ST","BT","AT","CC","AT","TT","ST","ST","AT","ST","BT","ST","AT","TT"]},{"show":true,"number":6643,"Mat":7734,"adm":"03/00/1961","CPF":"727.406.885-6","residencia":"Campos","VT":"VT MACAÉ","salario":{"base":"12008.84","maior":"12107.50"},"nasc":"19/06/1968","ASO":"15/01/1992","setor":"SPT","regime":155,"NOT":"","PER":"","HT":"","ferias":false,"user":"Marli Santos","job":"Tecnico de Alguma coisa","status":["CC","CC","BT","ST","CC","TT","CC","AT","BT","ST","TT","BT","AT","CC","CC","AT","CC","CC","BT","TT","BT","TT","AT","BT","ST","CC","TT","AT","TT","BT","TT"]},{"show":true,"number":6177,"Mat":3576,"adm":"08/01/1959","CPF":"596.811.580-3","residencia":"Mar do Norte","VT":"SEM VT","salario":{"base":"12008.10","maior":"12106.08"},"nasc":"06/08/1955","ASO":"00/03/1984","setor":"OFICINA","regime":180,"NOT":"","PER":"","HT":"","ferias":false,"user":"Marisa Castel-Branco","job":"Quem dirige barco, n sei o nome","status":["CC","AT","BT","BT","TT","TT","TT","BT","ST","BT","CC","ST","CC","BT","ST","CC","BT","ST","CC","TT","TT","CC","ST","CC","CC","AT","TT","AT","AT","CC","CC"]},{"show":true,"number":9239,"Mat":5978,"adm":"05/09/1971","CPF":"438.932.185-9","residencia":"Campos","VT":"SEM VT","salario":{"base":"12007.64","maior":"12104.08"},"nasc":"10/07/1989","ASO":"25/03/1953","setor":"OFICINA","regime":183,"NOT":"","PER":"","HT":"","ferias":false,"user":"Emiliano Angelim","job":"Engenheiro de Projeto","status":["AT","AT","TT","CC","CC","TT","AT","CC","TT","BT","BT","ST","TT","ST","CC","AT","AT","BT","BT","ST","AT","AT","CC","TT","BT","TT","BT","TT","ST","CC","CC"]},{"show":true,"number":4103,"Mat":5438,"adm":"06/02/1992","CPF":"101.573.128-5","residencia":"Macaé","VT":"SEM VT","salario":{"base":"12002.66","maior":"12105.46"},"nasc":"06/04/1982","ASO":"15/11/1996","setor":"SPT","regime":174,"NOT":"","PER":"","HT":"","ferias":true,"user":"Tiago Garrido","job":"Cientista da computação","status":["AT","CC","TT","TT","CC","TT","TT","ST","BT","TT","CC","BT","AT","BT","TT","BT","ST","BT","ST","ST","BT","TT","BT","AT","CC","CC","AT","AT","BT","BT","CC"]},{"show":true,"number":1580,"Mat":6743,"adm":"15/10/1990","CPF":"909.600.49-2","residencia":"Mar do Norte","VT":"SEM VT","salario":{"base":"12006.46","maior":"12100.42"},"nasc":"28/01/1989","ASO":"05/06/1959","setor":"SPM","regime":150,"NOT":"","PER":"","HT":"","ferias":false,"user":"Cauê Conde","job":"Quem dirige barco, n sei o nome","status":["AT","BT","BT","BT","CC","TT","BT","CC","CC","BT","BT","TT","TT","ST","ST","ST","AT","BT","AT","BT","AT","TT","AT","ST","TT","ST","TT","ST","TT","CC","AT"]},{"show":true,"number":1844,"Mat":4268,"adm":"20/11/1993","CPF":"411.507.389-1","residencia":"Rio das Ostras","VT":"SEM VT","salario":{"base":"12009.91","maior":"12104.37"},"nasc":"17/06/1997","ASO":"23/07/1990","setor":"SPT","regime":155,"NOT":"","PER":"","HT":"","ferias":true,"user":"Pandora Cardin","job":"Tecnico de Alguma coisa","status":["TT","BT","ST","BT","AT","TT","BT","CC","AT","BT","TT","TT","CC","AT","TT","CC","TT","TT","TT","CC","CC","ST","AT","TT","AT","AT","BT","CC","AT","TT","BT"]},{"show":true,"number":9825,"Mat":881,"adm":"01/02/1991","CPF":"137.282.922-6","residencia":"Rio de Janeiro","VT":"VT MACAÉ","salario":{"base":"12003.05","maior":"12107.81"},"nasc":"05/01/1959","ASO":"24/07/1955","setor":"SPM","regime":177,"NOT":"","PER":"","HT":"","ferias":false,"user":"Eduardo Valadão","job":"Cozinheiro","status":["CC","ST","ST","CC","ST","TT","TT","ST","BT","BT","CC","TT","AT","CC","TT","AT","CC","CC","CC","CC","CC","CC","AT","BT","TT","CC","BT","TT","BT","CC","CC"]},{"show":true,"number":4284,"Mat":7326,"adm":"21/10/1987","CPF":"767.113.487-7","residencia":" Niterói","VT":"SEM VT","salario":{"base":"12009.78","maior":"12107.49"},"nasc":"06/05/1985","ASO":"00/04/1992","setor":"OFICINA","regime":159,"NOT":"","PER":"","HT":"","ferias":false,"user":"Lénia Garrau","job":"Tecnico de Alguma coisa","status":["TT","CC","BT","CC","BT","BT","AT","ST","ST","TT","BT","CC","ST","BT","AT","AT","BT","BT","BT","AT","ST","BT","AT","CC","CC","TT","CC","ST","BT","ST","TT"]},{"show":true,"number":6164,"Mat":6206,"adm":"10/08/1983","CPF":"884.56.444-0","residencia":"Mar do Norte","VT":"SEM VT","salario":{"base":"12000.46","maior":"12107.63"},"nasc":"15/08/1965","ASO":"03/06/1956","setor":"SPM","regime":166,"NOT":"","PER":"","HT":"","ferias":true,"user":"Márcio Viveiros","job":"Quem dirige barco, n sei o nome","status":["CC","AT","AT","CC","BT","ST","CC","ST","ST","ST","TT","CC","TT","TT","AT","BT","AT","BT","BT","AT","CC","TT","BT","CC","CC","BT","CC","ST","CC","ST","ST"]},{"show":true,"number":1031,"Mat":6097,"adm":"06/06/1976","CPF":"121.467.890-8","residencia":"Barra de São João","VT":"VT MACAÉ","salario":{"base":"12006.20","maior":"12106.86"},"nasc":"27/08/1980","ASO":"26/09/1995","setor":"SPT","regime":154,"NOT":"","PER":"","HT":"","ferias":true,"user":"Leonel Castelo","job":"Engenheiro de Projeto","status":["ST","CC","BT","BT","TT","ST","TT","ST","AT","TT","CC","CC","AT","BT","BT","ST","BT","AT","ST","BT","CC","ST","ST","ST","BT","CC","TT","AT","ST","BT","ST"]}],
      colors: [
        { name: "TT", color: "red", fullName: "nome Completo TT" },
        { name: "AT", color: "blue", fullName: "nome Completo T" },
        { name: "CC", color: "orange", fullName: "nome Completo CC" },
        { name: "BT", color: "purple", fullName: "nome Completo BT" },
        { name: "ST", color: "green", fullName: "nome Completo ST" }
      ],
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
    window.onbeforeunload = this.beforeUnload;
  },
  methods: {
    getUsers() {
      const value = createandomUser(100);
      return value;
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

const randomAno = () => {
  const dia = parseInt(Math.random() * 100) % 30;
  const mes = parseInt(Math.random() * 100) % 12;
  const ano = 1950 + parseInt((Math.random() * 10000) % 50);

  return (
    (dia < 10 ? "0" + dia : dia) +
    "/" +
    (mes < 10 ? "0" + mes : mes) +
    "/" +
    ano
  );
};

const n = {
  show: true,
  number: parseInt(Math.random() * 10000),
  Mat: parseInt(Math.random() * 10000),
  adm: randomAno(),
  CPF:
    parseInt(Math.random() * 1000) +
    "." +
    parseInt(Math.random() * 1000) +
    "." +
    parseInt(Math.random() * 1000) +
    "-" +
    parseInt(Math.random() * 10),
  residencia: [
    "Macaé",
    "São Paulo",
    "Rio das Ostras",
    "Campos",
    "Unamar",
    "Mar do Norte",
    "Barra de São João",
    "Campinas",
    " Niterói",
    "Rio de Janeiro"
  ],
  VT: ["VT MACAÉ", "SEM VT"],
  nasc: randomAno(),
  ASO: randomAno(),
  setor: ["OFICINA", "SPM", "SPT"],
  regime: 150 + parseInt((Math.random() * 100) % 40),
  NOT: "",
  PER: "",
  HT: "",
  ferias: (Math.random() * 10) % 2 == 0,
  user: [
    "Aida Pitangui",
    "Amália Costa",
    "Américo Mirandela",
    "Angélica Lages",
    "Antero Alancastre",
    "Belchior Buenaventura",
    "Berengária Assis",
    "Bibiana Soares",
    "Casimiro Caeira",
    "Cauê Conde",
    "Claudemira Neto",
    "Collin Porto",
    "Conrado Carreiro",
    "Constantino Quirino",
    "Cosperranho Jucá",
    "Cosperranho Rego",
    "Cristiana Espírito Santo",
    "Cândida Hipólito",
    "Edgar Beça",
    "Eduardo Valadão",
    "Elisa Marinho",
    "Eládio Barreto",
    "Emiliano Angelim",
    "Eudes Cambezes",
    "Feliciana Ramos",
    "Filipa Espírito Santo",
    "Filipe Tupinambá",
    "Florinda Mattos",
    "Flávia Vasconcelos",
    "Gaudêncio Taborda",
    "Glória Cezar",
    "Gui Fitas",
    "Guilherme Taveira",
    "Guálter, Walter Vilar",
    "Heitor Nascimento",
    "Heloísa Severo",
    "Heriberto Fidalgo",
    "Hermenegildo Grangeia",
    "Hermesinda Naves",
    "Humberto Figueroa",
    "Hélder Falcão",
    "Ilídio Xavier",
    "Iracema Machado",
    "Isaac, Isaque Neiva",
    "Isilda Arouca",
    "Isilda Bogalho",
    "Jandaíra Penha",
    "Joaquim Viveiros",
    "Jorgina Paes",
    "Josias Machado",
    "José Ríos",
    "Jónatas Azambuja",
    "Jónatas Galindo",
    "Leonel Castelo",
    "Liedson Cotegipe",
    "Lineu Robalo",
    "Lorena Cavalheiro",
    "Léia Guilheiro",
    "Lénia Garrau",
    "Lívia Padilla",
    "Marisa Castel-Branco",
    "Marli Santos",
    "Mateus Arouca",
    "Mateus Freixo",
    "Maíra Luz",
    "Moaci Lóio",
    "Márcio Viveiros",
    "Odete Mourinho",
    "Odilia Penha",
    "Olga Vilaverde",
    "Palmiro Landim",
    "Pandora Cardin",
    "Patrícia Pereira",
    "Porfírio Lousado",
    "Porfírio Villela",
    "Quintilien Guerra",
    "Raimundo Ramírez",
    "Ramiro Castanheira",
    "Ricardina Albernaz",
    "Roberta Velásquez",
    "Roquita Quintela",
    "Rosália Matoso",
    "Rosário Igrejas",
    "Rómulo Bessa",
    "Sabina Ataíde",
    "Sancho Simões",
    "Saul Fiães",
    "Simone Valgueiro",
    "Tiago Garrido",
    "Tibúrcio Miguel",
    "Trajano Sanches",
    "Tristão Monte",
    "Ubirajara Lagoa",
    "Uriel Galante",
    "Vanessa Castella",
    "Vanessa Vilar",
    "Ximeno Fernandes",
    "Zeferino Granjeia",
    "Ágata Bencatel",
    "Álvaro Figueiredo"
  ],
  job: [
    "Tecnico de Alguma coisa",
    "Engenheiro de Projeto",
    "Cientista da computação",
    "Guitarrista",
    "Cozinheiro",
    "Piloto de avião",
    "Quem dirige barco, n sei o nome"
  ],
  status: ["TT", "AT", "BT", "CC", "ST"]
};

function randomIntBetween(initial, final) {
  return parseInt((Math.random() * 1000000000) % (final - initial)) + initial;
}

function statusDays(status, days) {
  const value = [];
  for (let i = 0; i < days; i++) {
    value.push(status[randomIntBetween(0, status.length)]);
  }

  return value;
}

function createandomUser(ammount) {
  const result = [];

  for (let i = 0; i < ammount; i++) {
    let obj = {
      show: true,
      number: parseInt(Math.random() * 10000),
      Mat: parseInt(Math.random() * 10000),
      adm: randomAno(),
      CPF:
        parseInt(Math.random() * 1000) +
        "." +
        parseInt(Math.random() * 1000) +
        "." +
        parseInt(Math.random() * 1000) +
        "-" +
        parseInt(Math.random() * 10),
      residencia: n.residencia[randomIntBetween(0, n.residencia.length)],
      VT: n.VT[randomIntBetween(0, n.VT.length)],
      nasc: randomAno(),
      ASO: randomAno(),
      setor: n.setor[randomIntBetween(0, n.setor.length)],
      regime: 150 + parseInt((Math.random() * 100) % 40),
      NOT: "",
      PER: "",
      HT: "",
      ferias: (Math.random() * 10) % 2 == 0,
      user: n.user[randomIntBetween(0, n.user.length)],
      job: n.job[randomIntBetween(0, n.job.length)],
      status: statusDays(n.status, 31)
    };
    result.push(obj);
  }

  return result;
}
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

#app {
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
