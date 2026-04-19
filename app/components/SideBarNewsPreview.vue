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
        <fa :icon="['fa', 'angle-right']"/>
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
    normalizeNewsDoc(doc) {
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
    },
    toTimestamp(dateValue) {
      const ts = Date.parse(String(dateValue || ''))
      return Number.isNaN(ts) ? 0 : ts
    },
    async loadContent() {
      const docs = await queryCollection('content').all()
      this.content = docs
        .map(this.normalizeNewsDoc)
        .filter((doc) => doc.path.startsWith('/news/'))
        .sort((a, b) => this.toTimestamp(b.date) - this.toTimestamp(a.date))
        .slice(0, 3)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
