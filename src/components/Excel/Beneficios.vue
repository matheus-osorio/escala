<template>
  <table class="table" :key="keyChange">
      <thead>
          <th class="bg-info sticky">Funcionário</th>
          <th class="bg-info sticky">Dias Trabalhados</th>
          <th class="bg-info sticky">Vale Transporte</th>
          <th class="bg-info sticky">Vale Alimentação</th>
          <th class="bg-info sticky">Cesta Básica</th>
          <th class="bg-info sticky">Total</th>
          
          
      </thead>
      <tbody>
          <tr v-for="user in usersComputed" :key="user.id">
              <td>{{user.user}}</td>
              <td>{{user.days}}</td>
              <td ><money :original="user.VT"></money></td>
              <td ><money :original="user.VA"></money></td>
              <td ><money :original="user.cesta"></money></td>
              <td ><money :original="user.total"></money></td>

          </tr>
      </tbody>
  </table>
</template>

<script>
import money from '../shared/money'

export default {
    props:['users','colors','hours'],
    components:{
        money
    },
    data(){
        return {
            usersComputed: this.defineBenefits(),
            keyChange: 1
        }
    },
    methods:{
        changeKey(){
            console.log('entrou aqui')
            this.keyChange += 1
        },
        defineBenefits(){   
            const resposta = []
            let atual = {}
            for(let user of this.users){
                atual = {
                    user: user.user,
                    days: this.sumOfValidDays(user),
                    VT: this.calculateVT(user),
                    VA: this.calculateVA(user),
                    cesta: this.calculateCesta(user)
                }
                atual.total = atual.VT + atual.VA + atual.cesta
                resposta.push(atual)
            }
    
            return resposta
        },
        
        validColors(){
            const valid = this.colors.filter((color) => {return color.valid})
            const obj = {}
            for(let color of valid){
                obj[color.name] =  this.hours.alimentacao[color.setor] == undefined? 0 :  this.hours.alimentacao[color.setor]
            }
            return obj
        },

        sumOfValidDays(user){
            const validColors = this.validColors()
            const value =  user.status.reduce((soma,dia) => {
                if(validColors[dia] != undefined){return soma +1}
                return soma
            },0)
             return value
        },

        calculateVA(user){
            const validDays = this.validColors(user)
            if(!user.alimentacao){
                return 0
            }

            const value =  user.status.reduce((soma,dia) => {
                if(validDays[dia] == undefined){return soma}
                return soma + parseFloat(validDays[dia])
            },0)

            return value
        },

        calculateVT(user){

            if(!user.transporte){
                return 0
            }

            let multiplier = 0

            if(this.hours.transporte[user.VT] == undefined){
                return 0
            }

            if(this.hours.transporte[user.VT][user.residencia] != undefined){
               multiplier = this.hours.transporte[user.VT][user.residencia] 
            }
            else if(this.hours.transporte[user.VT].padrao != undefined){
                multiplier = this.hours.transporte[user.VT].padrao
            }
           const value = this.sumOfValidDays(user) * multiplier
            return value
        },

        calculateCesta(user){
            if(!user.basica){
                return 0
            }
            if(this.hours.cesta[user.cesta] == undefined){
                return 0
            }

            return this.hours.cesta[user.cesta]
        }
    }
}


</script>

<style>

.sticky{
    position: sticky;
    top: 0;
}

</style>