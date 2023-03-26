<template>
  <article id="md-content" class="news-detail-content" @click="imgProxy">
    <div>{{ article.title }}</div>
    <div>
      <div>
        {{ article.date }}
      </div>
      <div>
        {{ article.author }}
      </div>
    </div>
    <nuxt-content :document="article" />
  </article>

</template>

<script>
import 'assets/css/lib/fontawesome.min.css'
import 'assets/css/main.scss'
import Vue from "vue";
import ClipboardBtn from "@/components/ClipboardBtn.vue";

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
    },
    addChild(className) {
      const blocks = document.getElementsByClassName(className)
      for (const block of blocks) {
        const CopyButton = Vue.extend(ClipboardBtn)
        const component = new CopyButton().$mount()
        block.appendChild(component.$el)
      }
    },
  },
  async asyncData({ $content, params }) {
    console.log("data fetch data",params)
    const article = await $content('news', params.page).fetch()
    console.log(article)
    return {
      article
    }
  },
  mounted() {
    setTimeout(() => {
      this.addChild('nuxt-content-highlight')

    }, 100)
  }
}
</script>

<style lang="scss">
</style>
