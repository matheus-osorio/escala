<template>
  <div class="dropdown-custom" :style="getPosition()" v-show="params.display == true">
      <table>
          <tbody>
              <tr  @click="params.display = false">
                  <td @click="$emit('filterClick',createFilter(undefined))"><br></td>
              </tr>
              <tr v-for="item in params.setOfItems" :key="item.id" @click="params.display = false">
                  <td @click="$emit('filterClick',createFilter(item))">{{item}}</td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
export default {
    props:['params','reference','index'],

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
                value: item
            }
        }
    }
}
</script>

<style scoped>

tr,td{
    height: 24px;
    width: var(--width-var);
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