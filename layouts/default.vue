<template>
  <div style="padding: 0;margin: 0">
    <div id="nav-parent">
      <Navbar/>
    </div>
    <el-main>
      <nuxt/>
    </el-main>
    <el-footer style="margin: 0;padding: 0;">
      <Footer/>
    </el-footer>
  </div>
</template>

<script>
import '@/assets/css/main.scss'
export default {
  name: "default"
}
</script>

<style lang="scss">


</style>
