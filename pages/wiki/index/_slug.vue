<template>
  <article id="md-content" class="wiki-page-content" @click="imgProxy">
    <nuxt-content :document="article" />
  </article>
</template>

<script>
// import '@/assets/css/lib/fontawesome.min.css'
import '@/assets/css/main.scss'
import Vue from "vue";
import ClipboardBtn from "@/components/ClipboardBtn.vue";

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
      for (const block of blocks) {
        const codeEl = block.querySelector('code')
        if (!codeEl) continue
        const copyBtn = block.querySelector('.copy-btn')
        if (!copyBtn) {
          const CopyButton = Vue.extend(ClipboardBtn)
          const component = new CopyButton().$mount()
          block.appendChild(component.$el)
        }

      }
    },
    async fetchData() {
      const params = this.$router.currentRoute.params
      const article = await this.$content('wiki',
        params.slug).fetch()
      this.article = JSON.parse(JSON.stringify(article))

    },
  },
  updated() {
    if (!this.loaded) {
      setTimeout(() => {
        this.addChild('nuxt-content-highlight')
        this.loaded = true
      }, 100)
    }
  },
  watch: {
    '$route': {
      handler: function() {
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
