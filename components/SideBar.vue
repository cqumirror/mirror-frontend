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
      v-model="modalVisible"
      :iso-category="isoCategory"
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

<script setup>
import ApiMirror from '@/components/Api/ApiMirror'
import WarpNotice from '@/components/scroll-notice/warpNotice.vue'
import config from '../utils/config'

const indexToolBox = config.indexFloatBox
const exportUrls = config.exportUrls
const contactUrls = config.contactUrls
const siteLinks = config.siteLinks
const style = 'text-decoration: none;' + 'color:' + config.baseLinkColor + ';'
const isoList = ref([])

const isoCategory = [
  { prop: 'os', label: '系统镜像', column: [], key: 0 },
  { prop: 'app', label: '常用软件', column: [], key: 1 }
]

const notices = ref({})

async function init() {
  await fetch(ApiMirror.getNotices())
    .then((data) => data.json())
    .then((res) => {
      notices.value = JSON.parse(JSON.stringify(res))
    })
  await fetch(ApiMirror.getIsoList())
    .then((data) => data.json())
    .then((res) => {
      isoList.value = JSON.parse(JSON.stringify(res))
      generateIsoBase()
    })
}
init()

const modalVisible = ref(false)
function handleDialogRaise() {
  modalVisible.value = true
}
function generateIsoBase() {
  if (isoList.value.length !== 0) {
    isoList.value.forEach((item) => {
      const index = isoCategory.findIndex((co) => {
        return co.prop === item.category
      })
      if (index !== -1) {
        const param = {
          distro: item.distro,
          urls: item.urls
        }
        isoCategory[index].column.push(param)
      }
    })
  }
  for (const item of isoCategory) {
    let count = 0
    for (const child of item.column) {
      child.key = count
      count++
    }
  }
}
</script>
