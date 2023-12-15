<template>
  <div style="margin: 0; padding: 0" id="index-news-container">
    <ul>
      <li v-for="(item, index) in content" :key="index">
        <NuxtLink :to="item._path">
          <div :style="styleNews" id="news-list">
            {{ item.date + ' ' }} {{ item.title }}
          </div>
        </NuxtLink>
      </li>
    </ul>
    <div>
      <NuxtLink to="/news">
        <div id="more-news" :style="styleNews">more</div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  styleNews: {
    type: String
  }
})
const { data: content } = await useAsyncData('news', () => queryContent('news').only(['title', 'date', '_path'])
  .sort({ date: -1 })
  .limit(3)
  .find())

</script>
