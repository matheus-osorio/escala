<template>
  <div id="escala">
      <div class="tabela-botoes">
        <btn @clickEvent="mudarTabela(-1)" color="#1a783d" name='fas fa-arrow-left' :icon="true" :active="false"></btn>
        <btn color="#3b7096" name='far fa-file-excel' :icon="true" :active="false" @clickEvent="createExcelFile"></btn>
        <btn color="#3b7096" name='fas fa-print' :icon="true" :active="false" @clickEvent="printPage"></btn>
        <btn @clickEvent="mudarTabela(1)" color="#1a783d" name='fas fa-arrow-right' :icon="true" :active="false"></btn>
      </div>
      <div v-for="(table) in tables" :key="table.id" class="tabela-area" v-show="table[0].setor == titulo">
          <table v-for="(semana,index) in table" :key="semana.id" class='tabela'>
              <thead v-if="index == 0">
                  <th colspan="100" class="setor-titulo">{{month[date.month - 1]}}</th>
              </thead>
              <thead>
                  <th colspan="100" class="setor-titulo">{{semana.setor}}</th>
              </thead>

              <thead class='tabela-mes'>
                  <th colspan="17"><br></th>
                  <th colspan="6"><br></th>
                  <th colspan="11" v-for="(dias,i) in semana.semana" :key="dias.id">
                      {{dias}} ( {{week[i]}} )
                  </th>
              </thead>
              <tbody>
                  <tr v-for="valores in semana.valores" :key="valores.id" class="tabela-linha">
                      <td colspan="17" class='tabela-funcao'>{{valores.funcao}}</td>
                      <td colspan="6" class='tabela-horario'>{{statusHr[valores.status]}}</td>
                      <td colspan="11" v-for="pessoas in valores.valores" :key="pessoas.id" class='tabela-pessoas' :class="{'tabela-vazio': pessoas.user == ''}">
                          {{pessoas.user}}
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
  </div>
</template>

<script>
import btn from '../shared/Button'

export default {
    props:['users','colors','date','groups'],
    components:{
        btn
    },
    data(){
        return {
            tables: [],
            titulos:[],
            titulo: '',
            valor:0,
            statusHr:{},
            week: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
            month: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']

        }
    },
    methods:{

            printPage(){
                const url = (id) => this.$store.getters.link(id,this.$route.params)
                window.open(url('print'))
            },
            
            
            createExcelFile(){
            const meses = ['Jan','Feb','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']
            const semanaArr = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado']
            this.tables.forEach(tabela => {
                let fileArr = []
                tabela.forEach(semana => {
                    fileArr.push([semana.setor])
                    fileArr.push(['',''].concat(semana.semana.map((s,i) => {
                        return s + ` ( ${semanaArr[i]} )`
                    })))

                    semana.valores.forEach(valores => {
                        let l = [valores.funcao,this.statusHr[valores.status]]
                        l = l.concat(valores.valores.map(v => v.user))
                        fileArr.push(l)
                    })
                })
                
                let file = fileArr.reduce((arr,linha) => {
                    arr+= linha.join(';') + '\n'
                    return arr
                },'')

                let encodedUri = encodeURI(file) 
                let link = document.createElement("a")
                link.target = '_blank';
                link.setAttribute("href",'data:text/csv;charset=utf-8,'+ encodedUri)
                link.setAttribute("download", 'ESCALA ' + tabela[0].setor + ' - ' + meses[this.date.month-1] + '_' + this.date.year  + '.csv')
                document.body.appendChild(link) // Required for FF

                link.click();
            })
        },

        createStatusHours(){
            return this.colors.reduce((obj,color) => {
                obj[color.name] = color.hours
                return obj
            },{})
        },
        
        mudarTabela(num){
            let valor = this.valor 
            valor = valor + num
            if(valor >= this.titulos.length){
                valor = 0
            }
            if(valor < 0){
                valor = this.titulos.length - 1
            }

            this.valor = valor

            this.titulo = this.titulos[this.valor]
        },

        deepCopy(users){
            return users.map((u) => {
                const o = {...u}
                o.status = [...u.status]
                return o
            })
        },
        addToArray(obj,item,value){
               if(obj[item] == undefined){
                   obj[item] = [value]
               }
               else{
                   obj[item].push(value)
               }
        },

        orderObj(obj){
            const keys = Object.keys(obj).sort()
            const newObj = {}

            keys.forEach(key => {
                newObj[key] = obj[key]
            })

            return newObj
        },
        divideByTag(users,tag){
            const obj = users.reduce((o,user) => {
                this.addToArray(o,user[tag],user)
                return o
            },{})

            return this.orderObj(obj)
        },
        validColors(colors){
            return colors.filter((color) => {
                return color.valid
            }).map(color => {
                color.name
            })
        },
        separateByStatus(status){
            const obj = {}
            const unique = Array.from(new Set(status))
            unique.forEach(u => obj[u] = [])
            for(let dia of status){
                obj[dia].push(true)
                for(let key of unique){
                    if(key != dia){
                        obj[key].push(false)
                    }
                }
            }
            return obj
        },

        createArrays(people){
            const tituloObj = people.map((p) => {
                return {user: p.user, job: p.job}
            })
            let maximo = people.reduce((conta,pessoa) => {
                return conta + pessoa.status.filter((s) => s).length
            },0)
            let status = people.map(p => p.status)
            let matrix = []
            while(maximo > 0){
                matrix.push(status[0].map(() => {return {user:'X',job:''}}))
                let idx = matrix.length - 1
                for(let i =0;i<status[0].length;i++){
                    for(let j=0;j<status.length;j++){
                        if(status[j][i]){
                            status[j][i] = false
                            matrix[idx][i] = tituloObj[j]
                            maximo--
                            break
                        }
                    }
                }
            }
            return matrix
        },

        defineAmoutOfBlanks(size){
            const date = this.date
            const dt = new Date(date.year,date.month-1,1)

            return {
                begin: dt.getDay(),
                end: 7 - (size - (7 - dt.getDay()))%7
            }
        },
        
        splitLine(line){
            const matrix = []
            const max = line.length
            let n = 0
            while(n < max){
                matrix.push(line.slice(n,n+7))
                n+=7
            }

            return matrix
        },

        normalizeArray(arr,obj,value){
            const begin = obj.begin
            const end = obj.end


            for(let i =0;i<begin;i++){
                arr.unshift(value)
            }
            for(let i =0;i<end;i++){
                arr.push(value)
            }

            return arr
        },
        separateByWeek(raw){
            const normalizeObj = this.defineAmoutOfBlanks(this.users[0].status.length)
            

            let dias = this.users[0].status.map((val,index) => {return index + 1})
           
            dias = this.normalizeArray(dias,normalizeObj,'')
            dias = this.splitLine(dias)
            
            const arrFinal = []
            for(let setor of Object.keys(raw)){
                
                const arrSetor = dias.map(semana => {
                    return {
                        setor,
                        semana,
                        valores:[]
                    }
                })
                for(let funcao of Object.keys(raw[setor])){
                    for(let status of Object.keys(raw[setor][funcao])){
                        for(let valores of raw[setor][funcao][status]){

                            valores = this.normalizeArray(valores,normalizeObj,{user:'',job:''})
                            valores = this.splitLine(valores)
                            for(let index in valores){
                                arrSetor[index].valores.push({
                                    funcao,
                                    status,
                                    valores: valores[index]
                                })
                            }
                        }
                    }
                }

                arrFinal.push(arrSetor)
            }
            
            return arrFinal
        }
    },


    mounted(){
        this.statusHr = this.createStatusHours()

        const uCopy = this.deepCopy(this.users)
        .map(user => {
            user.setor = this.groups[user.setor]
            return user
        })
        .filter(u => u.setor !== undefined)

        const unique = this.colors.filter(c => c.valid).map(c => c.name)
        
        const obj = this.divideByTag(uCopy,'setor')
        
        Object.keys(obj).forEach(key => {
           const func = this.divideByTag(obj[key],'job')
           const o = {}
           for(let f of Object.keys(func)){
               o[f] = func[f].map(user => {
                   return {
                       user: user.user,
                       job: user.job,
                       status: this.separateByStatus(user.status)
                   }
               })
           }

           for(let f of Object.keys(func)){
               o[f] = func[f].map(user => {
                   const status = this.separateByStatus(user.status)
                   return {
                       user: user.user,
                       job: user.job,
                       status: status
                   }
               })
           }
            obj[key] = o
        })

        
        const tables = []
        for(let set of Object.keys(obj)){
            let setor = obj[set]
            for(let fun of Object.keys(setor)){
                let funcao = setor[fun]
                for(let status of unique){
                    
                    let values = []
                    for(let funcionario of funcao){
                        if(funcionario.status[status] !== undefined){
                            const val = funcionario.user.split(' ')
                            values.push({
                                user: val[0] + ' ' + val[val.length - 1],
                                job: funcionario.job,
                                status: funcionario.status[status]
                            })
                        }
                    }

                    if(tables[set] === undefined){
                        tables[set] = {}
                    }

                    if(tables[set][fun] === undefined){
                        tables[set][fun] = {}
                    }

                    tables[set][fun][status] = this.createArrays(values)  
                }
            }
        }

        this.titulos = Object.keys(tables)
        this.titulo = this.titulos[0]

        this.tables = this.separateByWeek(tables)
    }
    
}
</script>

<style>

#escala{
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-rows: 6% 1fr;
}

.tabela-area{
    width: 100%;
    margin-top: 10px;
    height: 90%;
    margin-bottom:100px;
    overflow: auto;
    padding-bottom: 50px;
}

.tabela{
    border-style: solid;
    border-width: 2px;
    width: 100%;
    table-layout: fixed;
    text-align: center;
    margin-bottom: 30px;
}

.tabela > thead > th {
    border-style: solid;
    height: 16%;
    overflow: hidden;
}

.tabela > tbody > tr > td{
    border-style: solid;
    height: 16%;
    overflow: hidden;
}

.setor-titulo{
    font-size: 1.5rem;

}

.tabela-semana{
    background-color: rgb(221, 221, 221);
}


.tabela-linha:nth-child(odd){
    background-color: rgb(221, 221, 221);
}

.tabela-pessoas{
    font-size: 0.7rem;
}

.tabela-botoes{
    width: 100%;
    margin-top: 10px;
    display: flex;
    justify-content: center;

}

@media print{
  
    #escala{
        grid-template-rows:1fr !important;
        height: 100% !important;
    }

    .tabela-area{
        overflow: visible !important
    }

    .tabela-botoes{
        display: none !important;
    }

    .tabela-pessoas:last-child{
        page-break-after: always;
    }

    .tabela-pessoas:not(:last-child){
        page-break-after:avoid;
    }

    .setor-titulo{
        page-break-after:avoid;
    }

}


</style>