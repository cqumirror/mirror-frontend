<template>
  <article id="md-content" class="wiki-page-content">
    <ContentRenderer v-if="article" :value="article" />
  </article>
</template>

<script setup>
const { data: article } = await useAsyncData('wiki-index-article', async () => {
  return queryCollection('content').path('/wiki').first()
})
</script>

<style scoped>
</style>
