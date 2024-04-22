<script setup lang="ts">
import TopNav from '@/components/navigation/TopNav.vue'
import SideNav from '@/components/navigation/SideNav.vue'

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
  height: 100%;
  width: 100%;
}

.side-nav{
  width: 15%;
  min-height: 650px;
  padding: 2.0% 1.0% 2.0%  1.0% ;
  box-shadow: 0 2px 5px var(--color-shadow);
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
}

</style>