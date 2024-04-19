<script setup lang="ts">

</script>

<template>
  <div class="user-info">
    <div class="header">
      <h3 class="title">Bruker opplysninger</h3>
      <button>Lagre</button>
    </div>
    <div class="input-fields">
      <button></button>
      <div class="input-collection">
        <label>E-post: </label>
        <input>
      </div>
    </div>

  </div>

</template>

<style scoped>
.user-info{
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