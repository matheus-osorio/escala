<template>
  <div id="escala">
      <table class="work-table">
          <thead>
              <th>Função</th>
              <th>Domingo</th>
              <th>Segunda-Feira</th>
              <th>Terça-Feira</th>
              <th>Quarta-Feira</th>
              <th>Quinta-Feira</th>
              <th>Sexta-Feira</th>
              <th>Sábado</th>
          </thead>
          <tbody>
              <tr v-for="line in work" :key="line.id">
              <td v-for="value in line" :key="value.id">
                  {{value}}
              </td>
          </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
export default {
    props:['users','colors','date'],
    data(){
        return {
            work: []
        }
    },
    methods:{
        validColors(colors){
            return colors.reduce((obj,color) => {
                if(color.valid){
                    obj[color.name] = true
                }

                return obj
            },{})
        },

        validDays(arr,colors){
            return arr.map((day) => {
                return colors[day] === true
            })
        },

        freeIndex(matrix,day){
            return matrix.reduce((result,arr,index ) => {
                if(arr[day] == '-' && result == -1){
                    return index
                }
                return result
            },-1)
        },

        repeatValue(value,times){
            const arr = []
            for(let i = 0;i<times;i++){
                arr.push(value)
            }
            return arr
        },
        createPanelForFunction(user,workObj,color){
            const valids = this.validDays(user.status,color)
            const name = user.user
            const job = user.job
            const size = user.status.length

            if(workObj[job] === undefined){
                workObj[job] = []
                workObj[job].push(this.repeatValue('-',size))
            }

            
            for(let i in valids){
                if(valids[i]){
                    let freeIndex = this.freeIndex(workObj[job],i)
                    if(freeIndex == -1){
                        workObj[job].push(this.repeatValue('-',size))
                        freeIndex = workObj[job].length - 1
                    }

                    workObj[job][freeIndex][i] = name
                }
            }
            return workObj
        },
        likeCalendar(obj){
            
            const date = new Date(this.date.month + '/01/'+ this.date.year)
            const addAtBeginning = date.getDay()
            for(let key of Object.keys(obj)){
                let matrix = obj[key]
                matrix = matrix.map((arr) => {
                    let value = addAtBeginning
                    console.log('value1: ',value)
                    while(value > 0){
                        arr.unshift('-')
                        value--
                    }
                    return arr
                })
                obj[key] = matrix
            }

            for(let key of Object.keys(obj)){
                let matrix = obj[key]
                matrix = matrix.map((arr) => {
                    let value = arr.length % 7
                    console.log('value2: ',value)
                    while(value >= 0){
                        arr.push('-')
                        value--
                    }

                    return arr
                })

                obj[key] = matrix
            }
            
            return obj
        },

        forPrint(matrix){
            const jobs = matrix.map(arr => arr[0])
            const calendar = []
            matrix = matrix.map(arr => {
                arr.shift()
                return arr
            })

            const date = new Date(this.date.month + '/01/'+ this.date.year)
            let addAtBeginning = date.getDay()
            let currentDay = 1
            const beginning = ['']

            while(addAtBeginning > 0){
                beginning.push('')
                addAtBeginning--
            }
            while(beginning.length < 8){
                beginning.push(currentDay)
                currentDay++
            }
            calendar.push(beginning)
            for(let i=0;i< matrix[0].length;i+=7){
                for(let line in matrix){
                    let arr = [...matrix[line]]
                    arr = arr.slice(i,i+7)
                    arr.unshift(jobs[line])
                    calendar.push(arr)
                }
                const days = ['']
                while(days.length<8){
                    days.push(currentDay)
                    currentDay++
                }

                calendar.push(days)
            }
            
            return calendar
        }
    },
    mounted(){
        const colors = this.validColors(this.colors)
        console.log('colors: ',colors)
        let wObj = {}
        wObj = this.users.reduce((obj,user) => {
            return this.createPanelForFunction(user,obj,colors)
        },wObj)
        console.log('wObj1: ',wObj)
        wObj = this.likeCalendar(wObj)
        console.log('wObj2: ',wObj)
        const finalArr = []
        for(let key of Object.keys(wObj).sort()){
            let matrix = wObj[key]

            matrix = matrix.map(value => {
                value.unshift(key)
                return value
            })

            matrix.forEach(value => {
                finalArr.push(value)
            })
        }
        console.log('finalArr: ',finalArr)
        this.work = this.forPrint(finalArr)

        console.log('work: ',this.work)
    }
}
</script>

<style>

.work-table{
    margin-top: 15px;
}
.work-table > thead > th{
    border-style: solid;
    border-width: 2px;
    border-color:black;
    background-color:rgb(19, 145, 184) ;
    position: sticky;
    top: 0;
    text-align: center;
}

.work-table > tbody > tr > td{
    border-style: solid;
    border-width: 2px;
    border-color:black;
    text-align: center;
}


.work-table > tbody > tr > td:first-child{
    font-size: 0.9rem;
}
#escala{
    width: 100vw;
    height: 100vh;
    overflow: scroll;
}
</style>