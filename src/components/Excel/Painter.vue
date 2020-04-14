<template>
  <div class="color-table m-2">
   <table class="excel-table">
       <tbody>
        <tr class="row-colors" v-for="line in colorsWithColumns" :key="line.id">
            <td v-for="data in line" :key="data.id" @click="$emit('changeColor',data.name)" @mouseenter="turnTextOn(data)" @mouseleave="turnTextOff()">
              <Button :color="data.color" :name="data.name"></Button>
            </td>
        </tr>
            
       </tbody>
   </table>
  </div>
</template>

<script>
import Button from '../shared/Button'
export default {
    components:{
        Button
    },
    props:{
        colors: {},
        text:{}
    },
    computed:{
        colorsWithColumns(){
            const matrix = []
            let line = []
            for(const index in this.colors){
               if(!(index%8) && index!=0){
                   matrix.push(line)
                   line = []
               } 
               line.push(this.colors[index])
            }
            if(line.length > 0){
                while(line.length < 8){
                    line.push({name:'', color: 'white'})
                }
                matrix.push(line)
            }
            console.log(matrix)
            return matrix
        }
    },
    methods:{
        turnTextOn(data){
            if(data.name != ''){
                this.text.text = data.fullName
                this.text.color = data.color
                this.text.hide = false
            }
        },
        turnTextOff(){
            this.text.hide = true
        }
    }
}
</script>

<style scoped>

.row-colors{
    display: grid;
    width:100%;
    grid-template-columns: repeat(8,60px);
    grid-template-rows: 50px;
}

.color-ball{
    border-radius: 40px;
    padding: 10px;
    margin: 0px 10px;
    background: black;
}

td{
    display: flex;
    grid-area: span 1;
    align-items: center;    
}

.color-table{
    display: flex;
    align-items: flex-end;
}

</style>