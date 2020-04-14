<template>
  <div class="mb-1 flex-custom">
    <div :class="{hide: text.hide}" class="alert alert-dark alert-custom" role="alert">{{text.text}}</div>
  </div>
</template>

<script>
export default {
  props: ["text"]
};
</script>

<style>
.alert-custom {
  height: 50px;
  width: 95%;
}

.hide{
    display: none;
}

.flex-custom{
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
}
</style>