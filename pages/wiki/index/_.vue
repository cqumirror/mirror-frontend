<template>
  <div class="wiki-content-container-parent">
    <h1>{{ article.title }}</h1>
    <div class="wiki-content-container">
      <article id="md-content" class="wiki-page-content" @click="imgProxy">
        <nuxt-content ref="nuxtContent" :document="article" />
      </article>
      <aside class="wiki-content-toc" v-if="article.toc && article.toc.length > 0">
        <div class="wiki-toc" >
          <h2 class="wiki-toc-title">目录</h2>
          <nav class="wiki-toc-nav">
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
// import '@/assets/css/main.scss'
import Vue from "vue"
import ClipboardBtn from "@/components/ClipboardBtn.vue"

import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

export default {
  name: "slug",
  data() {
    return {
      article: {},
      loaded: false,
      rendered: false,

      gallery: []
    }
  },
  methods: {
    handleScrollTo(id) {
      this.$scrollTo('#'+id)
    },
    imgProxy(e) {
      const element = {
        name: e.target.alt,
        url: e.target.src,
        tag: e.target.tagName.toLowerCase()
      }
      if (element.tag === 'img') {
        Fancybox.show([{src:element.url}],{})
      }
    },
    addChild(className) {
      // 这段肯定是有bug的。会向shortcode block 插入复制按钮，未知原因，原生vue无法复现，可能是框架bug
      const blocks = document.getElementsByClassName(className)
      for (const block of blocks) {
        const codeEl = block.querySelector('.shiki')
        if (codeEl){
          debugger
          const copyBtn = block.querySelector('.copy-btn')
          if (!copyBtn) {
            const CopyButton = Vue.extend(ClipboardBtn)
            const component = new CopyButton().$mount()
            block.appendChild(component.$el)
          }
        }
      }
    },
    decodeUrlString(encodedString) {
      return decodeURIComponent(encodedString.replace(/\+/g, ' '));
    },
    async fetchData() {
      const path = this.$route.params.pathMatch
      try {
        const article = await this.$content(`wiki/${path}`).fetch()
        if (Array.isArray(article)) {
          let index = article.findIndex(item => item.slug === '_index')
          const result = article[index]
          this.article = JSON.parse(JSON.stringify(result))
        } else {
          this.article = JSON.parse(JSON.stringify(article))
        }
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
      }, 450)

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
  },
}
</script>

<style scoped>

</style>
