<template>
  <div style="margin: 0;padding: 0">
    <div id="news-page-title">NEWS HISTORY</div>
    <ul id="news-page-list" v-loading="loading">
      <template v-for="article in articles" :key="article.slug">
        <li>
          <div>
            <!--title-->
            <div class="article-block">
              <NuxtLink :to="{name: 'news-page', params: { page: article.slug }}">
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

<script>
// import '@/assets/css/main.scss'

import cacheControl from "~/middleware/cacheControl";

export default {
  name: "news",
  middleware: cacheControl({
    'max-age': 600,
    'stale-when-revalidate': 5
  }),
  data() {
    return {
      articles: [],
      currentPage: 0,
      pageSize: process.env.newsPage.pageSize,
      total: 1000,
      loading: false,
    }
  },
  methods: {
    formatDate(date) {
      const y = this.formatByIntl(date, {year: 'numeric'})
      const m = this.formatByIntl(date, {month: '2-digit'})
      const d = this.formatByIntl(date, {day: '2-digit'})
      return (y + "-" + m + "-" + d) // TODO: use navigator to get locale
      // return date
    },
    formatByIntl(date, option) {
      const dateStr = new Date(date)
      return new Intl.DateTimeFormat('en', option).format(dateStr)
    },
    async handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      const articles = await this.queryContent(this.currentPage)
      this.articles = JSON.parse(JSON.stringify(articles))

    },
    async queryContent(currentPage) {
      this.loadingCheck()
      const pageSize = this.pageSize
      const skipSize = (currentPage - 1) * pageSize
      const articles = await this.$content('news')
        .only(['title', 'description', 'img', 'slug', 'author', 'date'])
        .sortBy('date', 'desc').skip(skipSize)
        .limit(pageSize).fetch()
      this.loadingCheck()
      return articles
    },
    loadingCheck() {
      this.loading = !this.loading
    }
  },
  async fetch() {
    this.loadingCheck()
    const articles = await this.$content('news')
      .only(['title', 'description', 'img', 'slug', 'author', 'date'])
      .sortBy('date', 'desc')
      .fetch()
    this.total = articles.length
    this.articles = articles.slice(0, this.pageSize)
    console.log(articles)

    // initialize with start pageSize
    this.currentPage = 1
    this.loadingCheck()
  }
}
</script>

<style scoped>

</style>
