<template>
  <span>{{computedValue}}</span>
</template>

<script>
export default {
    props: ['original'],
    computed:{
        computedValue(){
            let value = this.original
            console.log('value:',value)
            value = parseFloat(value).toFixed(2)
            const decimals = (value + '').split('.')[1] == undefined ? 0 :  (value + '').split('.')[1].length

            switch(decimals){
                case 2:
                    value = (value + '').replace('.',',')
                    break
                case 1:
                    value = (value + '').replace('.',',') + '0'
                    break
                default:
                    value = value + '' + ',00'
                    break
            }
            value.replace(/(\d)((?:\d{3})+,)/,'$1.').replace(/(,\d\d)\d*/,'$1')
            return value
        }
    }
}
</script>

<style>

</style>