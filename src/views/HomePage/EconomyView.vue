<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Pie } from 'vue-chartjs'
import { ArcElement, Chart as ChartJS, Colors, Legend, Tooltip } from 'chart.js'
import TransactionComponent from '@/components/economy/TransactionComponent.vue'
import { getTransactions } from '@/utils/TransactionUtils'
import { useTokenStore } from '@/stores/token'
import EconomyHelpPopUp from '@/components/popups/help/EconomyHelpPopUp.vue'
import {useToast} from "vue-toast-notification";

ChartJS.register(ArcElement,Tooltip,Legend, Colors)

interface Transaction {
  "transactionCategory": string,
  "transactionTitle": string,
  "amount": number,
  "transactionId": number,
  "time": string,
}

const token:string = useTokenStore().jwtToken;
const toast = useToast();

const selectedOption = ref<string | null>('')

const displayHelpPopUp = ref<boolean>(false)

const pages = ref<number>(0);
const currentPage = ref<number>(0);
const transactionsPerPage = 5; // Assuming 5 transactions per page

/**
 * Decrements the current page number by one to navigate to the previous page.
 * @returns {void} This function does not return a value.
 */
const previousPage = () => {
  currentPage.value --
}

/**
 * Sets the current page number to the specified page number to navigate directly to that page.
 * @param {number} pageNumber - The page number to navigate to.
 * @returns {void} This function does not return a value.
 */
const goToPage = (pageNumber:number) => {
  currentPage.value = pageNumber;
}

/**
 * Increments the current page number by one to navigate to the next page.
 * @returns {void} This function does not return a value.
 */
const nextPage = () =>{
  currentPage.value ++;
}

const transactions = ref<Transaction[]>([])

/**
 * Asynchronously fetches user transactions and updates the `transactions` reactive value.
 * Logs the fetched transactions to the console.
 * Displays an error toast if fetching transactions fails.
 * @returns {Promise<void>} A promise that resolves after transactions are fetched and updated.
 */
const fetchTransactions = async() =>  {
  try{
    const response = await getTransactions(token)
    transactions.value = response
    console.log(transactions.value)
  } catch (e) {
    console.log(e)
    toast.error('Vi klarte ikke hente dine transaksjoner! Venligst prøv på nytt.')
  }
}

/**
 * Lifecycle hook that runs when the component is mounted.
 * Fetches transactions and handles selection change after the component is mounted.
 * @returns {Promise<void>} A promise that resolves after transactions are fetched and selection change is handled.
 */
onMounted(async ()  => {
  await fetchTransactions();
  handleSelectionChange('Alle');
})

const displayType = ref<boolean>(false)

/**
 * Sets the display type to show new challenges and logs the updated value to the console.
 * @returns {void} This function does not return a value.
 */
const displayNewChallenges = () => {
  displayType.value = false;
  console.log(displayType.value)
}

/**
 * Sets the display type to show active challenges and logs the updated value to the console.
 * @returns {void} This function does not return a value.
 */
const displayActiveChallenges = () => {
  displayType.value = true;
  console.log(displayType.value)
}

/**
 * Opens the help pop-up by setting its display state to true.
 * @returns {void} This function does not return a value.
 */
const openHelpPopUp = () => {
  displayHelpPopUp.value = true;
}

/**
 * Closes the help pop-up by setting its display state to false and logs the updated value to the console.
 * @returns {void} This function does not return a value.
 */
const closeHelpPopUp = () => {
  displayHelpPopUp.value = false;
  console.log(displayHelpPopUp);
}

/**
 * Handles the selection change event by updating the selected option, resetting the current page to 0,
 * and calculating the number of pages.
 * @param {string | null} value - The value of the selected option.
 * @returns {void} This function does not return a value.
 */
const handleSelectionChange = (value: string | null) => {
  selectedOption.value = value;
  currentPage.value = 0;
  calculateNumberOfPages();
}

/**
 * Computed property that returns an array of distinct transaction categories based on the transactions list.
 * Uses a Set to collect unique transaction categories from the `transactions` list.
 * @returns {string[]} An array containing distinct transaction categories.
 */
const distinctCategories = computed(() => {
  const categories = new Set<string>()
  transactions.value.forEach(transaction => {
    console.log(transaction.transactionCategory)
    categories.add(transaction.transactionCategory)
    console.log(categories)
  })
  return Array.from(categories)
})

/**
 * Computed property that returns dropdown options for filtering transactions by category.
 * Includes 'Alle' (All) option followed by distinct transaction categories.
 * @returns {string[]} An array of dropdown options for transaction category filtering.
 */
const dropdownOptions = computed(() => {
  return ['Alle', ...distinctCategories.value]
})

/**
 * Computed property that returns filtered transactions based on the selected option (category).
 * Filters transactions by category matching the `selectedOption` value.
 * If 'Alle' (All) or no option is selected, returns all transactions.
 * @returns {Transaction[]} An array of filtered transactions based on the selected category option.
 */
const filteredTransactions = computed(() => {
  if (selectedOption.value === 'Alle' || !selectedOption.value) {
    return transactions.value
  } else {
    return transactions.value.filter(transaction => transaction.transactionCategory === selectedOption.value)
  }
})

/**
 * Computed property that returns a slice of filtered transactions to display on the current page.
 * Retrieves a subset of transactions based on the current page and number of transactions per page.
 * @returns {Transaction[]} An array of transactions to display on the current page.
 */
const transactionsToDisplay = computed(() => {
  return filteredTransactions.value.slice(currentPage.value * transactionsPerPage, (currentPage.value * transactionsPerPage) + transactionsPerPage);
});

/**
 * Calculates the number of pages based on the filtered transactions and updates the `pages` reactive value.
 * Sets the `pages` value to the ceiling of the total number of filtered transactions divided by transactions per page.
 * @returns {void} This function does not return a value.
 */
const calculateNumberOfPages = () => {
  pages.value = Math.ceil(filteredTransactions.value.length / transactionsPerPage);
}

/**
 * Computed property that generates chart data based on transaction categories and amounts.
 * Constructs data for a chart with labels (categories) and corresponding dataset (amounts).
 * @returns {ChartData} Chart data object containing labels and datasets for visualization.
 */
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
  const usedColors = new Set();

  transactions.value.forEach(transaction => {
    const { transactionCategory, amount } = transaction;
    console.log(transactionCategory)
    const category = transactionCategory
    if (category in categoryAmounts) {
      categoryAmounts[category] += amount;
    } else {
      categoryAmounts[category] = amount;
      data.labels.push(category);
      let color = getRandomColor();
      // Ensure the color hasn't been used yet
      while (usedColors.has(color)) {
        color = getRandomColor();
      }
      usedColors.add(color);
      data.datasets[0].backgroundColor.push(color);
    }
  });

  data.labels.forEach(label => {
    data.datasets[0].data.push(categoryAmounts[label]);
  });
  return data;
})

/**
 * Generates a random color by selecting a CSS custom property (variable) value from the document's root element.
 * Randomly selects from a predefined list of color variables and retrieves the corresponding color value.
 * @returns {string} A randomly generated color in CSS format (e.g., hex, rgba, etc.).
 */
const getRandomColor = () => {
  const computedStyle = getComputedStyle(document.documentElement);

  const colorVariables = [
    '--color-pieChartBlue',
    '--color-pieChartRed',
    '--color-pieChartGreen',
    '--color-pieChartOrange',
    '--color-pieChartPurple',
    '--color-pieChartGrey'
  ];

  const randomIndex = Math.floor(Math.random() * colorVariables.length);

  const randomColorVariable = colorVariables[randomIndex];
  const randomColor = computedStyle.getPropertyValue(randomColorVariable);
  console.log('color')
  console.log(randomColorVariable)

  return randomColor;
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
          tabindex="0"
          @keyup.enter="openHelpPopUp"
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
              class="transaction"
              v-for="transaction in transactionsToDisplay"
              :key="transaction.transactionId"
              :title="transaction.transactionTitle"
              :category="transaction.transactionCategory"
              :amount="transaction.amount"
              :date="transaction.time"
          ></transaction-component>
        </div>

        <div class="pagination">
          <button @click="previousPage" :disabled="currentPage === 0">Forige side</button>
          <div  v-if="pages>1" class="page-numbers">
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
  height: 93.5%;
  width: 100%;
  gap: 2.5%;
  place-content: space-between;
}

.component-container {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  width: 100%;
  height: 100%;
}

.transaction{
  height: calc(100%/5);
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

.custom-dropdown:hover{
  transform: scale(1.02);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 5.0%;
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

  .economy-view{
    height: 120%;
  }

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

@media (prefers-color-scheme: dark) {
  .help-icon{
    filter: invert(1);
  }
}

</style>
