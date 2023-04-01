<template>
  <div style="padding: 0;margin: 0; overflow: hidden;">
    <div id="nav-parent">
      <Navbar/>
    </div>
    <div>
      <Nuxt />
    </div>
    <div style="margin: 0;padding: 0;">
      <Footer/>
    </div>
  </div>
</template>
<script>
import '@/assets/css/main.scss'

export default {
  name: "empty",

}
</script>
