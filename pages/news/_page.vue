<template>
  <article id="md1-content" @click="imgProxy">
    <nuxt-content :document="article" />
  </article>

</template>

<script>
import 'assets/css/lib/fontawesome.min.css'
import 'assets/css/main.scss'

export default {
  name: "page",
  data() {
    return {
      article: {}
    }
  },
  created() {
    console.log("loaded pages")
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
    console.log("data fetch data",params)
    const article = await $content('news', params.page).fetch()
    console.log(article)
    return {
      article
    }
  }
}
</script>

<style lang="scss">
</style>
