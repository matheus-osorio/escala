<template>
  <table class="table">
      <thead>
          <th class="bg-info sticky">Funcionário</th>
          <th class="bg-info sticky">Vale Transporte</th>
          <th class="bg-info sticky">Dias Trabalhados</th>
          <th class="bg-info sticky">Beneficio</th>
          
      </thead>
      <tbody>
          <tr v-for="user in usersComputed" :key="user.id">
              <td>{{user.user}}</td>
              <td>{{user.VT}}</td>
              <td>{{user.days}}</td>
              <td>{{user.benefit}}</td>
          </tr>
      </tbody>
  </table>
</template>

<script>
export default {
    props:['users','colors','hours'],
    data(){
        return {
            usersComputed: this.defineBenefits()
        }
    },
    methods:{
        defineBenefits(){    
            const returnValue = []
            const status = this.countValidColors()
            for(const user of this.users){
                let days = this.countDays(user.status)
                let validDays = this.sumOfValid(status,days)
                console.log(user.daily)
                let obj = {
                    user: user.user,
                    VT: user.VT,
                    days: validDays,
                    benefit: validDays*(this.hours[user.daily] != undefined? this.hours[user.daily]:0)
                }

                returnValue.push(obj)
            }

            return returnValue
        },

        countDays(days){
            const obj = {}

            for(const day of days){
                if(obj[day] == undefined){
                    obj[day] = {
                        name: day,
                        count: 1
                    }
                }
                else{
                    obj[day].count += 1
                }
            }

            return obj
        },

        countValidColors(){
            const valid = this.colors.filter(color => color.valid)
            const obj = {}

            for(const color of valid){
                obj[color.name] = true
            }

            return obj
        },

        sumOfValid(status, days){
            const valid = Object.values(days).filter((day) => {
                return status[day.name] != undefined
            })

            return valid.reduce((count, day) => {
                count += day.count
                return count
            },0)
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