<template>
  <div class="wiki-content-container-parent">
    <h1>{{ article.title }}</h1>
    <div class="wiki-content-container">
      <article id="md-content" class="wiki-page-content" @click="imgProxy">
        <nuxt-content ref="nuxtContent" :document="article" />
      </article>
      <aside class="wiki-content-toc">
        <div class="" v-if="article.toc && article.toc.length > 0">
          <h2
            class=""
          >
            Table of contents
          </h2>
          <nav class="">
            <ul>
              <li
                class="toc-list"
                v-for="link of article.toc"
                :key="link.id"
              >
                <a
                  role="button"
                  class=""
                  :href="`/#${$route.fullPath}#${link.id}`"
                  @click.prevent="handleScrollTo(link.id)"
                >
                  {{ link.text }}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
import '@/assets/css/main.scss'
import Vue from "vue"
import ClipboardBtn from "@/components/ClipboardBtn.vue"

export default {
  name: "slug",
  data() {
    return {
      article: {},
      loaded: false,
      rendered: false,

    }
  },
  methods: {
    handleScrollTo(id) {
      console.log(id)
      this.$scrollTo('#'+id)
    },
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
    decodeUrlString(encodedString) {
      return decodeURIComponent(encodedString.replace(/\+/g, ' '));
    },
    async fetchData() {
      // debugger
      console.log(this.$route,"hash")
      const path = this.$route.params.pathMatch
      try {
        const article = await this.$content(`wiki/${path}`).fetch()
        if (Array.isArray(article)) {
          let index = article.findIndex(item => item.slug === '_index')
          const result = article[index]
          console.log(result,"result")
          this.article = JSON.parse(JSON.stringify(result))
          console.log(document.readyState)
        } else {
          this.article = JSON.parse(JSON.stringify(article))
        }
        console.log(article,'article')
      } catch (e) {
        console.error(e)
      }
    },
  },
  updated() {
    if (!this.loaded) {
      setTimeout(() => {
        this.addChild('nuxt-content-highlight')
        this.loaded = true
        if (this.$route.hash) {
          const id = this.decodeUrlString(this.$route.hash)
          this.handleScrollTo(id.replace("#",''))
        }
      }, 100)
    }
  },
  mounted() {
    console.log('mounted')
  },
  watch: {
    '$route': {
      handler: function() {
        console.log(this.$route.fullPath,"=== _.vue watch ===")
        this.fetchData()
        this.loaded = false
      },
      immediate: true,
    },
  },
}
</script>

<style scoped>

</style>
