<template>
  <div class="navbar">
    <div class="nav-container">
      <a class="nav-brand" href="https://mirrors.cqu.edu.cn">
        11111
      </a>
      <button class="nav-toggle" @click="handleToggle">&#8943</button>
    </div>
    <div class="nav-right">
      <ul class="nav">
        <li v-for="item in menu" :key="item.key">
          <NuxtLink :to="item.index" :custom="true">
            <a @click="handleToggle">
              {{ item.label }}
            </a>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
export default {
  name: "Navbar",
  data() {
    return {
      isOpened: false,
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

      ],
      height: '',
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    handleToggle(e) {
      // TODO 非常迷惑的处理方式，没想到其他的方法，我菜
      const child = document.getElementsByClassName('nav-right')
      if (this.isOpened) {
        child[0].style.height = '0'
        this.isOpened = !this.isOpened
      } else {
        child[0].style.height = this.height
        this.isOpened = !this.isOpened
      }

    },
    computeHeight() {
      this.height = (this.menu.length * 57).toString() + 'px'
    }
  },
  created() {
    this.computeHeight()
  }
}
</script>

<style scoped>

</style>
