<template>
  <div class="dropdown-custom" :style="getPosition()" v-show="params.display == true">
      <table>
          <tbody>
              <tr class="composite"> <i class="fas fa-search icon"></i> <input @keyup="filterOptions" type="text" class="custom-input"></tr>
              <tr  @click="params.display = false">
                  <td @click="$emit('filterClick',createFilter({'data':undefined}))"><br></td>
              </tr>
              <tr v-for="item in itemsToShow" :key="item.id" @click="params.display = false">
                  <td @click="$emit('filterClick',createFilter(item))">{{item.data}}</td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
    props:['params','reference','index'],
    data(){
        return {
            directive: 'none',
            itemsToShow: this.itemsFiltered()
        }
    },
    methods:{
        getPosition(){
            return{
                "--top-var": this.params.y + 'px',
                "--left-var":this.params.x + 'px',
                "--width-var": this.params.width + 'px',
            }
        },
        createFilter(item){
            return {
                index: this.index,
                value: item.data
            }
        },
        itemsFiltered(){
            const filtered = this.params.setOfItems.filter((item) => { return item.show})
            console.log(this.params)
            return filtered
        },
        filterOptions(event){
            const value = event.target.value
            this.itemsToShow = this.params.setOfItems.filter((item) => { return item.data.toUpperCase().includes(value.toUpperCase())})
        }
    }
}

Vue.directive('money',{
    inserted(el){
        let value = el.innerHTML
        value = value.replace('.',',').replace(/(\d)(?=(?:\d{3})+,)/,'$1.')
        el.innerHTML = value
    }
})

Vue.directive('date',{
  inserted(el){
    let value = el.innerHTML
      value = value.replace(/(\d{2})(\d{2})(\d{4})/g,'$1/$2/$3')
      el.innerHTML = value
  }
})

Vue.directive('cpf',{
  inserted(el){
    let value = el.innerHTML + ''
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,'$1.$2.$3-$4')
      el.innerHTML = value
  }
})
</script>

<style scoped>

tr,td{
    height: 24px;
    width: var(--width-var);
}

.custom-input{
    width:90%;
    margin-right:3px;
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
    border:1px;
}

.icon{
    font-size: 0.7rem;
}

.composite{
    display: flex;
    justify-content: center;
    align-items: center;
}

tr:hover{
     background-color:#a8a8a8;
}

div{
    border-style: solid;
    border-width: 0px 1px 0px 0px;
    cursor: pointer;
    font-size: 0.80rem;
}
.dropdown-custom{
    display: inline-block;
    position: absolute;
    z-index: 1001;
    top: var(--top-var);
    left: var(--left-var);
    width:var(--width-var) !important;
    background-color:#d6d6d6;
    max-height: 272px;
    overflow-y: scroll;
    overflow-x: hidden;
}

/* width */
::-webkit-scrollbar {
  width: 3px;
  height:5px;
  margin-right: 2px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px darkgray; 
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