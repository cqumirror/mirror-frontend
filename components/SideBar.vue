<template>
  <div style="display: flex;" class="right-bar">
    <!--news-->
    <div>
      <fa :icon="['fas','newspaper']"/>
      <h4>新闻公告</h4>
    </div>

    <!--url-->
    <div>
      <h4>域名选择</h4>
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
      <h4>下载链接</h4>
      <span>常用发行版 iso 和应用工具安装包直接下载</span>
      <button @click="showDialog = true">获取下载链接</button>
    </div>

    <!--contact-->
    <div>
      <h4>联系我们</h4>
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
      <h4>相关链接</h4>
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

<style scoped>

</style>
