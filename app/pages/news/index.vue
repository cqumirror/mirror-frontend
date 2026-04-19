<template>
  <div style="margin: 0;padding: 0">
    <div id="news-page-title">
      <fa :icon="['fa', 'newspaper']"/>
      NEWS HISTORY
    </div>

    <ul id="news-page-list" v-loading="loading">
      <template v-for="article in pagedArticles" :key="article.path">
        <li>
          <div>
            <!--title-->
            <div class="article-block">
              <NuxtLink :to="article.path">
                <div class="article-title">
                  {{ article.title }}
                </div>
              </NuxtLink>
              <div class="article-detail-container">
                <div class="article-time">
                  <fa :icon="['fa', 'calendar-alt']"/>
                  {{ article.date }}
                </div>
                <div class="article-author">
                  <fa :icon="['fa', 'user']"/>
                  {{ article.author }}
                </div>
              </div>
            </div>
          </div>
        </li>
      </template>
    </ul>
    <div id="news-page-pagination">
      <el-pagination
        background
        hide-on-single-page
        layout="prev, pager, next"
        :total="total"
        :current-page="currentPage"
        :page-size="pageSize"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import cacheControl from '~/middleware/cacheControl'

definePageMeta({
  middleware: cacheControl({
    'max-age': 600,
    'stale-when-revalidate': 5
  })
})

const currentPage = ref(1)
const pageSize = useRuntimeConfig().public.newsPage.pageSize

function normalizeNewsDoc(doc) {
  const path = doc.path || doc._path || ''
  const meta = doc.meta || {}
  const frontmatter = doc.frontmatter || {}

  return {
    ...doc,
    path,
    slug: path.split('/').pop(),
    title: doc.title || meta.title || frontmatter.title || '',
    date: doc.date || meta.date || frontmatter.date || '',
    author: doc.author || meta.author || frontmatter.author || ''
  }
}

function toTimestamp(dateValue) {
  const ts = Date.parse(String(dateValue || ''))
  return Number.isNaN(ts) ? 0 : ts
}

const { data: allNews, pending } = await useAsyncData('news-list', async () => {
  const docs = await queryCollection('content').all()
  return docs
    .filter(doc => {
      const path = doc.path || doc._path || ''
      return path.startsWith('/news/')
    })
    .map(normalizeNewsDoc)
    .sort((a, b) => {
      const aDate = toTimestamp(a.date)
      const bDate = toTimestamp(b.date)
      return bDate - aDate
    })
})

const loading = computed(() => pending.value)
const total = computed(() => allNews.value?.length || 0)
const pagedArticles = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return (allNews.value || []).slice(start, end)
})

function handleCurrentChange(page) {
  currentPage.value = page
}
</script>

<style scoped>

</style>
