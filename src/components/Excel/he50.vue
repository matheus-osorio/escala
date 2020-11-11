<template>
  <div id="hora-extra">
    <table class="fullsize table-fixed">
      <thead class="color-orange">
        <th class="cell fix-15 salmon">Nome</th>
        <th class="cell fix-15 salmon">Função</th>
        <th
          class="cell"
          v-for="numero in users[0].status.length"
          :key="numero.id"
        >
          {{ numero }}
        </th>
      </thead>
      <tbody>
        <tr v-for="(linha, x) in users" :key="linha.id">
          <td class="cell text-nowrap">{{ linha.user }}</td>
          <td class="cell text-nowrap">{{ linha.job }}</td>
          <td
            class="cell cell-relative"
            v-for="(number, y) in linha.extra"
            :key="number.id"
          >
            <input
              type="text"
              class="cell-input light-grey"
              v-model="users[x].extra50[y]"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["users"],
};
</script>

<style>
#hora-extra {
  width: 100%;
}

.fullsize {
  width: 100%;
}

.table-fixed {
  table-layout: fixed;
}

.fix-15 {
  width: 15%;
}

.cell {
  border-style: solid;
  border-width: 1px;
}

.cell-relative {
  position: relative;
}

.salmon {
  background-color: salmon;
}

.light-grey {
  background-color: lightgray;
}
.cell-input {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  box-shadow: 0;
  border: 0;
  width: 100%;
}
</style>