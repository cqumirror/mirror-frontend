<template>
  <div class="error-page-container">
    <h1 class="error-title" v-if="error.statusCode === 404">页面未找到</h1>
    <h1 class="error-title" v-else>发生了一个内部错误</h1>
    <NuxtLink class="error-nav-link" to="/">回到主页</NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'error',
  layout: 'empty', // OR layout:'default'
  props: {
    error: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
.error-page-container {
  min-height: 71vh;
  overflow: hidden;
}
.error-title {
  text-align: center;
  margin-top: 25vh;
}
.error-nav-link {
  text-decoration: none;
  color: #1ccb4c;
  text-align: center;
  margin-left: 46%;
}
</style>
