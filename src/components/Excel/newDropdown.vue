<template>
   <div class="dropdown-content">
       <div class="line"> <input class="check-item" type="checkbox" id="selecionar" name="selecionar"
         v-model='selectAll' @click='selectAllAction'>
         <label for="selecionar" >{{selectAllText}}</label>
       </div>
       <div class='line' v-for="item in items" :key="item.id">
           <input class="check-item" type="checkbox" id="item" name="item"
           v-model="filters[item]"
          @click="clickFunc(item)">
         <label for="item" class="sm-text">{{item}}</label>
        </div>
   </div>
</template>

<script>
export default {
    props:['items','filters','column','changed'],
    data(){
        return {
            selectAll: true,
            selectAllText:'Selecionar Tudo'
        }
    },
    methods:{
        callFilter(){
            this.$emit('filterActivation',this.column)
        },
        selectAllAction(){
            let result = false
            if(!this.selectAll){
                result = true
            }
            for(let key of Object.keys(this.filters)){
                this.filters[key] = result
            }
            if(!this.selectAll){
                this.callFilter()
            }
            this.selectAllState()
        },
        selectAllState(){
            const keys = Object.keys(this.filters)
            const state = keys.map(k => this.filters[k])
            if(state.filter(s => !s).length == 0){
                this.selectAll = true
            }
            else{
                this.selectAll = false
            }
        },
        clickFunc(item){
            this.filters[item] = !this.filters[item]
            this.selectAllState()
            this.callFilter()
        }
    }
}
</script>

<style>
.line{
    text-align: initial;
}

.check-item{
    margin-right: 0.5rem;
}

.sm-text{
    font-size: 0.68rem;
    white-space: nowrap;
    text-overflow: ellipsis;
}

</style>