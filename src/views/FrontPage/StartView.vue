<script setup lang="ts">

import {useRouter} from 'vue-router'
import InfoComponent from '@/components/InfoComponent.vue'

const router = useRouter();

function navigateToLogin(){
  router.push('/login')
}
</script>

<template>
  <div id = StartPage>
    <div id = "heading">
      <h1 id = "title">Sparesti<img src="../../assets/pig_394778.png" alt ="logo" id = "logo"></h1>
    </div>
    <div id = Info>
      <InfoComponent/>
    </div>
    <div id = LogIn>
      <button id = LogInButton @click="navigateToLogin()">LogIn / Registrer bruker</button>
    </div>
  </div>
</template>

<style scoped>

#StartPage{
  min-width: 100%;
  max-width: 100%;
  min-height: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#heading{
  text-align: center;
  font-size: 250%;
}

#logo{
  max-width: 15%;
  max-height: 15%;
}

#title{
  padding: 1%;
  background: linear-gradient(45deg, var(--color-heading), #eaeaea);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: flex;
  justify-content: center;
  align-items: center;
}

#Info{
  margin: 1%;
  min-width: 80%;
}

#LogIn{
  margin: 1%;
  min-width: 80%;
}

#LogInButton{
  min-width: 100%;
  padding: 30px;
  font-size: 200%;
  background-color: var(--color-confirm-button);
  color: var(--color-buttonText);
  border: 0;
  border-radius: 20px;
}

#LogInButton:hover{
  transform: scale(1.05);
}

</style>