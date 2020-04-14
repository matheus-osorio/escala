<template>
  <div class="table-custom">
    <table class="table text-nowrap">
      <thead>
        <th>Nome</th>
        <th>Função</th>
      </thead>
      <tbody>
        <tr v-for="(user,index) in users" :key="user.id">
          <td>{{user.user}}</td>
          <td>{{user.job}}</td>
          <td @click="$emit('changeCurrentUser',index)" class="noborder"><Button icon="true" name="far fa-chart-bar" color="lightgreen"></Button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Button from '../shared/Button'
export default {
    props:['users'],
    components:{
      Button
    }
}
</script>

<style scoped>
.table-custom{
  overflow-y: auto;
  height: calc(100vh - 100px);
}

.noborder{
  border-style: none;
}
</style>