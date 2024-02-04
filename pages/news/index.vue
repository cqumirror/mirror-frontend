<template>
  <div style="margin: 0; padding: 0">
    <div id="news-page-title">NEWS HISTORY</div>
    <ul id="news-page-list" v-loading="loading">
      <template v-for="article in articles" :key="article._path">
        <li>
          <div>
            <!--title-->
            <div class="article-block">
              <NuxtLink :to="article._path">
                <div class="article-title">
                  {{ article.title }}
                </div>
              </NuxtLink>
              <div class="article-detail-container">
                <div class="article-time">
                  &nbsp;{{ article.date }}
                </div>
                <div class="article-author">
                  &nbsp;{{ article.author }}
                </div>
              </div>
            </div>
          </div>
        </li>
      </template>
    </ul>
    <div id="news-page-pagination">
      <el-pagination v-model:current-page="currentPage" background hide-on-single-page layout="prev, pager, next" :total="total"
        :page-size="pageSize" />
    </div>
  </div>
</template>

<script setup>
const loading = ref(false)
const currentPage = ref(1)
const pageSize = config.newsPage.pageSize
const total = ref(1000)

async function fetchContent(newPage) {
  loading.value = true
  const skipSize = (newPage - 1) * pageSize
  const { data } = await useAsyncData('news', () => queryContent('news')
    .only(['title', 'description', 'img', 'author', 'date', '_path'])
    .sort({ date: -1 })
    .skip(skipSize)
    .limit(pageSize)
    .find())
  loading.value = false
  return unref(data)
}
watch(currentPage, async newPage => {
  articles.value = await fetchContent(newPage)
})

loading.value = true
const { data: articles } = await useAsyncData('news', () => queryContent('news')
  .only(['title', 'description', 'img', 'author', 'date', '_path'])
  .sort({ date: -1 })
  .find())
total.value = articles.value.length
articles.value = articles.value.slice(0, pageSize)
loading.value = false
</script>
