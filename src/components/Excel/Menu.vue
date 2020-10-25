<template>
    <div id="menu-area">
        <div class="dropdown">
        <button class="dropbtn">Tipo Tabela - (ATUAL: {{nome}})</button>
        <div class="dropdown-content">
        <a href="#" @click="changeCurrent('status')"  :class="{'selected': nome == 'STATUS'}"   >Status</a>
        <a href="#" @click="changeCurrent('usuarios')" :class="{'selected': nome == 'FUNCIONÁRIOS'}">Funcionários</a>
        <a href="#" @click="changeCurrent('beneficios')" :class="{'selected': nome == 'BENEFÍCIOS'}">Benefícios</a>
        <a href="#" @click="changeCurrent('horaExtra')" :class="{'selected': nome == 'HORA EXTRA'}">Hora Extra</a>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    data(){
        return  {
            nome: '',
            codeValues:{
                status: 'STATUS',
                usuarios: 'FUNCIONÁRIOS',
                beneficios: 'BENEFÍCIOS',
                horaExtra: 'HORA EXTRA'
            }
        }
    },
    methods:{
       changeCurrent(type){
           this.nome = this.codeValues[type]
           this.$emit('changeCurrent',type)
       } 
    },
    mounted(){
        this.changeCurrent('usuarios')
    }
}
</script>

<style scoped>
#menu-area{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.selected{
    background-color: rgb(148, 148, 148)
}
.dropbtn {
  background-color: #4CAF50;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 10000000;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {background-color: #f1f1f1}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: #3e8e41;
}
</style>

// <div class="flex-custom">
//         <div class="btn-group group-custom ml-3" role="group" aria-label="Basic example">
//         <button type="button" class="btn btn-secondary" @click="$emit('changeCurrent','status')">Escala</button>
//         <button type="button" class="btn btn-secondary" @click="$emit('changeCurrent','usuarios')">Funcionários</button>
//         <button type="button" class="btn btn-secondary" @click="$emit('changeCurrent','beneficios')">Benefícios</button>
//         <button type="button" class="btn btn-secondary" @click="$emit('changeCurrent','horaExtra')">Hora Extra</button>
        
//     </div>
//     </div>