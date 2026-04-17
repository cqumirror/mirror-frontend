<template>
  <div style="margin: 0;padding: 0">
    <div id="news-page-title">NEWS HISTORY</div>
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
                  {{ article.date }}
                </div>
                <div class="article-author">
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

const { data: allNews, pending } = await useAsyncData('news-list', async () => {
  const docs = await queryCollection('content').all()

  return docs
    .filter(doc => {
      const path = doc.path || doc._path || ''
      return path.startsWith('/news/')
    })
    .map(doc => {
      const path = doc.path || doc._path
      return {
        ...doc,
        path,
        slug: path.split('/').pop()
      }
    })
    .sort((a, b) => {
      const aDate = new Date(a.date || 0).getTime()
      const bDate = new Date(b.date || 0).getTime()
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
