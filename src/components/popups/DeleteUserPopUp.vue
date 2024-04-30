<script setup lang="ts">

import { useTokenStore } from '@/stores/token'
import { deleteUser } from '@/utils/profileutils'

const token:string = useTokenStore().jwtToken;
const emit = defineEmits(['closeDeletePopUp', 'challengeDeleted']);

const cancelCompleteThisChallenge = () => {
  emit('closeDeletePopUp');
}

const deleteThisUser = async () => {
  try{
    await deleteUser(token);
    useTokenStore().logout();
  }catch (error){
    console.log(error)
  }
}

</script>

<template>
  <div class="popup-content">
    <!-- Pop-up content goes here -->
    <h2>Er du sikker på at du vil slette brukeren?</h2>

    <div class="content">
      <img class="sad-pig-img" src="/src/assets/png/sad-pig.png" alt="sad-pig" >
      <h3> Husk! Dagens små sparinger kan føre til morgendagens store drømmer.</h3>
    </div>

    <div class="option-buttons">
      <button class="option-button" id="cancel-button" @click="cancelCompleteThisChallenge()">
        <h2 class="option-button-title">Avbryt</h2>
      </button>
      <button class="option-button" id="delete-button" @click="deleteThisUser()">
        <h2 class="option-button-title">Slett</h2>
      </button>
    </div>
  </div>

</template>

<style scoped>
.popup-content {
  display: flex;
  flex-direction: column;

  width: 50%;
  height: 50%;
  background-color: var(--color-background);

  padding: 20px;
  border-radius: 10px;
  border: 2px solid var(--color-border);

  place-content: space-between;

}

.content{
  display: flex;
  flex-direction: row;
  place-items: center;
}

.sad-pig-img{
  width:30%;
}


.option-buttons{
  display: flex;
  flex-direction: row;

  width: 100%;
  place-content: space-between;
}

.option-button{
  border: none;
  border-radius: 20px;
  width: 35%;

}

.option-button-title{
  color: var(--color-headerText);
  font-weight: bold;
}

#cancel-button{
  background-color: var(--color-cancel-button);
}
#cancel-button:active{
  background-color: var(--color-cancel-button-click);
}

#delete-button{
  background-color: var(--color-confirm-button);
}
#delete-button:active{
  background-color: var(--color-confirm-button-click);
}

#delete-button:hover, #cancel-button:hover{
  transform: scale(1.02);
}

@media only screen and (max-width: 1000px){
  .popup-content {
    width: 90%;
    height: 60%;
  }
}

</style>