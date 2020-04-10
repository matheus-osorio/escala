<template>
  <nav class="navbar navbar-custom pl-0 pt-0 pb-0">
    <div class="nav-items mr-auto">
        <div :class="{current:active=='Dados'}" class="nav-item nav-custom round-left pr-1" @click="emitValue('Dados')">
          <a class="nav-link item-custom pb-0 " href="#">
            Dados
            <span class="sr-only">(current)</span>
          </a>
        </div>
        <div :class="{current:active=='Graficos'}" class="nav-item nav-custom px-1" @click="emitValue('Graficos')">
          <a class="nav-link item-custom pb-0 " href="#">
            Gráficos
            <span class="sr-only">(current)</span>
          </a>
        </div>
    </div>
  </nav>
</template>

<script>
export default {
    data(){
        return{
            active: 'Dados'
        }
    },
    methods:{
        emitValue(name){
            this.active = name
            this.$emit('changeCurrent',name)
        }
    }
};
</script>

<style scoped>
.order-line{
    display: flex;
    flex-grow: 1;
    align-items: center;
    flex-basis: auto;
}

.round-left{
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}
.navbar-custom {
  background-color: #171a24;
  height: 30px;
  border-radius: 10px;
}

.nav-custom{
    height: 30px;
    display: inline-block;
    justify-items: center;
}

.item-custom{
    height:30px;
    padding-top:3px;
    color:whitesmoke;
}

.nav-items{
    display: flex;
    justify-content: center;
}

.current{
  background: rgb(32,30,69);
background: linear-gradient(354deg, rgba(32,30,69,1) 1%, rgba(31,104,111,1) 60%, rgba(23,242,255,1) 100%);
}
</style>