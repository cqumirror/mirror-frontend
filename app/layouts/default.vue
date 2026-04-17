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

<script setup>
import { ModalsContainer } from 'vue-final-modal'

import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>

<style lang="scss">
</style>
