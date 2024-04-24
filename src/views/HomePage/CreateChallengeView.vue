<script setup lang="ts">

</script>

<template>
  <div class="create-challenge-view">
    <h2 id = pageTittle>Sett deg en spareutfordring</h2>
    <div class="input-fields">
      <div class="title">
        <h3 class = fieldInfo>Gi din spareutfordring et navn!</h3>
        <input/>
      </div>

      <div class="description">
        <h3 class = fieldInfo>Beskriv ditt sparemål!</h3>
        <input/>
      </div>

      <div class="goalSum">
        <h3 class = fieldInfo>Hvor mye spares ved denne utfordringen?</h3>
        <input type="number"/>
      </div>

      <div class="end-date">
        <h3 class = fieldInfo> Hva er fristen på denne utfordringen?</h3>
        <input type = "date"/>
      </div>

      <div class="repeatable">
        <h3 class = fieldInfo> Hva er fristen på denne utfordringen?</h3>
        <input/>
      </div>

    </div>
  </div>

</template>

<style scoped>

#pageTittle{
  color: var(--color-heading);
}

.title, .description, .goalSum, .end-date, .repeatable{
  border: 3px solid var(--color-border);
  margin-top: 3%;
  padding: 1%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 50%;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.6);
}

.fieldInfo{
  margin-bottom: 2%;
}

.input-fields{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

input{
  width: 90%;
  height: 45%;
  border-radius: 20px;
  border-color: var(--color-border);
}

.create-challenge-view{
  width: 100%;
  height: 100%;
}

</style>