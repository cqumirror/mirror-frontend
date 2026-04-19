<template>
  <div style="margin:0;padding:0;">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="news-page-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }" class="breadcrumb-item">HOME</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/news' }" class="breadcrumb-item">NEWS</el-breadcrumb-item>
      <el-breadcrumb-item>{{ article.title }}</el-breadcrumb-item>
    </el-breadcrumb>
    <article id="md-content" class="news-detail-content" @click="imgProxy">
      <div id="news-detail-title">{{ article?.title }}</div>
      <div class="news-detail-container">
        <div id="news-detail-date">
          <fa :icon="['fa', 'calendar-alt']"/>
          {{ article?.date }}
        </div>
        <div id="news-detail-author">
          <fa :icon="['fa', 'user']"/>
          {{ article?.author }}
        </div>
      </div>
      <ContentRenderer v-if="article" :value="article" class="nuxt-content" />
    </article>
  </div>


</template>

<script setup>
import 'assets/css/lib/fontawesome.min.css'
import 'assets/css/main.scss'
import { computed, createApp, nextTick, watch } from 'vue'
import ClipboardBtn from "@/components/ClipboardBtn.vue"

const route = useRoute()
const slug = computed(() => {
  const value = route.params.slug
  return Array.isArray(value) ? value[0] : value
})

function normalizeNewsDoc(doc) {
  const meta = doc.meta || {}
  const frontmatter = doc.frontmatter || {}

  return {
    ...doc,
    title: doc.title || meta.title || frontmatter.title || '',
    date: doc.date || meta.date || frontmatter.date || '',
    author: doc.author || meta.author || frontmatter.author || ''
  }
}

const { data: article } = await useAsyncData(`news-${slug.value}`, async () => {
  if (!slug.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
  }

  const doc = await queryCollection('content').path(`/news/${slug.value}`).first()
  if (!doc) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
  }

  return normalizeNewsDoc(doc)
})

function imgProxy(e) {
  const element = {
    name: e.target.alt,
    url: e.target.src,
    tag: e.target.tagName.toLowerCase()
  }
  if (element.tag === 'img') {
    // TODO imgViewer
    console.info('img clicked')
  }
}

function addChild(className) {
  const blocks = document.getElementsByClassName(className)
  for (const block of blocks) {
    const codeEl = block.querySelector('code')
    if (!codeEl) continue
    if (block.querySelector('.copy-btn')) continue

    const mountNode = document.createElement('div')
    block.appendChild(mountNode)
    createApp(ClipboardBtn).mount(mountNode)
  }
}

watch(article, async () => {
  await nextTick()
  addChild('nuxt-content-highlight')
})
</script>

<style scoped>
.breadcrumb-item:hover :deep(.el-breadcrumb__inner:hover) {
  color: #1ccb4c;
  cursor: pointer;
}
</style>
