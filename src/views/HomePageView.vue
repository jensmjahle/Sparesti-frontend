<script setup lang="ts">
import TopNav from '@/components/navigation/TopNav.vue'
import SideNav from '@/components/navigation/SideNav.vue'
import { onMounted, ref, watch, onUnmounted } from 'vue'
import { useTokenStore } from '@/stores/token'
import HomePagePopUp from './HomePage/HomePagePopUp.vue'
import router from '@/router'

const store = useTokenStore()
const showPopup = ref()
const isMounted = ref<boolean>(false)
let timer = null as ReturnType<typeof setTimeout> | null

/**
 * Handles logic that is needed on the view and executes when the view is mounted.
 * @returns {void}
 */
onMounted(async () => {
  if (
    store.jwtToken === '' ||
    store.jwtToken.includes('Request') ||
    !store.isConnectedToBank ||
    store.jwtToken.includes('Error')
  ) {
    await router.push('/login')
  }

  await store.reHydrate()

  showPopup.value = store.displayPopUp

  timer = setInterval(() => {
    // After a certain interval, assume user is inactive
    useTokenStore().setActive(false)
  }, 60000)

  // Add event listeners when the component is mounted
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('keydown', handleKeyDown)

  isMounted.value = true
})

/**
 * Handles logic that needs to be reset when the view is unmounted.
 * @returns {void}
 */
onUnmounted(async () => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('keydown', handleKeyDown)
})

/**
 * Handles mouseMove action.
 * @returns {void}
 */
const handleMouseMove = () => {
  useTokenStore().setActive(true)
}

/**
 * Handles keyDown action.
 * @returns {void}
 */
const handleKeyDown = () => {
  useTokenStore().setActive(true)
}

/**
 * Listens to changes in the store.displayPopUp value.
 * Updates showPopUp in case of change.
 */
watch(
  () => store.displayPopUp,
  (newVal) => {
    if (newVal) {
      showPopup.value = true
    }
  }
)

/**
 * Sets showPopUp to false.
 * @returns {void}
 */
const closePopup = () => {
  showPopup.value = false
}
</script>

<template>
  <div class="home-page" v-if="isMounted">
    <div class="top">
      <TopNav></TopNav>
    </div>
    <div class="main">
      <div class="side-nav">
        <SideNav></SideNav>
      </div>
      <div class="view-element">
        <div class="popup-container" v-if="showPopup">
          <HomePagePopUp :show="showPopup" @close="closePopup" />
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  place-items: start;
  align-items: start;
  height: 100%;
  width: 100%;
}

.top {
  z-index: 1;
  width: 100%;
  height: 12%;
  min-height: 75px;
}

.main {
  display: flex;
  flex-direction: row;
  height: 88%;
  width: 100%;
  min-height: 700px;
}

.side-nav {
  width: 15%;
  padding: 2% 1% 2% 1%;
  box-shadow: 0 2px 5px var(--color-shadow);
}

.popup-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);

  align-items: center;
  z-index: 1000;
}

.view-element {
  width: 85%;
  height: 100%;
  padding: 2%;

  overflow-y: scroll;
}

@media only screen and (max-width: 1000px) {
  .side-nav {
    display: none;
  }
  .view-element {
    width: 100%;
  }

  .main {
    min-height: 0;
  }

  .view-element {
    min-height: 650px;
  }
}
</style>
