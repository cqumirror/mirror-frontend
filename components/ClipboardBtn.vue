<template>
  <button ref="copy" class="copy-btn" @click="handleCopyClicked">
    <IconClipboardCheck v-if="state === 'copied'" class="copy-btn-done"/>
    <IconClipboardCopy v-else class="copy-btn-init"/>
  </button>
</template>

<script>

// import '@/assets/css/main.scss'
import IconClipboardCheck from "@/components/btnComponent/IconClipboardCheck.vue";
import IconClipboardCopy from "@/components/btnComponent/IconClipboardCopy.vue";

export default {
  name: "ClipboardBtn",
  components: {IconClipboardCopy, IconClipboardCheck},
  data () {
    return {
      state: 'init',
      copyCode: null // 添加 copyCode 属性并初始化为 null
    }
  },
  methods: {
    handleCopyClicked() {
      this.copyCode.on('success', (event) => {
        console.log("success",event)
        event.clearSelection()
        this.state = 'copied'
        window.setTimeout(() => {
          this.state = 'init'
        }, 1300)
      })
      this.copyCode.on('error', (event) => {
        console.log("error: ",event)
      })
    }
  },
  mounted () {
    this.copyCode = new this.clipboard(
      this.$refs.copy,{
        target(elem) {
          console.log("element",elem)
          return elem.previousElementSibling
        }
      })
  },
  beforeDestroy() {
    // 清理 Clipboard 实例
    this.copyCode.destroy()
  },
}
</script>

<style scoped>

</style>
