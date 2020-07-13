
Vue.directive('money',{
    inserted(el){
        let value = el.innerHTML
        value = value.replace(/(\d)(?=(?:\d{3})+,)/,'$1.')
        el.innerHTML = value
    }
})
