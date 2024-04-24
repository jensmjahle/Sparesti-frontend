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
      <h1 id = "title">Sparesti<img src="../../assets/png/pig_394778.png" alt ="logo" id = "logo"></h1>
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
  background-image: url("../../assets/farm.jpg");
  background-size: cover;
  background-repeat: no-repeat;
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
  background-color: rgba(255,255,255,0.8);
  border-radius: 20px;
  border: 2px solid var(--color-border);
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.6);
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
  background-color: rgba(255,255,255,0.8);
  border-radius: 20px;
}

#LogIn{
  margin: 1%;
  min-width: 80%;
}

#LogInButton{
  min-width: 100%;
  padding: 30px;
  background-color: var(--color-confirm-button);
  color: var(--color-buttonText);
  border: 0;
  border-radius: 20px;
}

#LogInButton:hover{
  transform: scale(1.05);
}

@media (prefers-color-scheme: dark) {
  #heading, #Info{
    background-color: rgba(0,0,0,0.8);
  }
}

</style>