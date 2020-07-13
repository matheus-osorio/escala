let value = '10000,00'
value = value.replace(/(\d)(?=(?:\d{3})+,)/,'$1.')

console.log(value)