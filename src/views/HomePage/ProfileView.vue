<script setup lang="ts">

import { onMounted, ref } from 'vue'
import UserInfo from '@/components/profile/UserInfo.vue'
import BankAccountInfo from '@/components/profile/BankAccountInfo.vue'
import IncomeInfo from '@/components/profile/IncomeInfo.vue'
import BadgeInfo from '@/components/profile/BadgeInfo.vue'
import PasswordInfo from '@/components/profile/PasswordInfo.vue'
import { getUserInfo } from '@/utils/profileutils'
import { useTokenStore } from '@/stores/token'
import DeleteUserPopUp from '@/components/popups/DeleteUserPopUp.vue'

const token:string = useTokenStore().jwtToken;

const firstName = ref<string>('Profile');
const lastName = ref<string>('');

const displayDeletePopUp = ref<boolean>(false)

/**
 * Handles logic needed before the view can be used.
 * @returns {void}
 */
onMounted(async () => {
  try {
    await fetchUserInfo();
  } catch (error) {
    console.error('Error fetching user info:', error);
  }
})

/**
 * Handles fetching info connected to a user and stores the data in variables.
 * @returns {void}
 */
const fetchUserInfo = async () =>{
  try{
    const response = await getUserInfo(token)
    firstName.value = response.firstName;
    lastName.value = response.lastName;

  } catch (error){
    console.error('Error fetching user info:', error);
  }
}

/**
 * Calls the function that handles logging out a user.
 * @returns {void}
 */
const logout = () => {
  useTokenStore().logout();
}

/**
 * Sets boolean that controls delete user popup.
 * @returns {void}
 */
const handleRequestToDeleteUser = async () => {
  displayDeletePopUp.value = true;
}

/**
 * Sets boolean that controls delete user popup.
 * @returns {void}
 */
const closeDeletePopUp = async () => {
  displayDeletePopUp.value = false;
}

</script>

<template>
  <div v-if="displayDeletePopUp" class="popup-container">
    <DeleteUserPopUp
      @closeDeletePopUp="closeDeletePopUp"
    ></DeleteUserPopUp>
  </div>
  <div class="profile-view">
    <div class="header">
      <h2 class="view-title">{{firstName}} {{lastName}}</h2>
      <button class="user-button" id="logout-button" @click="logout">
        <h3 class="user-button-title">Logg ut</h3>
      </button>
    </div>
    <div id="top">
      <div class="component" id="user-info" >
        <UserInfo></UserInfo>
      </div>
      <div class="component" id="password-info">
        <password-info></password-info>
      </div>
    </div>
    <div id="middle">
      <div class="component" id="income-info">
        <IncomeInfo titel=""></IncomeInfo>
      </div>
      <div class="component" id="account-info">
        <BankAccountInfo></BankAccountInfo>
      </div>
    </div>
    <div id="bottom">
      <div class="component" id="badges">
        <BadgeInfo title="Mynter"></BadgeInfo>
      </div>
      <div class="delete-user-button-box">
        <button class="user-button" id="delete-user-button" @click="handleRequestToDeleteUser">
          <h3 class="user-button-title">Slett bruker</h3>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.popup-container {
  position: fixed; /* Change to fixed to cover the entire viewport */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: rgba(64, 64, 64, 0.5);

  align-items: center;
  z-index: 1000; /* Adjust z-index as needed */
}


.profile-view{
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  gap: 2.5%;
}

.header{
  display: flex;
  flex-direction: row;
  width: 100%;
  place-content: space-between;
}

.view-title{
  color: var(--color-heading);
}

.user-button{
  border-radius: 20px;
  width: 20%;
  border: none;
}

.user-button:hover{
  transform: scale(1.02);
}

#logout-button{
  background-color: var(--color-logout-button);
}

#logout-button:active{
  background-color: var(--color-logout-button-click);
}

.user-button-title{
  color: var(--color-headerText);
  font-weight: bold;
}

#top, #middle{
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 1.5%;
}

#top{
  min-height: 35%;
}

#middle{
  min-height: 38.5%;
}

#bottom{
  height: 50%;
  min-height: 40%;
}
.component{
  border: 2px solid var(--color-border);
  border-radius: 20px;
  box-shadow: 0 4px 4px var(--color-shadow);
  width: 100%;
  padding: 1.0%;
}

#user-info, #income-info{
  width: 60%;
  height: 100%;
}

#password-info, #account-info{
  width: 40%;
  height: 100%;
}

#badges{
  width: 100%;
  height: 100%;
}

.delete-user-button-box{
  display: flex;
  width: 100%;
  height: 20%;
  margin-top: 1.5%;
  margin-bottom: 1.5%;
  padding: 0.02%;
  place-content: center;
}

#delete-user-button{
  width: 25%;
  background-color: var(--color-cancel-button);
}

#delete-user-button:active{
  background-color: var(--color-cancel-button-click);
}

@media only screen and (max-width: 1000px){
  #top{
    display: flex;
    flex-direction: column;
    place-content: space-evenly;
    width: 100%;
    min-height: 60%;
  }
  #middle{
    display: flex;
    flex-direction: column;
    place-content: space-evenly;
    width: 100%;
    min-height: 70%;
  }
  #user-info, #password-info, #income-info, #account-info{
    width: 100%;
  }

  #user-info, #password-info{
    height: 50%;
  }

  #delete-user-button{
    width: 35%;
    height: 75%;
  }

}

</style>