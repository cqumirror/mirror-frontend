<template>
  <article id="md-content" class="wiki-page-content" @click="imgProxy">
    <nuxt-content :document="article" />
  </article>
</template>

<script>
import '@/assets/css/lib/fontawesome.min.css'
import '@/assets/css/main.scss'
import Vue from "vue";
import ClipboardBtn from "~/components/ClipboardBtn.vue";

export default {
  name: "slug",
  data() {
    return {
      article: {},
      loaded: false,
      rendered: false
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
    },
    addChild(className) {
      const blocks = document.getElementsByClassName(className)
      console.log(blocks)
      console.log(" blocks ")
      for (const block of blocks) {
        const CopyButton = Vue.extend(ClipboardBtn)
        const component = new CopyButton().$mount()
        block.appendChild(component.$el)
      }
    },
    async fetchData() {
      const params = this.$router.currentRoute.params
      const article = await this.$content('wiki',
        params.slug).fetch()
      this.article = JSON.parse(JSON.stringify(article))
      console.log("fetch ended")
    },
  },
  updated() {
    if (!this.rendered) {
      console.log("view update")
      setTimeout(() => {
        this.addChild('nuxt-content-highlight')
        this.rendered = true
      }, 100)
    }
  },
  watch: {
    '$route': {
      handler: function() {
        console.log("route changed")
        console.log(this.$router.currentRoute.params)
        this.fetchData()
        this.loaded = false
      },
      immediate: true,
    },
  }
}
</script>

<style lang="scss">
</style>
