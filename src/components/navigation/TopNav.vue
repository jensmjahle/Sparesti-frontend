<script setup lang="ts">
import { onMounted, ref } from 'vue'
import DropDownMenu from '@/components/navigation/DropNav.vue'
import { useRouter } from 'vue-router'
import { getUserInfo } from '@/utils/profileutils'
import { useTokenStore } from '@/stores/token'
import eventBus from '@/components/service/eventBus.js'

const router = useRouter();
const isBurgerMenuOpen = ref(false);
const profilePictureBase64 = ref<any>()
const tokenStore = useTokenStore()

const fetchProfilePicture = async () =>{
  try{
    const response = await getUserInfo(tokenStore.jwtToken)
    profilePictureBase64.value = response.profilePictureBase64 ?
      `data:image/png;base64,${response.profilePictureBase64}` : null
  } catch (error){
    console.error('Error fetching user info:', error);
  }
}
onMounted(async () => {
  try {
    await fetchProfilePicture();
  } catch (error) {
    console.error('Error fetching user picture:', error);
  }
})


const openBurgerMenu = () => {
  if(isBurgerMenuOpen.value) {
    isBurgerMenuOpen.value = false;
  } else {
    isBurgerMenuOpen.value = true
  }
}

const handleRoutePushed = (value: boolean) => {
  isBurgerMenuOpen.value = value;
}

const navigate = (path: string) => {
  router.push(path)
}

eventBus.on('updateProfilePicture', () => {
  fetchProfilePicture();
});

</script>

<template>
  <div class="top-nav">
    <div class="title-box" tabindex="0" @keyup.enter="navigate('/homepage/home')">
    <h2 class="title" @click="navigate('/homepage/home')">Sparesti<img src="/src/assets/png/pig_394778.png" alt = "logo" id = "logo"></h2>
    </div>
    <div class="button-menu">
      <img src="/src/components/icons/navigation/menu-burger.svg" v-if="!isBurgerMenuOpen" alt="Menu Options" class="burger-menu" @click="openBurgerMenu">
      <img src="/src/components/icons/navigation/cross.svg" v-if="isBurgerMenuOpen" alt="Exit Options" class="exit-burger-menu" @click="openBurgerMenu">
      <div class="img-input">
        <label for="profile-picture-input" class="profile-picture-button" @click="navigate('/homepage/profile')">
          <img v-if="profilePictureBase64" :src="profilePictureBase64" alt="profile-picture" class="profile-picture">
          <img v-else src=/src/components/icons/navigation/user.svg alt="profile-picture" class="profile-picture">
        </label>
      </div>
    </div>
  </div>
  <DropDownMenu class="burger" v-if="isBurgerMenuOpen" @route-pushed="handleRoutePushed"></DropDownMenu>
</template>

<style scoped>
.top-nav{
  display: flex;
  flex-direction: row;

  height: 100%;
  width: 100%;
  padding: max(1.0%, 15px);

  background-color: var(--color-header);
  box-shadow: 0 4px 6px var(--color-shadow);
}

#logo{
  max-width: 7vh;
  max-height: 7vh;
}

.title-box{
  display: flex;
  flex-direction: row;
  place-items: start;
  align-items: center;

  width: 50%;
  height: 100%;
}

.title{
  color: var(--color-buttonText);
  padding: 2vh;
  align-items: center;
  display: flex;
  cursor: pointer;
}

.title:hover{
  cursor: pointer;
  transform: scale(1.05);
}

.button-menu{
  display: flex;
  flex-direction: row;

  place-content: end;
  place-items: center;

  height: 100%;
  width: 50%;
  gap: 8.0%;
}

.img-input{
  height: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  justify-content: center; /* Center horizontally */
  align-items: center;
  place-content: center;
  background-color: var(--color-headerText);
}

.img-input:hover{
  transform: scale(1.05);
}

.profile-picture-button{
  display: flex;
  flex-direction: column;
  place-content: center;
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: var(--color-headerText);
  border: 2px solid var(--color-border);
}

.profile-picture-button:hover{
  transform: scale(1.05);
  cursor: pointer;
}

.profile-picture{
  width: 100%;
  aspect-ratio: 1/1 ;
  border-radius: 50%;
}

.burger-menu{
  height: 80%;
  aspect-ratio: 1 / 1;
  filter: invert(1);
}

.exit-burger-menu{
  height: 70%;
  aspect-ratio: 1/1;
  filter: invert(1);
}

.burger-menu:hover{
  transform: scale(1.05);
}

.exit-burger-menu:hover{
  transform: scale(1.05);
}
@media only screen and (min-width: 1000px){
  .burger-menu{
    display: none;
  }
}
</style>
