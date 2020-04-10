<template>
  <div :style="{'background-color':color}" class="color-ball"></div>
</template>

<script>
export default {
    props:{
        color: {}
    },
}
</script>

<style scoped>
.color-ball{
    border-radius: 40px;
    padding: 10px;
    margin: 0px 10px;
}
</style>