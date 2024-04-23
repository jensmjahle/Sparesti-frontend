<script setup lang="ts">
import { ref, onMounted } from 'vue';

const articles = ref([]);

// Fetch articles from NewsAPI
onMounted(async () => {
  try {
    const response = await fetch('https://newsapi.org/v2/everything?q="spare"OR"sparing"OR"bank"OR"pris"&domains=e24.no&apiKey=b01f36ab840346f3b28c7c0a30cad606');
    const data = await response.json();
    articles.value = data.articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
});
</script>

<template>
  <div class="discover-view">
    <h2 id="view-title">Utforsk økonomi og sparenyheter fra E24</h2>
    <p id="view-description">Her kan du se de nyeste artiklene fra E24 anngående
      sparing og bank. Klikk på en artikkel som virker interessant.</p>
    <ul class="discover-items">
      <li v-for="(article, index) in articles" :key="index" class="article-item">
        <a :href="article.url" target="_blank" class="article-link">
          <div class="article-content">
            <div class="article-title">{{ article.title }}</div>
            <div class="article-description">{{ article.description }}</div>
            <div class="image-div">
              <img :src="article.urlToImage" alt="Article Thumbnail" class="image">
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>

/* Dark mode media query */
@media (prefers-color-scheme: dark) {
  .article-content {
    background-color: var(--vt-c-black-mute);
  }
}

/* Light mode media query */
@media (prefers-color-scheme: light) {
  .article-content {
    background-color: var(--vt-c-Grey-Light);
  }
}

#view-title {
  color: var(--color-heading);
  padding-left: 15px;
}

#view-description {
  color: var(--color-text);
  padding-left: 15px;
}

.discover-view {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 650px;
  gap: 2.5%;
}

.discover-items {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.article-item {
  width: calc(33.33% - 10px);
  padding: 10px;
  height: 400px;
  padding-top: 0;
}

.article-content {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 10px;
  overflow: hidden;
  height: 100%;
  justify-content: space-around;
  align-content: center;
  object-fit: contain;
}

.article-title {
  font-size: 130%;
  font-weight: bold;
  margin-bottom: 5px;
  line-height: 20px;
}

.article-description {
  font-size: 110%;
  font-weight: normal;
  line-height: initial;
}

.image {
  margin-top: 5px;
  max-width: 100%; /* Ensures image does not exceed container width */
  max-height: 100%; /* Ensures image does not exceed container height */
  object-fit: contain; /* Ensures the image fits within the container while maintaining aspect ratio */
  border-radius: 10px;
}

.image-div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
}

@media screen and (max-width: 1200px) {
  .article-item {
    width: calc(50% - 10px);
  }
}

@media screen and (max-width: 480px) {
  .article-item {
    width: calc(100% - 10px);
  }
}

.article-link {
  text-decoration: none;
  color: inherit; /* or any color you want for the article links */
  transition: none; /* or any transition you want for the article links */
  padding: 0; /* or any padding you want for the article links */
}
</style>