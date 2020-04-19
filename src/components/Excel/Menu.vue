<template>
    <div class="flex-custom">
        <div class="btn-group group-custom ml-3" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-secondary" @click="$emit('changeCurrent','status')">Status</button>
        <button type="button" class="btn btn-secondary" @click="$emit('changeCurrent','usuarios')">Usuários</button>
    </div>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.group-custom{
    width:200px;
    height: 50px !important;
}

.flex-custom{
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>