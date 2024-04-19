<script setup lang="ts">

import { ref } from 'vue'
import UserInfo from '@/components/profile/UserInfo.vue'
import BankAccountInfo from '@/components/profile/BankAccountInfo.vue'
import IncomeInfo from '@/components/profile/IncomeInfo.vue'
import BadgeInfo from '@/components/profile/BadgeInfo.vue'
import PasswordInfo from '@/components/profile/PasswordInfo.vue'

const username = ref<string>('$$$$')

</script>

<template>
  <div class="profile-view">
    <h2 class="view-title">{{username}}</h2>
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
      <div class="component">
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

.component{
  border: 2px solid var(--color-border);
  border-radius: 20px;
  width: 100%;
  padding: 1.0%;
}

#user-info, #income-info{
  width: 60%;
}

#password-info, #account-info{
  width: 40%;
}

@media only screen and (max-width: 1000px){
  #top, #middle{
    display: flex;
    flex-direction: column;
  }
  #user-info, #password-info, #income-info, #account-info{
    width: 100%;
  }
}

</style>