<template>
  <div style="display: flex;" class="right-bar">
    <!--news-->
    <div>
      <h4><fa :icon="['fas','newspaper']" style="margin-right: 1vw"/>新闻公告</h4>
      <SideBarNewsPreview :style-news="style"/>
    </div>

    <!--url-->
    <div>
      <h4><fa :icon="['fas','paperclip']" style="margin-right: 1vw"/>域名选择</h4>
      <ul>
        <li v-for="item in exportUrls">
          <a :href="item.url" target="_blank" :style="style">
            {{ item.url }}
          </a> {{ item.desc }}
        </li>
      </ul>
    </div>

    <!--download link-->
    <div>
      <h4><fa :icon="['far','file-archive']" style="margin-right: 1vw"/>下载链接</h4>
      <div style="display: flex;flex-direction: column; margin-left: 2vw;">
        <span>常用发行版 iso 和应用工具安装包下载</span>
        <button id="download-pkg" @click="showDialog = true">获取下载链接</button>
      </div>
    </div>

    <!--contact-->
    <div>
      <h4><fa :icon="['far','paper-plane']" style="margin-right: 1vw"/>联系我们</h4>
      <ul>
        <li v-for="item in contactUrls">
          <a :href="item.url" target="_blank" :style="style">
            {{ item.url }}
          </a>
        </li>
      </ul>
    </div>

    <!--links-->
    <div v-if="siteLinks.enabled">
      <h4><fa :icon="['fas','inbox']" style="margin-right: 1vw"/>相关链接</h4>
      <ul>
        <li v-for="item in siteLinks.links">
          <a :href="item.url" :style="style">
            {{ item.desc }}
          </a>
        </li>
      </ul>
    </div>
    <!-- Download dialog -->
    <DownloadDialog v-if="showDialog" @close="showDialog = false">
      <div class="download-dialog-header" slot="header">
        <div class="download-dialog-header-title">
          获取安装镜像
        </div>
      </div>
      <div class="download-dialog-body" slot="body">
        <div class="distro-dialog-container">
          <!--category tab-->
          <ul class="category-group">
            <template v-for="item in isoCategory">
              <li>
                <div @click="handleGroupClick" :class="item.key === 0 ? 'category-tabs tab__checked':'category-tabs'">
                  {{ item.label }}
                </div>
              </li>
            </template>
          </ul>
          <div class="distro-container">
            <div>
              <ul class="distro-group">
                <template v-for="item in isoCategory[defaultCheck].column">
                  <li>
                    <div @click="handleDistroTabClicked" :class="item.key === 0 ? 'distro-tabs tab__checked':'distro-tabs'">
                      {{ item.distro }}
                    </div>
                  </li>
                </template>
              </ul>
            </div>
            <div class="distro-download-group">
              <ul>
                <template v-for="item in isoCategory[defaultCheck].column[defaultDistroTab].urls">
                  <li>
                    <div class="download-url-list">
                      <a :href="mirror_url.slice(0,mirror_url.length-1) + item.url">{{ item.name }}</a>
                    </div>
                  </li>
                </template>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DownloadDialog>
  </div>
</template>

<script>
import Api_mirror from "@/components/Api/Api_mirror";

export default {
  name: "SideBar",
  data() {
    return {
      exportUrls: process.env.exportUrls,
      contactUrls: process.env.contactUrls,
      siteLinks: process.env.siteLinks,
      mirror_url: process.env.mirrorURL,
      style: "text-decoration: none;" + "color:" + process.env.baseLinkColor + ";",
      showDialog: false,
      isoList: [],

      isoCategory: [
        { prop: 'os', label: '系统镜像' , column: [], key:0 },
        { prop: 'app', label: '常用软件', column: [], key:1 },
      ],
      defaultCheck: 0,
      defaultDistroTab: 0
    }
  },
  watch: {
    'defaultCheck': {
      handler: function () {
        this.defaultDistroTab = 0
      }
    }
  },
  methods: {
    handleGroupClick(e) {
      const target = e.target.innerText
      let index = this.isoCategory.findIndex(item => {
        return item.label === target
      })
      console.log(target)
      this.defaultCheck = index

      // change button style
      const blocks = document.getElementsByClassName('category-tabs')
      for (let block of blocks) {
        let content = block.innerText
        if (content === target) {
          block.className = 'category-tabs ' + 'tab__checked'
        } else {
          block.className = 'category-tabs'
        }
      }
    },
    handleDistroTabClicked(e) {
      // console.log(e)
      const target = e.target.innerText
      let index = this.isoCategory[this.defaultCheck].column.findIndex(item => {
        return item.distro === target
      })
      this.defaultDistroTab = index

      // change button style
      const blocks = document.getElementsByClassName('distro-tabs')
      for (let block of blocks) {
        let content = block.innerText
        if (content === target) {
          block.className = 'distro-tabs ' + 'tab__checked'
        } else {
          block.className = 'distro-tabs'
        }
      }
    },
    generateIsoBase() {
      if (this.isoList.length !== 0) {
        this.isoList.forEach(item => {
          let index = this.isoCategory.findIndex(co => {
            return co.prop === item.category
          })
          if (index !== -1) {
            let param = {
              distro: item.distro,
              urls: item.urls
            }
            this.isoCategory[index].column.push(param)

          }
        })
      }
      for (let item of this.isoCategory) {
        let count = 0
        for (let child of item.column) {
          child.key = count
          count++
        }
      }

      console.log(this.isoCategory)
    }
  },
  async fetch() {
    this.isoList = await this.$axios.$get(Api_mirror.getIsoList())
    this.$nextTick(() => {
      this.generateIsoBase()
    })
    console.log(this.isoList,"=== isolist ===")
  },
}
</script>

<style lang="scss" scoped>

</style>
