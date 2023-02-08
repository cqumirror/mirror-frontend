<template>
  <article>
    <nuxt-content :document="article" />
  </article>
</template>

<script>
export default {
  name: "slug",
  data() {
    return {
      article: {}
    }
  },
  async asyncData({ $content, params }) {
    const article = await $content('wiki', params.slug).fetch()

    return {
      article
    }
  }
}
</script>

<style>
.notice-note {
  border-top: 30px solid #6AB0DE;
  background: #E7F2FA;
}

.notice-note {
  padding: 15px;
  display: block;
  font-size: 1rem;
  margin-top: 0rem;
  margin-bottom: 0rem;
  color: #666;
}

.notice-warn {
  border-top: 30px solid #ffcc71;
  background: #fff2e6;
}

.notice-warn {
  padding: 15px;
  display: block;
  font-size: 1rem;
  margin-top: 0rem;
  margin-bottom: 0rem;
  color: #666;
}

.notice-info {
  border-top: 30px solid #9cd275;
  background: #edfce7;
}

.notice-info {
  padding: 15px;
  display: block;
  font-size: 1rem;
  margin-top: 0rem;
  margin-bottom: 0rem;
  color: #666;
}

.notice-error {
  border-top: 30px solid #f07373;
  background: #ffe1e1;
}

.notice-error {
  padding: 15px;
  display: block;
  font-size: 1rem;
  margin-top: 0rem;
  margin-bottom: 0rem;
  color: #666;
}
</style>
