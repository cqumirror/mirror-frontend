<template>
  <div style="margin: 0; padding: 0">
    <el-breadcrumb class="news-page-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }" class="breadcrumb-item">HOME</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/news' }" class="breadcrumb-item">NEWS</el-breadcrumb-item>
      <el-breadcrumb-item>{{ article.title }}</el-breadcrumb-item>
    </el-breadcrumb>
    <article id="md-content" class="news-detail-content" @click="imgProxy">
      <div id="news-detail-title">{{ article.title }}</div>
      <div class="news-detail-container">
        <div id="news-detail-date">
          &nbsp;{{ article.date }}
        </div>
        <div id="news-detail-author">
          &nbsp;{{ article.author }}
        </div>
      </div>
      <ContentRenderer :value="article" />
    </article>
  </div>
</template>

<script setup>
import 'assets/css/lib/fontawesome.min.css'
import 'assets/css/main.scss'
import ClipboardBtn from '@/components/ClipboardBtn.vue'

function imgProxy(e) {
  const element = {
    name: e.target.alt,
    url: e.target.src,
    tag: e.target.tagName.toLowerCase()
  }
  if (element.tag === 'img') {
    console.info('img clicked')
    // TODO imgViewer
  }
}
function addChild(className) {
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
}

const route = useRoute()
let article
const { params } = route
try {
  const { data } = await useAsyncData('news/' + params.page, () => queryContent('news', params.page).findOne())
  article = data
  nextTick(() => {
    addChild('nuxt-content-highlight')
  })
} catch (e) {
  showError({
    statusCode: 404,
    message: 'Page not found'
  })
}
</script>

<style scoped>
.breadcrumb-item:hover:deep(.el-breadcrumb__inner:hover) {
  color: #1ccb4c;
  cursor: pointer;
}
</style>
