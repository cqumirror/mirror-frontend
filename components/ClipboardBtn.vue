<template>
  <button ref="copy" class="copy-btn">
    <IconClipboardCheck v-if="state === 'copied'" class="copy-btn-done" />
    <IconClipboardCopy v-else class="copy-btn-init" />
  </button>
</template>

<script>

import '@/assets/css/main.scss'

import clipboard from "clipboard";
import IconClipboardCheck from "~/components/btnComponent/IconClipboardCheck.vue";
import IconClipboardCopy from "~/components/btnComponent/IconClipboardCopy.vue";

export default {
  name: "ClipboardBtn",
  components: {IconClipboardCopy, IconClipboardCheck},
  data () {
    return {
      state: 'init'
    }
  },
  mounted () {
    const copyCode = new clipboard(this.$refs.copy, {
      target (trigger) {
        return trigger.previousElementSibling
      }
    })

    copyCode.on('success', (event) => {
      event.clearSelection()
      this.state = 'copied'
      window.setTimeout(() => {
        this.state = 'init'
      }, 2000)
    })
  }
}
</script>

<style scoped>

</style>
