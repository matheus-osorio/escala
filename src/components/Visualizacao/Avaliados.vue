<template>
  <table class="table">
      <tbody>
         <tr>
             <th>Nome</th>
             <td>{{user.user}}</td>
         </tr>
         <tr class="alternate">
             <th>Cargo</th>
             <td>{{user.job}}</td>
         </tr>
         <tr>
             <th>Total de Dias</th>
             <td>{{totalDays}}</td>
         </tr>
         <tr v-for="(line,index) in categoryPercentage" :key="line.id" :class="{alternate:index%2==0}">
             <th>{{line.title}}</th>
             <td>{{line.value}}</td>
         </tr>

      </tbody>
  </table>
</template>

<script>
export default {
    props:['user'],
    computed:{
        categorySort(){
            const obj = {}
            for(const day of this.user.status){
                if(obj[day] === undefined){
                    obj[day] = {
                        title: day,
                        value: 1
                    }
                }
                else{
                    obj[day].value+=1
                }
            }
            
           return Object.values(obj)
        },
        categoryPercentage(){
           const days = this.totalDays
            const list = this.categorySort
            list.forEach((value => {
                const percentage = (value.value*100/days).toFixed(2)
                value.value += ' (' + percentage + '%)'
            }))
           return list 
        },
        totalDays(){
            return this.user.status.length
        }
    }
}
</script>

<style scoped>
.alternate{
    background-color: #e6e6e6;
}
</style>