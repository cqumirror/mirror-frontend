<template>
  <article id="md-content">
    <nuxt-content :document="article" />
  </article>
</template>

<script>
import '@/assets/css/lib/fontawesome.min.css'
import '@/assets/css/main.scss'

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

<style lang="scss">

</style>
