<template ref="ben">
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
import { saveAs } from 'file-saver';
const XLSX = require('xlsx')

export default {
    props:['users','colors','hours','date'],
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
            this.keyChange += 1
        },
        createExcelFile(){
            const meses = ['Jan','Feb','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']
            
            let wb = XLSX.utils.book_new()

            const title = `BENEFICIO - ${meses[this.date.month-1]}/${this.date.year}`
            wb.Props = {
                Title:title,
                Subject: "Beneficio",
                Author: "Sistema Escala",
                CreatedDate: new Date()
            }

            wb.SheetNames.push('BENEFICIO')

            const data = []

            data.push(['Funcionário','Dias Trabalhados','Vale Transporte','Vale Alimentação','Cesta Básica','Total'])

            for(let line of this.usersComputed){
                data.push([line.user,line.days,line.VT,line.VA,line.cesta,line.total])
            }  

             wb.Sheets['BENEFICIO'] = XLSX.utils.aoa_to_sheet(data)

            let wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
            let buf = new ArrayBuffer(wbout.length); //convert s to arrayBuffer
            let view = new Uint8Array(buf);  //create uint8array as viewer
            for (let i=0; i<wbout.length; i++){
                view[i] = wbout.charCodeAt(i) & 0xFF;
            }
            let blob = new Blob([buf],{type:"application/octet-stream"});
                
            saveAs(blob, title + '.xlsx')


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