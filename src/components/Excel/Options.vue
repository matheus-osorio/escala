<template>
  <div class="menu">
      <td class="mb-2 ml-2" v-for="(btn,index) in buttons" :key="btn.id" @click="buttonClick(btn,index)">
            <Button icon="true" :color="btn.color" :name="btn.name" :active="btn.active"></Button>
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
            current:1,
            buttons:[
                {
                    color:'green',
                    name: 'fa fa-undo-alt',
                    value:undefined,
                    func: "resetValue",
                    active: false,
                    hold: false,
                },
                {
                    color: 'grey',
                    name: "fas fa-mouse-pointer",
                    value: undefined,
                    func: "undoFilter",
                    active: true,
                    hold: true,
                },
                {
                    color: 'blue',
                    name: 'far fa-save',
                    value: undefined,
                    func: 'saveData',
                    active:false,
                    hold: false
                },
                {
                    color: '#de7237',
                    name: 'fas fa-filter',
                    value: undefined,
                    func: 'toggleFilter',
                    active: false,
                    hold:true
                }
            ]
        }
    },
    methods:{
        buttonClick(btn,index){
            if(btn.hold){
                this.buttons[this.current].active = false
                this.current = index
                btn.active = true
            }
            this.$emit(btn.func,btn.value)
        }
    }
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