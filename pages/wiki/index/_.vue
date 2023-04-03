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
                  :href="`#${$route.fullPath}/#${link.id}`"
                >{{ link.text }}</a
                >
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
import Vue from "vue";
import ClipboardBtn from "@/components/ClipboardBtn.vue";

export default {
  name: "slug",
  data() {
    return {
      article: {},
      loaded: false,
      rendered: false,


      currentlyActiveToc: "",
      observer: null,
      observerOptions: {
        root: this.$refs.nuxtContent,
        threshold: 0
      }

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
      console.log(this.article)


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
  },
  mounted() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute("id");
        if (entry.isIntersecting) {
          this.currentlyActiveToc = id;
        }
      });
    }, this.observerOptions);

    // Track all sections that have an `id` applied
    document
      .querySelectorAll(".nuxt-content h2[id], .nuxt-content h3[id]")
      .forEach(section => {
        this.observer.observe(section);
      });
  },
  beforeDestroy() {
    this.observer.disconnect();
  }
}
</script>

<style scoped>

</style>
