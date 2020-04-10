<template>
  <div class="menu">
      <td class="mb-2 ml-2" v-for="btn in buttons" :key="btn.id" @click="$emit(btn.func,btn.value)">
            <Button icon="true" :color="btn.color" :name="btn.name"></Button>
      </td>
       
  </div>
</template>

<script>

import Button from '../shared/Button'

export default {
    components:{
        Button
    },
    data(){
        return {
            buttons:[
                {
                    color:'green',
                    name: 'fa fa-undo-alt',
                    value:undefined,
                    func: "resetValue"
                },
                {
                    color: 'red',
                    name: "fas fa-times",
                    value: undefined,
                    func: "changeColor"
                },
                {
                    color: 'blue',
                    name: 'far fa-save',
                    value: undefined,
                    func: 'save'
                }
            ]
        }
    },
}
</script>

<style>
.menu{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.fixed-size{
    width: 30px;
}
</style>