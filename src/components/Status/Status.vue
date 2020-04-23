<template>
  <div class="big-table">
      <table v-for="(status) in usersByDay" :key="status.id" class="table" align="center">
          <thead class="custom-background">
              <th class="category">{{status.name}}</th>
              <th class="fixed-width" v-for="i in (status.days[0].length)" :key="i.id"><span>{{i}}</span></th>
          </thead>
          <tbody>
              <tr v-for="(day,index) of status.days" :key="day.id" :class="{dark:index%2==1}">
                  <td>{{index + 1}}</td>
                  <td v-for="obj of day" :key="obj.id">
                      {{obj.full}}
                  </td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
export default {
    props:['users'],
    computed:{
        usersByDay(){
            let fullObj = {}
            for(const user of this.users){
                const status = user.status
                for(const index in status){
                    if(fullObj[status[index]] == undefined){
                        fullObj[status[index]] = {
                            name: status[index],
                            days: status.map(() => [])
                        }
                        
                    }
                    const essentials = {
                        user: user.user,
                        job: user.job,
                        full: user.user + ' - ' + user.job
                    }
                    fullObj[status[index]].days[index].push(essentials)
                }
            }
            fullObj = Object.values(fullObj)
            for(const obj of fullObj){
                let columns = obj.days
                let turned = []
                const days = columns.length
                const biggest = columns.map((column) => column.length).reduce((max,current) => Math.max(max,current))
                for(let i=0;i<biggest;i++){
                    turned[i] = []
                    for(let j=0;j<days;j++){
                        if(columns[j][i] == undefined){
                            turned[i][j] = {user:'',job:'', full: ''}
                        }
                        else{
                            turned[i][j] = columns[j][i]
                        }
                    }
                }
                obj.days = turned
            }
            console.log(fullObj)
            return fullObj
        }
    }
}
</script>

<style scoped>

.big-table{
    margin-top:12px;
    overflow: scroll;
}

.dark{
    background-color:rgba(206, 206, 206, 0.514);
}
.custom-background{
    background-color:#91b2e68f;
}

.fixed-width{
    width: 100px !important;
}

.category{
    width:60px;
    background-color:#3985fd;

}

table {
  table-layout:fixed;
  font-size: 0.9rem;
}

th {
  z-index: -1;
  text-align: center !important;
}

tr{
  text-align: center !important;
}


/* width */
::-webkit-scrollbar {
  width: 5px;
  height:5px;
  margin-right: 2px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 50px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #999999; 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #666666; 
}

</style>