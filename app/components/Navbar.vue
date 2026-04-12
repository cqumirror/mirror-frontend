<template>
  <div class="navbar">
    <div class="nav-container">
      <a class="nav-brand" href="/">
        {{ siteTitle }}
      </a>
      <button class="nav-toggle" @click="handleToggle">&#8943</button>
    </div>
    <div class="nav-right">
      <ul class="nav">
        <li v-for="item in menu" :key="item.key">
          <NuxtLink :to="item.index" :custom="true" v-if="item.type !== 'url'">
            <a @click="handleToggle">
              {{ item.label }}
            </a>
          </NuxtLink>
          <a @click="handleToggle" :href="item.url" target="_blank" v-else>
            {{ item.label }}
          </a>
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
      siteTitle: process.env.siteTitle,
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
          label: "NEWS",
          key: "news",
          index: "/news"
        },
        {
          label: "WIKI",
          key: "wiki",
          index: "/wiki"
        },
        {
          label: 'LANUNION',
          key: 'lanunion',
          index: "/lanunion",
          type: "url",
          url: "http://lanunion.cqu.edu.cn"
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
      mobileSize: 990 // 需要和main.scss中保持一致，否则功能出现问题
    }
  },
  methods: {

    handleToggle(e) {

      if (window.innerWidth < this.mobileSize) {
        // TODO 非常迷惑的处理方式，没想到其他的方法，我菜
        const child = document.getElementsByClassName('nav-right')
        if (this.isOpened) {
          child[0].style.height = '0'
          this.isOpened = !this.isOpened
        } else {
          child[0].style.height = this.height
          this.isOpened = !this.isOpened
        }

      }
    },
    handleResize(e) {
      const child = document.getElementsByClassName('nav-right')
      if (window.innerWidth >= this.mobileSize) {
        child[0].style.height = '0'
        this.isOpened = false
      }
    },
    computeHeight() {
      this.height = (this.menu.length * 45).toString() + 'px'
      // 增加导航项目后应当更改对应的高度，以防过窄或过宽，应当比 .nav-right 的 line-height多5px
    },
  },
  created() {
    this.computeHeight()
  },
  mounted() {
    window.onresize = () => {
      setTimeout(() => {
        // TODO 不优雅 虽然解决了窗口缩放的监听问题
        // console.log(window.innerWidth+"====> windows width")
        this.handleResize()
      }, 400)
    }
  }
}
</script>

<style scoped>

</style>
