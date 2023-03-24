<template>
  <div style="margin: 0;padding: 0">
    <h1>Wiki Content</h1>
    <ul>
      <template v-for="article in articles">
        <li :key="article.slug">
          <NuxtLink :to="{name: 'news-page', params: { page: article.slug }}">
            <div>
              <h2>
                {{ article.title }}
              </h2>
            </div>
          </NuxtLink>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: "news",
  data() {
    return {
      articles: [],
    }
  },
  async asyncData({ $content, params }) {
    const articles = await $content('news')
      .only(['title', 'description', 'img', 'slug', 'author'])
      .sortBy('createdAt', 'desc')
      .fetch()
    return {
      articles
    }
  }
}
</script>

<style scoped>

</style>
