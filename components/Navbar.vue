<template>
  <el-menu class="navbar" mode="horizontal" @select="handleSelect">
    <!--一级目录--->
    <template v-for="item in menu">
      <el-menu-item v-if="!item.childNode" :index="item.index.toString()">
        <a v-if="item.type==='url'" :href="item.url" target="_blank"> {{ item.label }}</a>
<!--        <span v-else>{{ item.label }}</span>-->
        <template v-else>
          <nuxt-link :to="item.index">{{ item.label }}</nuxt-link>
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      activeIndex: '/',
      menu: [
        {
          label: "HOME",
          key: "home_page",
          index: "/"
        },
        {
          label: "MIRROR STATUS",
          key: "mirror_status",
          index: "/status"
        },
        {
          label: "WIKI",
          key: "wiki",
          index: "/wiki"
        },
        {
          label: 'MIRRORZ.ORG',
          key: "mirrorz_org",
          index: "/mirrorz",
          type: "url",
          url: "https://mirrorz.org"
        }

      ]
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
  }
}
</script>

<style scoped>

</style>
