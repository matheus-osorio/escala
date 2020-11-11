const axios = require('axios')

function horas(){
    return parseInt(Math.random()*1000) %5
}

axios.get('http://localhost:3000/users')
.then(response => response.data)
.then(obj => {
    obj = obj.map(func => {
        const tam = func.extra.length
        func['extra50'] = []
        func['extra100'] = []
        func['extrahora'] = []
        for(let i=0;i<tam;i++){
            func['extra50'].push(horas())
            func['extra100'].push(horas())
            func['extrahora'].push(horas())
        }

        return func
    })

    console.log(JSON.stringify(obj))
})