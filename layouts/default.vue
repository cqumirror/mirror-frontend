<template>
  <div style="padding: 0;margin: 0">
    <div id="nav-parent">
      <Navbar/>
    </div>
    <div>
      <nuxt/>
    </div>
    <div style="margin: 0;padding: 0;">
      <Footer/>
    </div>
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
