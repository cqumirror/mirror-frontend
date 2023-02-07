<template>
  <article>
    <nuxt-content :document="article" />
  </article>
</template>

<script>
export default {
  name: "slug",
  data() {
    return {
      article: {}
    }
  },
  async asyncData({ $content, params }) {
    const article = await $content('wiki', params.slug).fetch()

    return {
      article
    }
  }
}
</script>

<style scoped>

</style>
