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
    callback: { type: String, default: undefined }
  },
  methods: {
    handleCallback() {
      if (this.$props.callback) {
        console.log(this.$props.callback)
        this.$router.push({name: 'news-page', params: { page: this.$props.callback }});
      }
    }
  },
}
</script>

<style scoped>

</style>
