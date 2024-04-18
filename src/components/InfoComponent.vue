<script setup lang="ts">

</script>

<template>
  <div id = InfoComponent>
    <h2 id = Quote><strong>Sparetips: </strong>Sett av et jevnt beløp hver måned på sparekonto eller lignende.</h2>
    <h2 id = TotalSavings>Våre brukere har spart til sammen <strong>5000</strong> nok</h2>
  </div>
</template>

<style scoped>
  #InfoComponent{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
    border-radius: 20px;
    border: 2px solid var(--color-border);
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.6);
    height: 60vh;
  }

  #Quote, #TotalSavings{
    padding: 5%;
  }

  #TotalSavings strong , #Quote strong{
    font-weight: bold;
  }
</style>