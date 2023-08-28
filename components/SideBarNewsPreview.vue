<template>
  <div style="margin: 0;padding: 0;" id="index-news-container">
    <ul>
      <li v-for="item in content">
        <NuxtLink :to="{name: 'news-page', params: { page: item.slug }}">
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
  async fetch() {
    this.content = await this.$content('news').only(['title','slug','date'])
      .sortBy('date', 'desc').limit(3).fetch()
  },
  props: {
    styleNews: { type: String }
  },
  data() {
    return {
      content: []
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
