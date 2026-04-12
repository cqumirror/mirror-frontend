<template>
  <div ref="notice-container" @click="handleCallback" :style="callback ? 'cursor: pointer;':''">
    <el-alert
      :title="title"
      :type="type"
      :effect="effect"
      :closable="closable"
      :center="center"
      :show-icon="showIcon"
      :description="description"
    >
    </el-alert>
  </div>


</template>

<script>
export default {
  name: "warpNotice",
  props: {
    title: { type: String, default: '' },
    type: { type: String, default: 'warning' },
    description: { type: String, default: null},
    closable: { type: Boolean, default: true },
    center: { type: Boolean, default: false },
    showIcon: { type: Boolean, default: true },
    effect: { type: String, default: 'light' },
    callback: { type: String, default: undefined },
    action: { type: String, default: 'news'}
  },
  methods: {
    isDomainInWhitelist(url, whitelist) {
      // 提取URL中的域名部分
      const domainRegex = /^https?:\/\/([^/]+)\//;
      const matches = url.match(domainRegex);

      if (matches && matches.length > 1) {
        const domain = matches[1];
        // 检查域名是否在白名单中
        return whitelist.includes(domain);
      }

      // 如果无法提取域名，默认为不在白名单中
      return false;
    },
    handleCallback() {
      if (this.$props.callback) {
        // console.log(this.$props)
        let that = this
        const prop = that.$props
        if (prop.action) {
          let action = prop.action
          const whiteList = process.env.whiteListDomain
          if (action === 'url') {
            // 必须进行校验
            if (this.isDomainInWhitelist(prop.callback, whiteList)) {
              window.open(prop.callback, '_blank')
            } else {
              return
            }
          } else if (action === 'news') {
            this.$router.push({name: 'news-page', params: { page: this.$props.callback }})
          } else if (action === 'wiki') {
            this.$router.push({name: 'wiki', params: { page: prop.callback }})
          } else {
            this.$router.push({name: 'news-page', params: { page: this.$props.callback }})
          }
        }
      }
    }
  },
}
</script>

<style scoped>

</style>
