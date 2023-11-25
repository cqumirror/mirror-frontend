<template>
  <div style="margin: 0; padding: 0">
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      class="news-page-breadcrumb"
    >
      <el-breadcrumb-item :to="{ path: '/' }" class="breadcrumb-item"
        >HOME</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/news' }" class="breadcrumb-item"
        >NEWS</el-breadcrumb-item
      >
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
      <nuxt-content :document="article" />
    </article>
  </div>
</template>

<script>
import 'assets/css/lib/fontawesome.min.css'
import 'assets/css/main.scss'
import ClipboardBtn from '@/components/ClipboardBtn.vue'

export default {
  name: 'page',
  data() {
    return {
      article: {}
    }
  },
  created() {
    console.log('loaded pages')
  },
  methods: {
    imgProxy(e) {
      const element = {
        name: e.target.alt,
        url: e.target.src,
        tag: e.target.tagName.toLowerCase()
      }
      if (element.tag === 'img') {
        console.info('img clicked')
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
          const CopyButton = ClipboardBtn
          const component = new CopyButton().$mount()
          block.appendChild(component.$el)
        }
      }
    },
    async fetchData() {
      const params = this.$router.currentRoute.params
      console.log(params, 'params')
      let article = {}
      try {
        article = await this.$content('news', params.page).fetch()
        this.article = JSON.parse(JSON.stringify(article))
        this.$nextTick(() => {
          this.addChild('nuxt-content-highlight')
        })
      } catch (e) {
        this.$nuxt.error({
          statusCode: 404,
          message: 'Page not found'
        })
      }
    }
  },
  async fetch() {
    await this.fetchData()
  }
}
</script>

<style scoped>
.breadcrumb-item:hover >>> .el-breadcrumb__inner:hover {
  color: #1ccb4c;
  cursor: pointer;
}
</style>
