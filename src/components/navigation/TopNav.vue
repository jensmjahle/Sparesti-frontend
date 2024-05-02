<script setup lang="ts">
import { onMounted, ref } from 'vue'
import DropDownMenu from '@/components/navigation/DropNav.vue'
import { useRouter } from 'vue-router'
import { getUserInfo } from '@/utils/profileutils'
import { useTokenStore } from '@/stores/token'

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

</script>

<template>
  <div class="top-nav">
    <div class="title-box">
    <h2 class="title" @click="navigate('/homepage/home')">Sparesti</h2>
    </div>
    <div class="button-menu">
      <img src="/src/components/icons/navigation/menu-burger.svg" v-if="!isBurgerMenuOpen" alt="Menu Options" class="burger-menu" @click="openBurgerMenu">
      <img src="/src/components/icons/navigation/cross.svg" v-if="isBurgerMenuOpen" alt="Exit Options" class="exit-burger-menu" @click="openBurgerMenu">
      <button class="profile-button" @click="navigate('/homepage/profile')">
        <img v-if="profilePictureBase64" :src="profilePictureBase64" alt="profile-picture" class="profile-icon">
        <img v-else src="/src/components/icons/navigation/user.svg" alt="Home Icon" class="profile-icon">
      </button>
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

.title-box{
  display: flex;
  flex-direction: row;
  place-items: start;
  align-items: center;

  width: 50%;
  height: 100%;
}

.title{
  color: var(--color-headerText);
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

.profile-button{
  height: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  border: 0;
  background-color: var(--color-headerText);
}

.profile-button:hover{
  transform: scale(1.05);
}

.profile-icon{
  height: 100%;
  width: 100%;
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
