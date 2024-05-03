<script setup lang="ts">

import { onMounted, ref } from "vue";
import { getTotalSavings } from "@/utils/userUtils"

/**
 * Holds the users total savings
 */
let totalSavings = ref(0)

onMounted(async () => {
  totalSavings.value = await getTotalSavings()
});

</script>

<template>
  <div id = InfoComponent>
    <h2 id = Quote>Velkommen til Sparesti! Sparesti er en applikasjon for å hjelp deg med å spare penger
      mot dine drømmer ved hjelp av en rekke spesialtilpassede utfordinger basert på ditt forbruk! Kan du hjelpe
      sparegrisen ned stien mot de store målene?</h2>
    <h2 id = TotalSavings>Våre brukere har spart til sammen <strong>{{ totalSavings }}</strong> nok</h2>
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
  width: 100%;
}

#Quote, #TotalSavings{
  padding: 3%;
}

#TotalSavings strong , #Quote strong{
  font-weight: bold;
}
</style>