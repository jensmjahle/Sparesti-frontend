<script setup lang="ts">
import TopNav from '@/components/navigation/TopNav.vue'
import SideNav from '@/components/navigation/SideNav.vue'
import { onMounted, ref, watch } from 'vue';
import { useTokenStore } from '@/stores/token';
import HomePagePopUp from './HomePage/HomePagePopUp.vue';

const store = useTokenStore();
const showPopup = ref(false);

onMounted(() => {
  showPopup.value = store.displayPopUp;
  console.log('showPopup', store.displayPopUp);
});

watch(
    () => store.displayPopUp,
    (newVal) => {
      if (newVal) {
        showPopup.value = true;
      }
    }
);

const closePopup = () => {
  showPopup.value = false;
};
</script>

<template>
  <div class="home-page">
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
.home-page{
  display: flex;
  flex-direction: column;
  place-items: start;
  align-items: start;
  height: 100%;
  width: 100%;
}

.top{
  z-index: 1;
  width: 100%;
  height: 12%;
  min-height: 75px;
}

.main{
  display: flex;
  flex-direction: row;
  height: 88%;
  width: 100%;
  min-height: 650px;
}

.side-nav{
  width: 15%;
  padding: 2.0% 1.0% 2.0%  1.0% ;
  box-shadow: 0 2px 5px var(--color-shadow);
}

.popup-container{
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

.view-element{
  width: 85%;
  height: 100%;
  padding: 2.0%;

  overflow-y: scroll;
}

@media only screen and (max-width: 1000px){
  .side-nav{
    display: none;
  }
  .view-element{
    width: 100%;
  }

  .main{
    min-height: 0;
  }

  .view-element{
    min-height: 650px;
  }
}

</style>