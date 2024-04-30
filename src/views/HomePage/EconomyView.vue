<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Pie } from 'vue-chartjs'
import { ArcElement, Chart as ChartJS, Colors, Legend, Tooltip } from 'chart.js'
import TransactionComponent from '@/components/economy/TransactionComponent.vue'
import ToggleButton from '@/components/economy/ToggleButton.vue'
import { getTransactions } from '@/utils/TransactionUtils'
import { useTokenStore } from '@/stores/token'
import MilestoneHelpPopUp from '@/components/popups/help/MilestoneHelpPopUp.vue'
import EconomyHelpPopUp from '@/components/popups/help/EconomyHelpPopUp.vue'

ChartJS.register(ArcElement,Tooltip,Legend, Colors)

interface Transaction {
  "transactionCategory": string,
  "transactionTitle": string,
  "amount": number,
  "transactionId": number,
  "date": string,

}

const token:string = useTokenStore().jwtToken;

const selectedOption = ref<string | null>("")

const displayHelpPopUp = ref<boolean>(false)



const pages = ref<number>(0);
const currentPage = ref<number>(0);

const previousPage = () => {
  currentPage.value --
  fetchTransactions();
}
const goToPage = (pageNumber:number) => {
  currentPage.value = pageNumber;
  fetchTransactions();
}

const nextPage = () =>{
  currentPage.value ++;
  fetchTransactions();
}

const transactions = ref<Transaction[]>([])
const fetchTransactions = async() =>  {
  try{
    const response = await getTransactions(token,0,6)
    transactions.value = response
    console.log(transactions.value)
  } catch (e) {
    console.log(e)
  }

}
onMounted(()  => {
  fetchTransactions()
})

const displayType = ref<boolean>(false)

const displayNewChallenges = () => {
  displayType.value = false;
  console.log(displayType.value)
}
const displayActiveChallenges = () => {
  displayType.value = true;
  console.log(displayType.value)
}

const openHelpPopUp = () => {
  displayHelpPopUp.value = true;
}
const closeHelpPopUp = () => {
  displayHelpPopUp.value = false;
  console.log(displayHelpPopUp);
}

const handleSelectionChange = (value: string | null) => {
  selectedOption.value = value
}

const distinctCategories = computed(() => {
  const categories = new Set<string>()
  transactions.value.forEach(transaction => {
    console.log(transaction.transactionCategory)
    categories.add(transaction.transactionCategory)
    console.log(categories)
  })
  return Array.from(categories)
})

const dropdownOptions = computed(() => {
  return ['Alle', ...distinctCategories.value]
})

const filteredTransactions = computed(() => {
  if (selectedOption.value === 'Alle' || !selectedOption.value) {
    return transactions.value
  } else {
    return transactions.value.filter(transaction => transaction.transactionCategory === selectedOption.value)
  }
})

const chartData = computed(() => {
  const data: { labels: string[], datasets: { data: number[], label:string ,backgroundColor: string[] }[] } = {
    labels: [],
    datasets: [{
      label: "kr",
      data: [],
      backgroundColor: [],
    }]
  }

  const categoryAmounts: { [key: string]: number } = {};

  transactions.value.forEach(transaction => {
    const { transactionCategory, amount } = transaction;
    console.log(transactionCategory)
    const category = transactionCategory
    if (category in categoryAmounts) {
      categoryAmounts[category] += amount;
    } else {
      categoryAmounts[category] = amount;
      data.labels.push(category);
      console.log(data.datasets)
      data.datasets[0].backgroundColor.push(getRandomColor());
    }
  });

  data.labels.forEach(label => {
    data.datasets[0].data.push(categoryAmounts[label]);
  });
  return data;
})

// Function to generate random color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

</script>

<template>
  <div class="economy-view">

    <div class="header">
      <h2 class="title">Dine transaksjoner!</h2>
      <img
        src="/src/components/icons/navigation/help.svg"
        alt="hjelp"
        @click="openHelpPopUp"
        class="help-icon">
      <div v-if="displayHelpPopUp" class="popup-container">
        <EconomyHelpPopUp
          @closePopUp="closeHelpPopUp"
        ></EconomyHelpPopUp>
      </div>
    </div>

    <div class="toggle-buttons">
      <button class="toggle-button" @click="displayNewChallenges" :class="{ 'active-button': !displayType}">
        <h3 class="toggle-button-title">Transaksjoner</h3>
      </button>
      <button class="toggle-button" @click="displayActiveChallenges" :class="{ 'active-button': displayType}">
        <h3 class="toggle-button-title">Diagram</h3>
      </button>
    </div>

    <div class="container">

      <div class="box" :class="{'hide': displayType }">
        <div class="custom-dropdown-container">
          <select class="custom-dropdown" v-model="selectedOption" @change="handleSelectionChange(selectedOption)">
            <option disabled value="" selected>Kategori</option>
            <option v-for="option in dropdownOptions" :key="option" :value="option">{{ option }}</option>
          </select>
        </div>

        <div class="component-container" v-if="filteredTransactions">
          <transaction-component
            v-for="transaction in filteredTransactions"
            :key="transaction.transactionId"
            :title="transaction.transactionTitle"
            :category="transaction.transactionCategory"
            :amount="transaction.amount"
            :date="transaction.date"
          ></transaction-component>
        </div>

        <div class="pagination">
          <button @click="previousPage" :disabled="currentPage === 0">Forige side</button>
          <div  v-if="pages>0" class="page-numbers">
            <button
              v-for="pageNumber in pages"
              :key="pageNumber-2"
              :class="{ chosen: pageNumber-1 === currentPage }"
              @click="goToPage(pageNumber-1)"
            >{{ pageNumber}}</button>
          </div>
          <button @click="nextPage" :disabled="currentPage === pages - 1 || pages === 0">Neste side</button>
        </div>
      </div>

      <div class="pie-box" :class="{ 'hide': !displayType}">
        <Pie :data="chartData" :options="{ maintainAspectRatio: false }"></Pie>
      </div>

    </div>

  </div>
</template>

<style scoped>

.economy-view {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 2.5%;
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

.header{
  display: flex;
  flex-direction: row;
  place-content: space-between;
  max-height: 6.5%;
}

.help-icon:hover{
  transform: scale(1.05);
  cursor: pointer;
}

.title{
  color: var(--color-heading);
}

.toggle-buttons{
  display: none;
}

.container {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  gap: 2.5%;
  padding-bottom: 2.5%;
  place-content: space-between;
}

.component-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  overflow-y: hidden;

}

.pie-box, .box{
  display: flex;
  flex-direction: column;

  border-radius: 20px;
  border: 1px solid var(--color-border);

  width:50%;
  height: 100%;

  padding: 1.5%;

  box-shadow: 0 4px 4px 0 var(--color-shadow);
  background-color: var(--color-background);

  transition: transform 0.3s ease-in-out;
}

.box{
  place-content: space-between;
  gap: 2.5%;
}

.custom-dropdown-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 8.0%;
}

.custom-dropdown {
  width: 100%;
  height: 100%;
  padding: 8px;
  border-radius: 20px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.pagination button {
  padding: 5px 10px;
  margin: 0 5px;
  border: 1px solid var(--color-border);
  border-radius: 5px;
  background-color: var(--color-pageination-button);
}

.pagination button:hover {
  transform: scale(1.05);
}

.pagination button:active{
  background-color: var(--color-pageination-button-click);
}

.pagination button:disabled {
  color:  var(--color-inactive-button-text);
  cursor: not-allowed;
  transform: none;
  background-color: var(--color-pageination-button) ;
}

.page-numbers {
  display: flex;
}

.page-numbers button {
  border: 1px solid var(--color-border);
  border-radius: 5px;
  background-color: var(--color-pageination-button);
}

.page-numbers button:hover {
  transform: scale(1.05);
}

.page-numbers button:active {
  background-color: var(--color-pageination-button-click);
}

.chosen{
  color: var(--color-heading);
  font-weight: bold;
}

@media screen and (max-width: 1000px) {

  .hide{
    display: none;
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

  .pie-box {
    width: 100%;
    height: 100%;
  }

  .box{
    width: 100%;
    height: 100%;
  }

  .container {
    flex-direction: column; /* Change flex direction for smaller screens */
    align-content: center;
    height: 100%;
  }
}

</style>
