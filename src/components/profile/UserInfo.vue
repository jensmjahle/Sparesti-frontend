<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { getUserInfo, updateUserInfo } from '@/utils/profileutils'
import { useTokenStore } from '@/stores/token'
import eventBus from '@/components/service/eventBus.js'
import { useToast } from 'vue-toast-notification'

/**
 * Initiates toast for error messages
 */
const toast = useToast()

/**
 * Holds the email error
 */
const emailError = ref<null | string>(null)

/**
 * Holds the image error
 */
const imgError = ref<null | string>(null)

/**
 * Holds the input error
 */
const inputError = ref<null | string>(null)

/**
 * Holds the username
 */
const username = ref<string>('')

/**
 * Holds the email
 */
const email = ref<string>('')

/**
 * Holds the profile picture as a base 64 encoded string
 */
const profilePictureBase64 = ref<any>()

/**
 * Code to be executed on component mount
 */
onMounted(async () => {
  try {
    await fetchUserInfo()
  } catch (error) {
    console.error('Error fetching user info:', error)
  }
})

/**
 * Fetches the user info for the username, email and profile picture
 */
const fetchUserInfo = async () => {
  try {
    const response = await getUserInfo(useTokenStore().jwtToken)
    username.value = response.username
    email.value = response.email
    profilePictureBase64.value = response.profilePictureBase64
      ? `data:image/png;base64,${response.profilePictureBase64}`
      : null
  } catch (error) {
    console.error('Error fetching user info:', error)
  }
}

/**
 * Validates the entries in the email and img fields
 */
const validInput = () => {
  checkInput()
  return emailError.value == null && imgError.value == null
}

/**
 * Checks that the inputs in the email and image fields follow the standard
 */
const checkInput = () => {
  if (email.value.trim() == '' || !isValidEmail(email.value)) {
    emailError.value = 'Ikke gyldig e-post adresse!'
  } else {
    emailError.value = null
  }

  inputError.value = null
}
const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return email.trim() !== '' && emailRegex.test(email)
}

const saveUserInfo = async () => {
  checkInput()
  if (validInput()) {
    try {
      await updateUserInfo(useTokenStore().jwtToken, email.value, profilePictureBase64.value)
      eventBus.emit('updateProfilePicture')
      toast.success('Bruker opplysninger ble lagret!')
    } catch (error) {
      inputError.value = 'Noe gikk galt! Venligst prøv på nytt.'
    }
  }
}

/**
 * Handles file change when the user decides to change their profile picture
 * @param event
 */
const handleFileChange = (event: any) => {
  const file = event.target.files[0]
  if (file) {
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      imgError.value = 'Invalid image format. Please upload a JPEG or PNG file.'
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      profilePictureBase64.value = e.target?.result
      imgError.value = null
    }
    reader.readAsDataURL(file)
  }
}

const fileInput = ref<HTMLInputElement | null>(null)

/**
 * Opens the file explorer to let the user select new image
 */
const openFileExplorer = () => {
  if (fileInput.value instanceof HTMLInputElement) {
    fileInput.value.click()
  }
}
watch(email, checkInput)
</script>

<template>
  <div class="user-info">
    <div class="header">
      <h3 class="title">Bruker opplysninger</h3>
      <button class="save-button" @click="saveUserInfo">
        <h3 class="save-button-title">Lagre</h3>
      </button>
    </div>
    <div class="input-fields">
      <div class="img-input">
        <button
          tabindex="0"
          type="button"
          for="profile-picture-input"
          class="profile-picture-button"
          @click="openFileExplorer"
        >
          <input
            type="file"
            style="display: none"
            ref="fileInput"
            accept="image/png, image/jpeg"
            @change="handleFileChange"
          />
          <div class="profile-picture-container">
            <img
              v-if="profilePictureBase64"
              :src="profilePictureBase64"
              alt="profile-picture"
              class="profile-picture"
            />
            <img
              v-else
              src="/src/components/icons/navigation/user.svg"
              alt="profile-picture"
              class="profile-picture"
            />
            <img
              src="/src/components/icons/image/edit-image.png"
              alt="edit-icon"
              class="edit-icon"
            />
          </div>
        </button>
      </div>
      <div class="text-input" @keyup.enter="saveUserInfo">
        <div class="input-collection">
          <H4>Brukernavn: </H4>
          <input class="input" id="username-input" v-model="username" readonly disabled />
        </div>
        <div class="input-collection">
          <H4>E-post: </H4>
          <input class="input" id="email-input" :class="{ error: emailError }" v-model="email" />
          <div class="alert-box">
            <h4 v-if="emailError" class="error-message">{{ emailError }}</h4>
            <h4 v-if="inputError" class="error-message">{{ inputError }}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-info {
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
}

.header {
  display: flex;
  flex-direction: row;
  place-content: space-between;
  width: 100%;
}

.title {
  font-weight: bold;
}

.save-button {
  border-radius: 20px;
  padding-right: 5%;
  padding-left: 5%;
  color: var(--color-headerText);
  background-color: var(--color-save-button);
  border: none;
}

.save-button:hover {
  transform: scale(1.02);
}

.save-button:active {
  background-color: var(--color-save-button-click);
}

.save-button-title {
  font-weight: bold;
}

.input-fields {
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-items: center;

  height: 100%;
  width: 100%;

  gap: 2%;
}

.text-input {
  flex: 1;
  display: flex;
  flex-direction: column;
  place-content: start;

  height: 100%;
}

.input {
  border-radius: 20px;
  border: 2px solid var(--color-border);
  min-height: 30px;
  padding-left: 2%;
}

#username-input {
  background-color: #cccccc;
  border: none;
  color: var(--color-text-black);
}

.img-input {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 25%;
  justify-content: center;
}

.profile-picture-container {
  position: relative; /* Make the container relative */
}

.edit-icon {
  position: absolute;
  top: 0;
  left: -1vw;
  width: 2vw;
  height: 2vw;
  z-index: 1;
  transform: scaleX(-1);
}

.input-collection {
  flex: 1;
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 50%;
}

.save-button {
  border-radius: 20px;
  padding-right: 5%;
  padding-left: 5%;
  color: var(--color-headerText);
  font-weight: bold;
  background-color: var(--color-save-button);
  border: none;
}

.save-button:hover {
  transform: scale(1.02);
}

.save-button:active {
  background-color: var(--color-save-button-click);
}

.profile-picture-button {
  display: flex;
  flex-direction: column;
  place-content: center;
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: var(--color-headerText);
  border: 2px solid var(--color-border);
}

.profile-picture-button:hover {
  transform: scale(1.05);
  cursor: pointer;
}

.profile-picture {
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 50%;
}

.alert-box {
  display: flex;
  flex-direction: column;

  place-items: center;
  width: 100%;
  min-height: 20px;
}

.error {
  border-color: var(--color-border-error);
}

.error-message {
  color: var(--color-text-error);
}

@media only screen and (max-width: 1000px) {
  .img-input {
    max-width: 15%;
  }
}

@media (prefers-color-scheme: dark) {
  .edit-icon {
    filter: invert(1);
  }
}
</style>
