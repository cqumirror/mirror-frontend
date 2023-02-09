<template>
  <div class="navbar">
      <a class="nav-brand" href="https://mirrors.cqu.edu.cn">重庆大学开源镜像站</a>
      <div class="nav-right">
        <ul class="nav">
          <li v-for="item in menu" :key="item.key">
            <NuxtLink :to="item.index">{{ item.label }}</NuxtLink>
          </li>
        </ul>
      </div>
      <button class="nav-toggle">&#8943</button>
  </div>
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
          label: "STATUS",
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
