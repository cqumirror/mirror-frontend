<template>
  <el-container style="padding: 0;margin: 0">
    <el-header>
      <Navbar/>
    </el-header>
    <el-main>
      <nuxt/>
    </el-main>
    <el-footer style="margin: 0;padding: 0;">
      <Footer/>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: "default"
}
</script>

<style scoped>

</style>
