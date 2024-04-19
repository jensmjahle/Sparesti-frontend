<script setup lang="ts">

</script>

<template>
  <div class="income-info">
    <div class="header">
      <h3 class="title">Økonomiske opplysninger</h3>
      <button class="submit-button">Lagre</button>
    </div>

    <div class="input-fields">
      <div class="input-collection">
        <label>Månedlig inntekt: </label>
        <input>

      </div>
      <div class="input-collection">
        <label>Faste utgifter: </label>
        <input>

      </div>

      <div class="input-collection">
        <label>Ønsket sparebeløp: </label>
        <input>

      </div>

    </div>

  </div>

</template>

<style scoped>
.income-info{
  display: flex;
  flex-direction: column;
}

.header{
  display: flex;
  flex-direction: row;
}

.title{
  font-weight: bold;
}

.input-fields{
  display: flex;
  flex-direction: column;
}

.input-collection{
  display: flex;
  flex-direction: row;
}

</style>