<template>
  <div style="padding: 0; margin: 0; overflow: hidden">
    <div id="nav-parent">
      <Navbar />
    </div>
    <div class="error-page-container">
      <h1 class="error-title" v-if="error.statusCode === 404">页面未找到</h1>
      <h1 class="error-title" v-else>发生了一个内部错误</h1>
      <a class="error-nav-link" @click="handleError">回到主页</a>
    </div>
    <div style="margin: 0; padding: 0">
      <AppFooter />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: Object
})
const handleError = () => clearError({ redirect: '/' })
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
  cursor: pointer;
}
</style>
