<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Pie } from 'vue-chartjs'
import { ArcElement, Chart as ChartJS, Colors, Legend, Tooltip } from 'chart.js'
import TransactionComponent from '@/components/economy/TransactionComponent.vue'
import ToggleButton from '@/components/economy/ToggleButton.vue'
import { getTransactions } from '@/utils/TransactionUtils'
import { useTokenStore } from '@/stores/token'

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

//let page = 0;
let pages = 0;
let currentPage = 0;

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



const chartVisible = ref(false)

const toggleChart = (value: boolean) => {
  chartVisible.value = value
  console.log(chartVisible.value)
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
    console.log(transactions.value)
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

//
// const transactions1 = ref([
//   { id: 1,
//     title: 'Rema 1000',
//     date: '2022-05-10',
//     amount: 100,
//     category: 'Dagligvare'
//   },
//   { id: 2,
//     title: 'Trondheim Kino',
//     date: '2022-05-15',
//     amount: 500,
//     category: 'Underholdning'
//   },
//   { id: 3,
//     title: 'SIT',
//     date: '2022-05-15',
//     amount: 4450,
//     category: 'regninger'
//   },
//   { id: 4,
//     title: 'Superhero Burger',
//     date: '2022-05-15',
//     amount: 1500,
//     category: 'Mat & Restaurant'
//   },
//   { id: 6,
//     title: 'Kiwi',
//     date: '2022-05-20',
//     amount: 100,
//     category: 'Dagligvare'
//   },
// ])
</script>

<template>
  <div class="economy-ui">

  <h2>Ditt forbruk</h2>

  <div class="container">
    <div class="toggle-button-container">
      <ToggleButton @toggle-chart="toggleChart" />
      <span> Vis graf </span>
    </div>
    <div class="box" :class="{ 'mobile-hide': chartVisible }">
      <div class="custom-dropdown-container">
        <select class="custom-dropdown" v-model="selectedOption" @change="handleSelectionChange(selectedOption)">
          <option disabled value="" selected>Velg kategori</option>
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
        <button :disabled="currentPage === 0">Previous</button>
        <div  v-if="pages>0" class="page-numbers">
          <button
            v-for="pageNumber in pages"
            :key="pageNumber-2"
            :class="{ active: pageNumber-1 === currentPage }"
          >{{ pageNumber}}</button>
        </div>
        <button :disabled="currentPage === pages - 1 || pages === 0">Next</button>
      </div>
    </div>
      <div id="pie-box" :class="{ 'mobile-show': chartVisible }">
          <Pie :data="chartData" :options="{ maintainAspectRatio: false }"></Pie>
      </div>
    </div>
  </div>
</template>




<style scoped>


.economy-ui {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

h2 {
  color: #6AB40A;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding-bottom: 1%;
}

.custom-dropdown-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container {
  display: flex;
  height: 100%;
}

.component-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 1.25%;
}
#pie-box,
.box {
  border-radius: 20px;
  border: 1px solid var(--color-border);
  width:100%;
  max-width: 600px; /* Limit maximum width */
  min-height: 510px;
  height: auto;
  box-shadow: 0 4px 4px 0 var(--color-shadow);
  transition: transform 0.3s ease-in-out;
  background-color: var(--color-background);
  margin-right: 1%;

}



.custom-dropdown {
  width: 80%;
  height: 7%;
  padding: 8px;
  margin-top: 2%;
  margin-bottom: 2%;
  border-radius: 20px;
}



.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button {
  padding: 5px 10px;
  margin: 0 5px;
  border: 1px var(--color-border);
  border-radius: 3px;
  background-color: transparent;
  cursor: pointer;
}

.pagination button:hover {
  background-color: #f0f0f0;
}

.pagination button:disabled {
  color: #ccc;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
}

.page-numbers button {
  padding: 5px 10px;
  margin: 0 2px;
  border: 1px solid #ccc;
  border-radius: 3px;
  background-color: transparent;
  cursor: pointer;
}

.page-numbers button.active {
  background-color: #5E5CE5;
  color: white;
}

.page-numbers button:hover {
  background-color: #f0f0f0;
}

.page-numbers button:disabled {
  color: #ccc;
  cursor: not-allowed;
}

.toggle-button-container{
  display: none;
}


@media screen and (max-width: 600px) {
  .box {
    width: 100%;
    min-height: 510px;
    margin:10px /* Adjust margin for smaller screens */
  }

  .container {
    flex-direction: column; /* Change flex direction for smaller screens */
    align-content: center;
    height: 100%;
  }

  h2 {
    font-size: 3em; /* Adjust font size for smaller screens */
  }
  span {
    font-size: 1.9em;
  }
  .toggle-button-container {
    display:block;
    margin-left: 6%;
    justify-content: center;
  }

  .custom-dropdown{
    font-size: 1.8em;
  }


  #pie-box {
    display: none; /* Show the graph container on mobile by default */
    height: 650px;
  }

  /* Show the graph container only when chartVisible is true */
  .mobile-show {
    display: block !important;
  }

  /* Hide the transactions box when chartVisible is true */
  .box.mobile-hide {
    display: none;
  }

}
@media (prefers-color-scheme: dark){
  h2{
    color: var(--vt-c-kellyGreen-Light);
  }
}
</style>
