<template>
  <div>
      <table draggable="false">
          <thead>
              <th align="center" class="grid">Usuário</th>
              <th align="center" class="grid">Trabalho</th>
              <th align="center" class="grid status" v-for="day in days" :key="day.id">{{day}}</th>
          </thead>
          <tbody>
              <tr draggable="false" v-for="(line,lindex) in users" :key="line.id">
                  <td draggable="false" align="center" class="grid info text-nowrap">{{line.user}}</td>
                  <td draggable="false" align="center" class="grid info text-nowrap">{{line.job}}</td>
                  <td draggable="false" align="center" class="grid status" :style="{'background-color': colorObj[value]}" :column="cindex" :line="lindex" :id="'index' + lindex + '' + cindex" v-for="(value,cindex) in line.status" @mouseup="paintRange" @mousedown="(event) => {dragRange(event,true)}"   @mouseenter="selectedArea"  :key="value.id">{{value}}</td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
    props:{
        painting:{},
        colors: {},
        users: {},
        return: {}
    },
    data(){
        return {
            dragCoordinates:{},
            history:[]
        }
    },
    computed:{
        days(){
            return this.users[0].status.map((value,index) => index+1)
        },
        colorObj(){
            const obj = {}

            for(const color of this.colors){
                obj[color.name] = color.color
            }

            return obj
        }
    },
    methods:{
            newValue(event){
                if(!this.painting){
                    return 
                }
                const coordinates = this.getXY(event)
                this.paintColor(coordinates.x,coordinates.y)
               
            },
            paintColor(x,y){
                 Vue.set(this.users[x].status,y,this.painting)
            },
            getXY(event){
                const target = event.target
                const coordinates = {}
                coordinates.x = target.getAttribute('line')
                coordinates.y = target.getAttribute('column') 
                return coordinates
            },
            dragRange(event, reset){
                if(reset){this.dragCoordinates = []}
                this.dragCoordinates.push(this.getXY(event))
            },
            paintRange(event){

                this.makeCopy()

                this.dragRange(event,false)
                let initial = {...this.dragCoordinates[0]}
                let end = {...this.dragCoordinates[1]}

                let aux = Math.min(initial.x,end.x)
                end.x = Math.max(initial.x,end.x)
                initial.x = aux
                aux = Math.min(initial.y,end.y)
                end.y = Math.max(initial.y,end.y)
                initial.y = aux

                for(let i = initial.x;i<=end.x;i++){
                    for(let j = initial.y;j<=end.y;j++){
                        this.paintColor(i,j)
                    }
                }
                this.dragCoordinates = [] 
                const xMax = this.users.length
                const yMax = this.users[0].status.length

                for(let x = 0;x<xMax;x++){
                    for(let y = 0;y<yMax;y++){
                        let square = document.querySelector('#' + 'index' + x + '' + y)                        
                        square.classList.remove('selected')
                    }
                }
                
            },

            makeCopy(){
                this.history.push(this.users.map((user) => {
                    return {
                        'user': user.user,
                        'job': user.job,
                        'status': [...user.status]
                    }
                }))
            },
            selectedArea(event){
                let i = {...this.dragCoordinates[0]}

                if(i == undefined){return}

                const e = this.getXY(event)
                let aux = Math.min(i.x,e.x)
                e.x = Math.max(i.x,e.x)
                i.x = aux
                aux = Math.min(i.y,e.y)
                e.y = Math.max(i.y,e.y)
                i.y = aux
                const xMax = this.users.length
                const yMax = this.users[0].status.length

                for(let x = 0;x<xMax;x++){
                    for(let y = 0;y<yMax;y++){
                        let square = document.querySelector('#' + 'index' + x + '' + y)
                        if(x >= i.x && x<= e.x && y>=i.y && y<=e.y){
                            square.classList.add('selected')
                        }
                        else{
                            square.classList.remove('selected')
                        }
                    }
                }

            },

            resetValues(){
                const xMax = this.users.length
                const yMax = this.users[0].status.length
                const last = this.history.pop()
                for(let x = 0;x<xMax;x++){
                    for(let y = 0;y<yMax;y++){
                        Vue.set(this.users[x].status,y, last[x].status[y])
                    }
                }
            }

        },
        mounted(){
            this.return.reset = this.resetValues
        }
}
</script>

<style scoped>

div{
    width:100%;
}


.grid{
    border-style: solid;
    border-width: 1px;
    cursor: cell;
}

::selection {
  background: rgba(0, 0, 0, 0); 
}

.status{
    width: 40px; 
}

.info{
    width:400px;
    height: 27px !important;
    overflow: hidden;
}

.selected{
    background-color:#2384b8 !important;
}
</style>