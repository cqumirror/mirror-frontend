<template>
  <div style="padding: 0;margin: 0">
    <div id="nav-parent">
      <Navbar/>
    </div>
    <div>
      <NuxtPage/>
    </div>
    <div style="margin: 0;padding: 0;">
      <Footer/>
    </div>
    <ModalsContainer />
  </div>
</template>

<script>
import { ModalsContainer } from 'vue-final-modal'

export default {
  name: "default",
  components: {
    ModalsContainer
  }
}
</script>

<style lang="scss">
</style>
