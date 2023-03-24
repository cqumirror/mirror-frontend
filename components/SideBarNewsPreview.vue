<template>
  <div style="margin: 0;padding: 0;" id="index-news-container">
    <ul>
      <li v-for="item in content">
        <NuxtLink :to="{name: 'news-page', params: { page: item.slug }}">
          <div :style="styleNews" id="news-list">
            {{ item.title }}
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
import '@/assets/css/main.scss'

export default {
  name: "SideBarNewsPreview",
  async fetch() {
    this.content = await this.$content('news').only(['title','slug'])
      .sortBy('createdAt', 'desc').limit(3).fetch()
    console.log(this.content,"=== prefetch")
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
