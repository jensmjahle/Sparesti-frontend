<script setup lang="ts">

import MilestoneProgress from '@/components/MilestonePath/MilestoneProgress.vue'
import { onMounted, ref } from 'vue'
import DirectTransfer from '@/components/MilestonePath/DirectTransfer.vue'
import MilestoneDescription from '@/components/MilestonePath/MilestoneDescription.vue'
import MilestonePath from '@/components/MilestonePath/MilestonePath.vue'
import { deleteMilestone, directTransfer, getMilestoneDetails } from '@/utils/MilestonePathUtils'
import { useMilestoneStore } from '@/stores/currentMilestone'
import PathHelpPopUp from '@/components/popups/help/PathHelpPopUp.vue'
import MilestoneButton from '@/components/MilestonePath/MilestoneButton.vue'
import { useRouter } from 'vue-router'
import ProgressBar from '@/components/ProgressBar.vue'
import ConfirmTransferPopUp from '@/components/popups/ConfirmTransferPopUp.vue'
import DeleteMilestonePopUp from '@/components/popups/DeleteMilestonePopUp.vue'

const router = useRouter()
const displayType = ref<boolean>(false)
const displayHelpPopUp = ref<boolean>(false)

const pathName = ref("PathNameHere")
const pathDescription = ref("PathDescriptionHere")
const editLabel = ref("Rediger")
const deleteLabel = ref("Slett")
const deleteColor = ref('var(--vt-c-Raspberry)')
const editColor = ref('--vt-c-Orange')
const totalToSave = ref(3000)
const totalSaved = ref(0)

const milestonePathKey = ref(0);

/**
 * Sets the display type to show new challenges.
 */
const displayNewChallenges = () => {
  displayType.value = false;
};

/**
 * Sets the display type to show active challenges.
 */
const displayActiveChallenges = () => {
  displayType.value = true;
};

/**
 * Lifecycle hook that runs when the component is mounted.
 * Fetches milestone details and updates related values accordingly.
 * Redirects to '/homepage/milestone' if milestone details are not found.
 */
onMounted( async () =>{
  const milestoneId = useMilestoneStore().milestoneId;
  console.log(milestoneId)
  const response = await getMilestoneDetails(milestoneId)
  if (response === null) {
    await router.push('/homepage/milestone')
  } else {
  pathName.value = response.data.milestoneTitle
  pathDescription.value = response.data.milestoneDescription
  totalToSave.value = response.data.milestoneGoalSum
  totalSaved.value = response.data.milestoneCurrentSum
  milestonePathKey.value++;
  }
})


/**
 * Updates the total saved amount by performing a direct transfer and updating related values.
 * @param {number} value - The amount to be added to the total saved.
 */
function updateTotalSaved(value) {
  directTransfer(value, useMilestoneStore().milestoneId);
  totalSaved.value += value;
  milestonePathKey.value++;
  displayTransferPopUp.value = false;
}

/**
 * Opens the help pop-up by setting its display state to true.
 */
const openHelpPopUp = () => {
  displayHelpPopUp.value = true;
};

/**
 * Closes the help pop-up asynchronously by setting its display state to false.
 * This function can be awaited if needed.
 */
const closeHelpPopUp = async () => {
  displayHelpPopUp.value = false;
};


const displayTransferPopUp = ref<boolean>(false)
const refTransferAmount = ref(0)

/**
 * Opens the transfer confirmation pop-up with the specified value.
 * @param {number} value - The amount to transfer.
 */
const openTransferConfirmationPopUp = (value) => {
  refTransferAmount.value = value;
  displayTransferPopUp.value = true;
};

/**
 * Closes the transfer confirmation pop-up.
 */
const closeTransferConfirmationPopUp = () => {
  displayTransferPopUp.value = false;
};

/**
 * Reactive reference for displaying the delete-milestone pop-up.
 * @type {Ref<boolean>}
 */
const displayDeleteMilestonePopUp = ref<boolean>(false);

/**
 * Opens the delete-milestone pop-up.
 */
const openDeleteMilestonePopUp = () => {
  displayDeleteMilestonePopUp.value = true;
};

/**
 * Closes the delete milestone pop-up.
 */
const closeDeleteMilestonePopUp = () => {
  displayDeleteMilestonePopUp.value = false;
};

/**
 * Asynchronously deletes a milestone with the specified ID.
 * Logs a message indicating the delete method is called.
 * After successful deletion:
 * - Closes the delete milestone pop-up.
 * - Redirects to '/homepage/milestone'.
 * @param {number} milestoneId - The ID of the milestone to be deleted.
 */
async function deleteAMilestone(milestoneId:number){
  console.log("Delete method called")
  await deleteMilestone(milestoneId)
  closeDeleteMilestonePopUp()
  await router.push("/homepage/milestone")
}
</script>

<template>
  <div v-if="displayTransferPopUp" class="popup-container">
    <ConfirmTransferPopUp
      @closePopUp="closeTransferConfirmationPopUp"
      @confirmTransfer="updateTotalSaved(refTransferAmount)"
      :transfer-amount="refTransferAmount"
    ></ConfirmTransferPopUp>
  </div>
  <div v-if = "displayDeleteMilestonePopUp" class="popup-container">
    <DeleteMilestonePopUp
    @closeDeletePopUp="closeDeleteMilestonePopUp"
    @milestoneDeleted="deleteAMilestone(useMilestoneStore().milestoneId)"
    ></DeleteMilestonePopUp>
  </div>
  <div id = milestonePathView>
    <div class="header">
      <h2 class="title">Sparemål: {{pathName}}</h2>
      <img
        src="/src/components/icons/navigation/help.svg"
        alt="hjelp"
        @click="openHelpPopUp"
        tabindex="0"
        @keyup.enter="openHelpPopUp"
        class="help-icon">
      <div v-if="displayHelpPopUp" class="popup-container">
        <PathHelpPopUp
          @closePopUpp="closeHelpPopUp"
        ></PathHelpPopUp>
      </div>
    </div>

    <div class="toggle-buttons">
      <button class="toggle-button" @click="displayActiveChallenges" :class="{ 'active-button': displayType}">
        <h3 class="toggle-button-title">Informasjon</h3>
      </button>
      <button class="toggle-button" @click="displayNewChallenges" :class="{ 'active-button': !displayType}">
        <h3 class="toggle-button-title">Sparesti</h3>
      </button>
    </div>
    <div id = MilestonePath>

      <div id = Path :class="{'mobile-hide': displayType}">
        <MilestonePath :total-to-save="totalToSave" :total-saved="totalSaved" :key="milestonePathKey"/>
      </div>

      <div id = Info :class="{'mobile-hide': !displayType}">
        <div id = Progress>
          <MilestoneProgress :total-to-save="totalToSave" :total-saved="totalSaved"/>
        </div>
        <div id = Description>
          <MilestoneDescription :path-description="pathDescription"/>
        </div>
        <div id = Transfer>
          <DirectTransfer @transfer-value="openTransferConfirmationPopUp"/>
        </div>
        <div id = buttons>
          <milestone-button :label="editLabel" :button-color="editColor" @click="router.push('/homepage/edit-milestone')"></milestone-button>
          <milestone-button :label="deleteLabel" :button-color="deleteColor" @delete="openDeleteMilestonePopUp"></milestone-button>
        </div>
      </div>

    </div>
  </div>



</template>

<style scoped>

  #milestonePathView{
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    gap: 2.5%;
  }

  .header{
    display: flex;
    flex-direction: row;
    place-content: space-between;
    max-height: 6.5%;
  }

  .title{
    color: var(--color-heading);
  }

  .help-icon:hover{
    transform: scale(1.05);
    cursor: pointer;
  }

  .popup-container {
    position: fixed; /* Change to fixed to cover the entire viewport */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    background-color: rgba(64, 64, 64, 0.5);

    align-items: center;
    z-index: 1000; /* Adjust z-index as needed */
  }

  .toggle-buttons{
    display: none;
  }

  #MilestonePath{
    display: flex;
    width: 100%;
    height: 94.5%;
  }

  #Path{
    width: 60%;
    height: 100%;
  }

  #Info{
    width: 40%;
    height: 100%;
  }

  #Progress{
    width: 100%;
    height: 20%;
  }

  #Progress, #Transfer{
    margin-bottom: 5%;
  }

  #Description{
    margin-bottom: 1.5%
  }
  #buttons{
    display: flex;
    flex-direction: row;
  }
  @media only screen and (max-width: 1000px) {
    #Path{
      height: 80%;
    }

    #Path{
      width: 100%;
    }

    #Info{
      width: 100%;
    }

    .toggle-buttons{
      display: flex;
      flex-direction: row;
      width: 100%;
      min-height: 7.5%;
      place-content: space-between;
    }

    .toggle-button{
      width: 49.5%;
      border-radius: 20px;
      border: none;
      background-color: var(--color-confirm-button);
    }

    .toggle-button:hover{
      transform: scale(1.02);
    }

    .toggle-button-title{
      font-weight: bold;
      color: var(--color-headerText);
    }

    .active-button{
      background-color: var(--color-confirm-button-click);
    }

    .mobile-hide{
      display: none;
    }
    #buttons{
      flex-direction: column;
    }
  }
  @media (prefers-color-scheme: dark) {
    .help-icon{
      filter: invert(1);
    }
  }

</style>
