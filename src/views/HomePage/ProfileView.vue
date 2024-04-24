<script setup lang="ts">

import { onMounted, ref } from 'vue'
import UserInfo from '@/components/profile/UserInfo.vue'
import BankAccountInfo from '@/components/profile/BankAccountInfo.vue'
import IncomeInfo from '@/components/profile/IncomeInfo.vue'
import BadgeInfo from '@/components/profile/BadgeInfo.vue'
import PasswordInfo from '@/components/profile/PasswordInfo.vue'
import { getUserInfo } from '@/utils/profileutils'

const firstName = ref<string>('');
const lastName = ref<string>('');

onMounted(async () => {
  try {
    await fetchUserInfo();
  } catch (error) {
    console.error('Error fetching user info:', error);
  }
})
const fetchUserInfo = async () =>{
  try{
    const response = await getUserInfo()
    console.log(response)
    firstName.value = response.firstName;
    lastName.value = response.lastName;

  } catch (error){
    console.error('Error fetching user info:', error);
  }
}

</script>

<template>
  <div class="profile-view">
    <h2 class="view-title">{{firstName}} {{lastName}}</h2>
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
    </div>
  </div>
</template>

<style scoped>

.profile-view{
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  gap: 2.5%;
}

.view-title{
  color: var(--color-heading);
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
  padding-bottom: 100px;
  min-height: 35%;
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
}

</style>