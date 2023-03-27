<template>
  <div style="margin:0;padding:0;">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="news-page-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">HOME</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/news/' }">NEWS</el-breadcrumb-item>
      <el-breadcrumb-item>{{ article.title }}</el-breadcrumb-item>
    </el-breadcrumb>
    <article id="md-content" class="news-detail-content" @click="imgProxy">
      <div id="news-detail-title">{{ article.title }}</div>
      <div class="news-detail-container">
        <div id="news-detail-date">
          {{ article.date }}
        </div>
        <div id="news-detail-author">
          {{ article.author }}
        </div>
      </div>
      <nuxt-content :document="article"/>
    </article>
  </div>


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
  async fetch() {
    const params = this.$router.currentRoute.params
    // console.log("data fetch data", this.$router.currentRoute)
    const article = await this.$content('news', params.page).fetch()
    // console.log(article)
    this.article = JSON.parse(JSON.stringify(article))
    this.addChild('nuxt-content-highlight')

  },

  // mounted() {
  //   setTimeout(() => {
  //     this.addChild('nuxt-content-highlight')
  //   }, 100)
  // }
}
</script>

<style lang="scss">
</style>
