const axios = require('axios')

axios.get('http://localhost:3000/users')
.then(response => response.data)
.then(func => {
    func = func.map(f => {
        f.extra = f.status.map(() => {
            return parseInt(Math.random()*1000000) % 3
        })
        return f
    })
    console.log(JSON.stringify(func))
})