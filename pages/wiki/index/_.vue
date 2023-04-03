<template>
  <div>
    <h1>{{ article.title }}</h1>
    <!-- other page content -->
    <article id="md-content" class="wiki-page-content" @click="imgProxy">
      <nuxt-content :document="article" />
    </article>
  </div>
</template>

<script>
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
      // console.log(this.$route)
      const params = this.$route.fullPath + '/_index'
      try {
        const article = await this.$content(params).fetch()
        console.log(article)
        this.article = JSON.parse(JSON.stringify(article))
      }
      catch (e) {
        let paramOther = this.$route.fullPath
        try {
          const article = await this.$content(paramOther).fetch()
          console.log(article)
          this.article = JSON.parse(JSON.stringify(article))
        } catch (ee) {
          this.$nuxt.error({
            statusCode: 404,
            message: 'Page not found'
          })
        }
      }


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

<style scoped>

</style>
