<script setup lang="ts">
import {useTokenStore} from "@/stores/token";

const props = defineProps({
  show: Boolean,
});

const emit = defineEmits(['close']);

const continueBrowse = () => {
  useTokenStore().refreshToken();
  useTokenStore().actualTokenTimer();
  emit('close');
};

const logoutFromBrowse = () => {
  useTokenStore().logout();
  emit('close');
};
</script>

<template>
  <div v-if="show" class="popup">
    <div class="popup-content">
      <h2>Din økt holder på å løpe ut</h2>
      <p>Trykk "Fortsett" for å fortsette økten, eller trykk "Logg ut" dersom du er ferdig</p>
      <button class="continueBtn" @click="continueBrowse">Fortsett</button>
      <button class="cancelBtn" @click="logoutFromBrowse">Logg ut</button>
    </div>
  </div>
</template>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: var(--color-background);
  padding: 20px;
  border-radius: 20px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.6);
  color: var(--color-heading);
  display: grid;
}

.popup-content h2 {
  color: var(--color-heading);
}

.popup-content p {
  color: var(--color-text);
}

.popup-content button {
  //background-color: var(--color-confirm-button);
  color: var(--color-buttonText);
  border: 0;
  border-radius: 20px;
  padding: 1%;
  min-width: 30%;
  font-size: 250%;
  margin: 4%;
}

.popup-content button:hover {
  transform: scale(1.05);
  cursor: pointer;
}

.popup-content button:disabled {
  background-color: grey;
  color: black;
  cursor: not-allowed;
}

.popup-content button:disabled:hover {
  transform: none;
  cursor: not-allowed;
}

h2 {
  text-align: center;
}

p {
  text-align: center;
}

.continueBtn {
  background-color: var(--color-confirm-button);
}

.cancelBtn {
  background-color: var(--color-cancel-button);
}

.cancelBtn:active {
  background-color: var(--color-cancel-button-click);
}

.continueBtn:active {
  background-color: var(--color-confirm-button-click);
}
</style>