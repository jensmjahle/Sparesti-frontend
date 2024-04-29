<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DicoverHelpPopUp from '@/components/popups/help/DicoverHelpPopUp.vue'

type Article = {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string | null;
};

const displayHelpPopUp = ref<boolean>(false)


const openHelpPopUp = () => {
  displayHelpPopUp.value = true;
}
const closeHelpPopUp = async () => {
  displayHelpPopUp.value = false;
}


const articles = ref<Article[]>([]);

onMounted(async () => {
  try {
    const response = await fetch('https://newsapi.org/v2/everything?q="spare"OR"sparing"OR"bank"OR"rente"&domains=e24.no&apiKey=b01f36ab840346f3b28c7c0a30cad606');
    const data = await response.json();
    articles.value = data.articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
});
</script>

<template>
  <div class="discover-view">
    <div class="header">
      <h2 id="view-title">Sparetips og økonomi fra E24!</h2>
      <img
        src="/src/components/icons/navigation/help.svg"
        alt="hjelp"
        @click="openHelpPopUp"
        class="help-icon">
      <div v-if="displayHelpPopUp" class="popup-container">
        <DicoverHelpPopUp
          @closePopUp="closeHelpPopUp"
        ></DicoverHelpPopUp>
      </div>
    </div>

    <div class="discover-items">
      <div v-for="(article, index) in articles" :key="index" class="article-item">
        <a :href="article.url" target="_blank" class="article-link">
          <div class="article-content">
            <h3 class="article-title">{{ article.title }}</h3>
            <h4 class="article-description">{{ article.description }}</h4>
            <div class="image-div">
              <img :src="article.urlToImage" alt="Article Thumbnail" class="image">
            </div>
          </div>
        </a>
      </div>
    </div>

  </div>
</template>

<style scoped>

/* Dark mode media query */
@media (prefers-color-scheme: dark) {
  .article-content {
    background-color: var(--vt-c-black-mute);
  }

  .help-icon{
    filter: invert(1);
  }
}

/* Light mode media query */
@media (prefers-color-scheme: light) {
  .article-content {
    background-color: var(--vt-c-Grey-Light);
  }
}

.header{
  display: flex;
  flex-direction: row;
  place-content: space-between;
  max-height: 6.5%;
}

.help-icon:hover{
  transform: scale(1.05);
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

#view-title {
  color: var(--color-heading);
}

.discover-view {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.discover-items {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  row-gap: 0.2%;
  column-gap: 1.5%;
}

.article-item {
  width: calc(calc(100% - 2 * 1.5%) / 3);
  height: 7.0%;
}

.article-content {
  display: flex;
  flex-direction: column;
  padding: 5.0%;
  border-radius: 20px;
  height: 100%;
  width: 100%;
  justify-content: space-between;
  align-content: start;
}

.article-title {
  font-weight: bold;
}

.image {
  width: 100%;
  border-radius: 20px;
}

.image-div {
  display: flex;
  justify-content: center;
  align-items: end;
  height: 50%;
  overflow: hidden;
  border-radius: 20px;
}


@media screen and (max-width: 900px) {
  .article-item {
    width: calc(calc(98.5%) / 2);
    height: 5.5%;
  }
}

@media screen and (max-width: 600px) {

  .article-item {
    width: 100%;
    aspect-ratio: 1/0.5;
  }
}

.article-link {
  text-decoration: none;
  color: inherit;
  transition: none;
}
</style>