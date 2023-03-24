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
    <DownloadDialog v-if="showDialog" @close="showDialog = false"/>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      exportUrls: process.env.exportUrls,
      contactUrls: process.env.contactUrls,
      siteLinks: process.env.siteLinks,
      style: "text-decoration: none;" + "color:" + process.env.baseLinkColor + ";",
      showDialog: false,
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
