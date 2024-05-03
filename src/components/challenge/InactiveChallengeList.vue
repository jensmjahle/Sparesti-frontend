<script setup lang="ts">

import PotentialChallengeDisplay from '@/components/challenge/InactiveChallengeDisplay.vue'
import { onMounted, ref } from 'vue'
import { getInactiveChallenges } from '@/utils/challengeutils'
import { useTokenStore } from '@/stores/token'

/**
 * Initiates object type challenge with all necessary fields for a challenge
 */
interface Challenge{
  challengeId: number,
  challengeTitle: string,
  challengeDescription: string,
  goalSum:number,
  expirationDate:string
}

/**
 * Gets the users token from the token store and stores it in the token variable
 */
const token:string = useTokenStore().jwtToken;

/**
 * Holds a list of inactive challenges
 */
const inactiveChallenges = ref<Challenge[]>([])

/**
 * Functionality to be triggered on component mount
 */
onMounted(async () => {
  try {
    await fetchInactiveChallenges();
  } catch (error) {
    console.error('Error fetching user info:', error);
  }
})

/**
 * Fetches inactive challenges for the given user
 */
const fetchInactiveChallenges = async () => {
  try {
    const { content}  = await getInactiveChallenges(token)
    inactiveChallenges.value = content;
  } catch (error) {
    console.error('Error fetching active challenges:', error);
  }
}

/**
 * Function to handle the emitted challengeAccepted event
 */
const handleChallengeAccepted = async () => {
  await fetchInactiveChallenges();
}

/**
 * Function to handle the emitted challengeDeclined event
 */
const handleChallengeDeclined = async () => {
  await fetchInactiveChallenges();
}

</script>

<template>
  <div class="inactive-challenge-list">

    <div class="challenge-recommendations">
      <PotentialChallengeDisplay
        class="potential-challenge"
        v-for="(potentialChallenge, index) in inactiveChallenges"
        :key="index"
        :challenge="potentialChallenge"
        @challengeAccepted="handleChallengeAccepted"
        @challengeDeclined="handleChallengeDeclined"
      ></PotentialChallengeDisplay>

      <h4 class="challenge-placeholder" v-if="inactiveChallenges.length == 0">
        Ojda, her gikk det unna.<br>
        Vi har for øyeblikket ingen flere forslag til utfordringer. <br>
        Lag din egen personlige utfordring eller kom tilbake senere! <br>
        Nye utfordringer blir generert med gjevne mellomrom.
      </h4>
    </div>

  </div>

</template>

<style scoped>

.inactive-challenge-list{
  display: flex;
  flex-direction: column;
  place-content: space-between;

  gap: 2.5%;

  width: 100%;
  height: 100%;
}

.challenge-recommendations{
  display: flex;
  flex-direction: column;

  height: 100%;
  width: 100%;
  gap: 2.5%;
}

.challenge-placeholder{
  text-align: center;
}

.potential-challenge{
  border-radius: 20px;
  border: 2px solid var(--color-border);
  box-shadow: 0 4px 4px var(--color-shadow);

  height: calc(100%/3);
  width: 100%;
}

.potential-challenge:hover{
  transform: scale(1.02);
}

</style>