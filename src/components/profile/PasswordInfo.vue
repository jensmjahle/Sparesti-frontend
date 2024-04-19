<script setup lang="ts">

</script>

<template>
  <div class="password-info">
    <div class="header">
      <h3 class="title">Passord</h3>
    </div>
    <div class="input-fields">

      <div class="input-collection">
        <label>Nåværende passord: </label>
        <input>
      </div>

      <div class="input-collection">
        <label>Nytt passord: </label>
        <input>
      </div>

    </div>
  </div>
</template>

<style scoped>
.password-info{
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
}

.header{
  display: flex;
  flex-direction: row;
}
.title{
  font-weight: bold;
}
.input-collection{
  display: flex;
  flex-direction: column;
}

</style>