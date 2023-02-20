<template>
  <article id="md-content" @click="imgProxy">
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
  methods: {
    imgProxy(e) {
      const element = {
        name: e.target.alt,
        url: e.target.src,
        tag: e.target.tagName.toLowerCase()
      }
      if (element.tag === 'img') {
        console.info("img clicked")
        // TODO imgViewer
      }
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
