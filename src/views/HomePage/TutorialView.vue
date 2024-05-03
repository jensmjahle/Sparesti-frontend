<script setup lang="ts">
import router from '@/router'

const start = () => {
  router.push('/homepage/create-milestone')
}
</script>

<template>
  <div class="tutorial">
    <h2 class="title">Velkommen til sparesti!</h2>
    <h3>
      Tidligere har sparing vært kjedelig og lite inspirerende. Hos Sparesti ønsker vi å endre dette
      ved å gjøre sparing til en gøy og engasjerende opplevelse.
    </h3>
    <div class="component">
      <h2>Hvordan fungerer sparesti?</h2>
      <h3>
        Sparesti er en unik applikasjon som lar deg sette opp mål for sparing, enten det er til en
        ferie, en ny sykkel eller noe annet. Du bestemmer selv hvor mye du vil spare og hvor lenge
        du vil spare. Vi støtter deg gjennom hele prosessen ved å gi deg oversikt over sparingen din
        og tilbyr nyttige tips og triks for å nå målene dine.
      </h3>
      <h3>
        Ved å koble deg til bankkontoen din, får vi innsikt i dine transaksjoner. Dette lar oss
        skreddersy utfordringer som er relevante for ditt forbruk. Med Sparesti får du skreddersydde
        målsettinger som gjør det enklere å spare.
      </h3>
    </div>
    <div class="component">
      <h2>Hvordan kommer jeg i gang?</h2>
      <h3>
        For å komme i gang med Sparesti, begynner du med å opprette en "Sparesti". Dette gjør du ved
        å navigere til siden for sparing og klikke på "Opprett ny sparesti".
      </h3>
      <div class="img">
        <img src="@/assets/tutorialImages/1.png" alt="hjem" class="image" />
        <img src="@/assets/tutorialImages/2.png" alt="sparestier" class="image" />
      </div>
      <h3>
        Fyll inn nødvendig informasjon, som hvor mye du vil spare, navnet på sparemålet, når det
        skal være fullført og en kort beskrivelse. Klikk deretter på "Lagre".
      </h3>
      <h3>
        Nå har du opprettet en sparesti! Du kan nå se sparestien din og begynne å spare penger.
        Besøk sparestien din for å overføre penger direkte eller vent til du mottar en utfordring
        for å begynne å spare.
      </h3>
    </div>
    <div class="component">
      <h2>Hva er en sparesti?</h2>
      <h3>
        En sparesti representerer din reise mot sparingmålet ditt. For hvert utfordring du
        fullfører, kommer du ett steg nærmere målet ditt. Målet er å nå slutten av stien og fullføre
        sparingen.
      </h3>
      <h3>
        Du kan se fremgangen din ved å besøke sparestien din. Her kan du se hvor mye du har spart,
        hvor mye du har igjen og hvor langt du har igjen til målet ditt.
      </h3>
      <div class="img">
        <img src="@/assets/tutorialImages/3.png" alt="sparesti" class="image" />
      </div>
    </div>
    <div class="component">
      <h2>Hva er en utfordring?</h2>
      <h3>
        En utfordring er en oppgave som må fullføres for å komme nærmere sparingmålet ditt. Dette
        kan være alt fra å redusere transportkostnader til å kutte ut unødvendige kjøp. Vi tilpasser
        utfordringene til ditt forbruk og hjelper deg med å spare på en morsom og personlig måte.
      </h3>
      <h3>
        Vi lager utfordringer så fort vi kan, så hvis du går tom for utfordringer så kan du lage din
        egen utfordring eller vente litt så kommer det flere.
      </h3>
      <h3>
        Hvis vi foreslår utfordringer du ikke liker så er det bare å avslå, dette hjelper oss å gi
        det relevante utfordringer du liker.
      </h3>
    </div>
    <div class="component">
      <h2>Hva er sparetips?</h2>
      <h3>
        Sparetips er tips og triks for å spare penger som vi har henter fra E24. Trykk deg inn på en
        artikken for å lære noe nytt!
      </h3>
    </div>
  </div>
  <div class="button-container">
    <button @click="start" class="button">Kom i gang!</button>
  </div>
  <div class="tutorial">
    <h2 class="title">Ofte stilte spørsmål</h2>
    <div class="component">
      <h2>Hvorfor skal jeg bruke sparesti?</h2>
      <h3>
        Sparesti tilbyr en morsom og motiverende måte å spare penger på. Vi skreddersyr utfordringer
        og sparetips basert på ditt forbruk, slik at du kan nå sparingmålet ditt på en engasjerende
        måte.
      </h3>
    </div>
    <div class="component">
      <h2>Hvorfor er sparesti bedre enn andre spareapplikasjoner?</h2>
      <h3>
        Sparesti skiller seg fra andre spareapplikasjoner ved å tilby personlig tilpassede
        utfordringer og sparetips basert på ditt faktiske forbruk. Dette gjør sparingen mer relevant
        og givende, samtidig som det gjør det enklere å nå sparemålet ditt.
      </h3>
    </div>
    <div class="component">
      <h2>Hvorfor er sparesti gratis?</h2>
      <h3>
        Sparesti er gratis fordi vi ønsker å gjøre sparing tilgjengelig for alle. Vi mener at alle
        burde ha muligheten til å spare penger og nå sparingmålet sitt, uavhengig av økonomisk
        situasjon.
      </h3>
    </div>
    <div class="component">
      <h2>Hvordan kan jeg kontakte sparesti?</h2>
      <h3>
        Du kan kontakte sparesti ved å sende en e-post til sparesti@gmail.com Vi ser frem til å høre
        fra deg!
      </h3>
    </div>
    <div class="component">
      <h2>Hva skjer om jeg ikke fullfører en utfordring innen tidsfristen?</h2>
      <h3>
        Hvis du ikke fullfører en utfordring innen tidsfristen, vil vi ikke overføre penger til
        sparestien din og utfordringen blir fjernet.
      </h3>
    </div>
  </div>
</template>

<style scoped>
.tutorial {
  display: flex;
  flex-direction: column;
  gap: 6%;
}
.component {
  display: flex;
  flex-direction: column;
  padding: 3% 0;
  gap: 20px;
}

.img {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: fit-content;
  gap: 20px;
  place-items: center;
}

.image {
  width: 100%;
}

.title {
  color: var(--color-heading);
}

.button-container {
  display: flex;
  justify-content: center;
}
.button {
  padding: 20px 0;
  margin: 20px 0;
  font-size: 2em;
  background-color: var(--color-confirm-button);
  width: 49.5%;
  border-radius: 20px;
  border: none;
  color: var(--color-button-text);
}
.button:hover {
  transform: scale(1.02);
}

@media (min-width: 1024px) {
  .image {
    width: 70%;
    height: auto;
  }
  .component {
    padding: 2% 0;
    gap: 10px;
  }
}
</style>
