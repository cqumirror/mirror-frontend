<template>
  <div style="margin: 0;padding: 0;" id="index-news-container">
    <ul>
      <li v-for="item in content" :key="item.path">
        <NuxtLink :to="item.path">
          <div :style="styleNews" id="news-list">
            {{ item.date + " " }}{{ item.title }}
          </div>
        </NuxtLink>
      </li>
    </ul>
    <div>
      <NuxtLink to="/news">
        <div id="more-news" :style="styleNews">more</div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
// import '@/assets/css/main.scss'

import cacheControl from "~/middleware/cacheControl";

export default {
  name: "SideBarNewsPreview",
  middleware: cacheControl({
    'max-age': 600,
    'stale-when-revalidate': 5
  }),
  async mounted() {
    await this.loadContent()
  },
  props: {
    styleNews: { type: String }
  },
  data() {
    return {
      content: []
    }
  },
  methods: {
    async loadContent() {
      const docs = await queryCollection('content').all()
      this.content = docs
        .map((doc) => {
          const path = doc.path || doc._path || ''
          return {
            ...doc,
            path,
            slug: path.split('/').pop()
          }
        })
        .filter((doc) => doc.path.startsWith('/news/'))
        .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
        .slice(0, 3)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
