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

    const article = await $content('wiki', params.slug).fetch()
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
