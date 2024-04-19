<script setup lang="ts">
import { ref } from 'vue'

const selectedOption = ref<string | null>(null)
const dropdownOptions = [
  'Option 1',
  'Option 2',
  'Option 3'
]

const handleSelectionChange = (value: string) => {
  selectedOption.value = value
}
</script>

<template>
  <div class="economy-ui">

  <h2>Dine forbruk</h2>
  <div class="container">
    <div class="box">
      <div class="custom-dropdown-container">
        <select class="custom-dropdown" v-model="selectedOption" @change="handleSelectionChange($event.target.value)">
          <option disabled value="">Filtrer dine transaksjoner</option>
          <option v-for="option in dropdownOptions" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>
      <div class="component-container">
        <div class="component">
          <div class="component-left">
            <div class="component-title">
              Rema 1000
            </div>
          </div>
          <div class="component-right">
            <div class="component-right-field">
              <span> Date: 10.05.2012</span>
            </div>
            <div class="component-right-field">
              <span>
                100 kr
              </span>
            </div>
            <div class="component-right-field">
              <span>
                Kategori: Mat
              </span>
            </div>


          </div>
        </div>
        <div class="component">

        </div>
        <div class="component">

        </div>
        <div class="component">

        </div>
        <div class="component">

        </div>
      </div>

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
  align-items: center;
}

.container {
  display: flex;
  height: 100vh;
}
.component-left{
  width:50%;
  height:100%;
}
.component-right {
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
}
.component-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.box {
  border-radius: 20px;
  border: 1px solid #000;
  width:80%;
  max-width: 600px; /* Limit maximum width */
  min-height: 250px;
  height: 75%;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
}

.component {
  border-radius: 20px;
  border: 1px solid #000;
  /*box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25); */
  width: 80%;
  height: 10%;
  margin-left: 5%;
  margin-bottom: 2.5%;
  display:flex;
}

.custom-dropdown {
  width: 80%;
  height: 7%;
  padding: 8px;
  margin-top: 2%;
  margin-bottom: 5%;
  border-radius: 20px;
}

.component-title {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 20px;
  font-size:1.5em

}

.component-right-field {
  display: flex;
  height: 100%;
  width: 95%;
  justify-content: right;
  font-size: 1em;
}


@media screen and (max-width: 600px) {
  .box {
    width: 100%;
    margin: 10px; /* Adjust margin for smaller screens */
  }

  .container {
    flex-direction: row; /* Change flex direction for smaller screens */
  }

  h2 {
    font-size: 1.5em; /* Adjust font size for smaller screens */
  }

  .component-title {
    font-size: 1.2em; /* Adjust font size for smaller screens */
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    padding-left: 20px;
  }

  .component-right-field {
    display: flex;
    height: 100%;
    width: 95%;
    justify-content: right;
    font-size: 0.8em; /* Adjust font size for smaller screens */
  }
}

</style>
