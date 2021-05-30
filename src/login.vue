<template>
  <div id="login">
      <div id="form">
          <img src="./img/logo.svg" class="form-img" alt="">
          <input type="text" placeholder="Usuário" class="form-input" v-model="user">
          <input type="password" placeholder="Senha" class="form-input" v-model="passwd">
          <button class="form-button" @keyup.enter="checkUser"    @click="checkUser">Entrar</button>
      </div>
      <div id="load">
          <div class="spinner-border text-light" role="status" v-if="load"></div>
          <div id="error" :class="{'fade-away':fade}" v-if="error">
            Usuário ou senha Incorretos
          </div>
      </div>
  </div>
</template>

<script>

//essa página é simples, é só uma tela de login que conversa com o sistema
export default {
    data(){
        return {
            user: '',
            passwd: '',
            load: false,
            error: false,
            fade: false
        }
    },
    methods:{

        checkUser(){ //função que checa se o usuário digitou corretamente
            this.load = true
             const url = (id) => this.$store.getters.link(id,this.$route.params)
            fetch(url('token').replace('{{mode}}','criar'),{
                method: 'POST',
                body: this.user + ';' + this.passwd
            })
            .then(response => response.json())
            .then(obj => {
                console.log('obj: ', obj)
                if(obj.auth){
                    this.setCookie('token',obj.token,14) //o token retornado é sua chave de acesso
                    window.location.replace(url('main'))
                }
                else{
                    this.load = false
                    this.error = true
                    setTimeout(() => {
                        this.fade = true
                        setTimeout(() => {
                            this.error = false
                            this.fade = false
                        },2000)
                    },2000)
                }
            })
        },
        setCookie(name,value,days){ //define um novo cookie
            let date = new Date()
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))

            const cookie = `${name} = ${value};expires = ${date.toUTCString()};path = /`
            document.cookie = cookie
        },


        getCookies(){ //busca os cookies
            let cookies = document.cookie

            cookies = cookies.split('; ')
            
            return cookies.reduce((obj,line) => {
                const values = line.match(/[^=]+/g)
                if(!(values instanceof Array)){
                    return obj
                }
                obj[values[0]] = values[1]
                return obj
            },{})
        }
    },
    mounted(){
        const cookie = this.getCookies()

        const url = (id) => this.$store.getters.link(id,this.$route.params)

        if(cookie.token != undefined){ //verifica se o cooki existe e se é válido. Se for, redireciona para a página principal
            fetch(url('token').replace('{{mode}}','token'),{
                method: 'POST',
                body: cookie.token
            })

            .then(response => response.json())
            .then(obj => {
                if(obj.auth){
                    this.setCookie('token',obj.token,14)
                    window.location.replace(url('main'))
                }
            })
        }
    }
}
</script>

<style>

#login{
    background-color: #1397bf;
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: 3fr 2fr 3fr;
    grid-template-rows: 1fr 5fr 2fr;
    grid-template-areas: 
    "top top top"
    "left login right"
    "bottom load bottom2"
}

#form{
    grid-area: login;
    display:flex;
    flex-direction: column;
    align-items: center;
}

#load{
    grid-area:load;
    display: flex;
    justify-content: center;
    align-items: top;
}

#error{
    border: solid 2px red;
    margin-bottom: 5%;
    width: 100%;
    height: 50%;
    background-color: rgb(233, 116, 116);
    border-radius: 5px;
    text-align: center;
    font-weight: bolder;
    font-size:1.2rem;
    opacity: 1;
}

.fade-away{
    opacity: 0 !important;
    transition: 2s;
}


.form-input{
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
}

.form-img{
    width: 55%;
    padding:10% 0;
}

.form-button{
    margin-top: 5%;
    padding:2%;
    width: 100%;
    border-radius: 6px;
    background-color: #050A30;
    color: white;
}
</style>