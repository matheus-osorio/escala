<template>
  <div @dragstart="getXY">
      <table>
          <thead>
              <th>Nome</th>
              <th>Trabalho</th>
          </thead>
          <tbody>
              <tr v-for="line in info" :key="line.id">
                  <td>{{line.name}}</td>
                  <td>{{line.info}}</td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
export default {
    data(){
        return {
            info:[
                {name:"Joao",info:"Um trabalho qualquer"},
                {name:"Joao",info:"Um trabalho qualquer"},
                {name:"Joao",info:"Um trabalho qualquer"},
                {name:"Joao",info:"Um trabalho qualquer"}
            ]
        }
    },
    methods:{
        getXY(event){
            console.log('entrou')
           const x = event.clientX
           const y = event.clientY

        }
    }

}
</script>

<style scoped>
div{
    height: 100%;
    width: 100%;
}


th, td{
    width: 50%;
    border-style: solid;
}
</style>