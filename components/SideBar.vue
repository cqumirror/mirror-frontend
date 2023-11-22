<template>
  <div
    style="display: flex"
    class="right-bar"
  >
    <!--NOTICE-->
    <template v-for="(item, index) in notices.notice" :key="index">
      <template v-if="notices.enabled">
        <warp-notice
          :title="item.title"
          :type="item.type"
          :description="item.description"
          :closable="item.closable"
          :center="item.center"
          :show-icon="item.showIcon"
          :theme="item.theme"
          :callback="item.callback"
          :action="item.action"
          class="site-notice"
        />
      </template>
    </template>
    <!--news-->
    <div>
      <h4>
        <fa
          :icon="['fas', 'newspaper']"
          style="margin-right: 1vw"
        />新闻公告
      </h4>
      <SideBarNewsPreview :style-news="style" />
    </div>

    <!--url-->
    <div>
      <h4>
        <fa
          :icon="['fas', 'paperclip']"
          style="margin-right: 1vw"
        />域名选择
      </h4>
      <ul>
        <li v-for="(item, index) in exportUrls" :key="index">
          <a
            :href="item.url"
            target="_blank"
            :style="style"
          >
            {{ item.url }}
          </a>
          {{ item.desc }}
        </li>
      </ul>
    </div>

    <!--download link-->
    <div>
      <h4>
        <fa
          :icon="['far', 'file-archive']"
          style="margin-right: 1vw"
        />下载链接
      </h4>
      <div style="display: flex; flex-direction: column; margin-left: 2vw">
        <span>常用发行版 iso 和应用工具安装包下载</span>
        <button
          id="download-pkg"
          @click="handleDialogRaise"
        >
          获取下载链接
        </button>
      </div>
    </div>
    <!--download dialog-->
    <DownloadModal
      :iso-category="isoCategory"
      @before-close="handleDialogClose"
    />

    <!--contact-->
    <div>
      <h4>
        <fa
          :icon="['far', 'paper-plane']"
          style="margin-right: 1vw"
        />联系我们
      </h4>
      <ul>
        <li v-for="(item, index) in contactUrls" :key="index">
          <a
            :href="item.url"
            target="_blank"
            :style="style"
          >
            {{ item.url }}
          </a>
        </li>
      </ul>
    </div>

    <!--links-->
    <div v-if="siteLinks.enabled">
      <h4>
        <fa
          :icon="['fas', 'inbox']"
          style="margin-right: 1vw"
        />相关链接
      </h4>
      <ul>
        <li v-for="(item, index) in siteLinks.links" :key="index">
          <a
            :href="item.url"
            :style="style"
          >
            {{ item.desc }}
          </a>
        </li>
      </ul>
    </div>

    <FloatToolsBtn
      v-if="indexToolBox.enabled"
      :data="indexToolBox.data"
    >
      <template #back-to-top>
        <el-backtop />
      </template>
    </FloatToolsBtn>
  </div>
</template>

<script>
import ApiMirror from '@/components/Api/ApiMirror'
import WarpNotice from '@/components/scroll-notice/warpNotice.vue'
import config from '../utils/config'

export default {
  name: 'SideBar',
  components: { WarpNotice },
  setup() {
    return {
      indexToolBox: config.indexFloatBox,
      exportUrls: config.exportUrls,
      contactUrls: config.contactUrls,
      siteLinks: config.siteLinks,
      style:
        'text-decoration: none;' + 'color:' + config.baseLinkColor + ';',
      isoList: [],

      isoCategory: [
        { prop: 'os', label: '系统镜像', column: [], key: 0 },
        { prop: 'app', label: '常用软件', column: [], key: 1 }
      ],

      notices: {}
    }
  },
  async created() {
    await this.init()
  },
  methods: {
    handleDialogClose() {
      document.removeEventListener('mousewheel', this.eventHandler, {
        passive: true
      })
    },
    handleDialogRaise() {
      document.addEventListener('mousewheel', this.eventHandler, {
        passive: false
      })
      this.$modal.show('download-dialog')
    },
    eventHandler(e) {
      e.preventDefault()
    },
    generateIsoBase() {
      if (this.isoList.length !== 0) {
        this.isoList.forEach((item) => {
          const index = this.isoCategory.findIndex((co) => {
            return co.prop === item.category
          })
          if (index !== -1) {
            const param = {
              distro: item.distro,
              urls: item.urls
            }
            this.isoCategory[index].column.push(param)
          }
        })
      }
      for (const item of this.isoCategory) {
        let count = 0
        for (const child of item.column) {
          child.key = count
          count++
        }
      }

      // console.log(this.isoCategory)
    },
    async init() {
      await fetch(ApiMirror.getNotices())
        .then((data) => data.json())
        .then((res) => {
          this.notices = JSON.parse(JSON.stringify(res))
        })
      await fetch(ApiMirror.getIsoList())
        .then((data) => data.json())
        .then((res) => {
          this.isoList = JSON.parse(JSON.stringify(res))
          this.generateIsoBase()
        })
    }
  }
}
</script>
