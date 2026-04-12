<template>
  <VueFinalModal
    v-model="showModal"
    classes="modal-container"
    content-class="modal-content"
    :lock-scroll="true"
    :focus-trap="true"
    :click-to-close="false"
    :esc-to-close="true"
    :style="{ width: '440px' }"
    @before-close="handleBeforeClose"
  >
    <div id="download-modal">
      <!-- radio button group -->
      <div id="radio-button-group">
        <form>
          <template v-for="item of props.isoCategory" :key="item.key">
            <label>
              <input
                type="radio"
                v-model="selectedCategory"
                :value="item.key"
                :checked="selectedCategory === item.key"
              />
              {{ item.label }}
            </label>
          </template>
        </form>
      </div>
      <div id="select-group">
        <!-- select group -->
        <div>
          <label>选择项目: </label>
          <select v-model="selectedDistro" v-if="selectedCategory === 0" @change="selectedChanged">
            <template v-for="item of $props.isoCategory[0].column">
              <option :value="item.key">{{ item.distro }}</option>
            </template>
          </select>
          <select v-model="selectedSoftware" v-if="selectedCategory === 1" @change="selectedChanged">
            <template v-for="item of $props.isoCategory[1].column">
              <option :value="item.key">{{ item.distro }}</option>
            </template>
          </select>
          <select v-model="selectedFont" v-if="selectedCategory === 2" @change="selectedChanged">
            <template v-for="item of $props.isoCategory[2].column">
              <option :value="item.key">{{ item.distro }}</option>
            </template>
          </select>
        </div>
        <!-- select group -->
        <div>
          <label>选择版本: </label>
          <select v-model="selectedVersionUrl" @change="versionUrlChanged">
            <template v-for="item of versionList">
              <option :value="item.url">{{ item.name }}</option>
            </template>
          </select>
        </div>
      </div>
      <!-- button -->
      <div id="check-button">
        <button @click="handleCancel">取消</button>
        <button @click="handleDownload" id="button-confirm">确认下载</button>
      </div>
    </div>
  </VueFinalModal>
</template>

<script setup>
import Api_mirror from "@/components/Api/Api_mirror";
import { VueFinalModal } from 'vue-final-modal'
import { useDownloadDialogStore } from '@/store/downloadDialog'
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  isoCategory: { type: Array, default: () => [] }
})

const emit = defineEmits(['before-close'])

const store = useDownloadDialogStore()

const showModal = ref(false)
const selectedCategory = ref(0)
const selectedDistro = ref(0)
const selectedSoftware = ref(0)
const selectedFont = ref(0)
const selectedVersionUrl = ref('about:blank')
const selectedColumnKey = ref(0)
const versionList = ref([{ name: '---', url: 'about:blank' }])
const timer = ref(null)

const handleCancel = () => {
  showModal.value = false
}

const handleBeforeClose = () => {
  emit('before-close')
}

const handleDownload = () => {
  const url = selectedVersionUrl.value
  if (url === 'about:blank') return
  window.open(url, '_blank')
  showModal.value = false
}

const verifyPre = async (key) => {
  console.log(key)
  const xhr = new XMLHttpRequest()
  const url = Api_mirror.getBaseurl({}) + key
  xhr.open('HEAD', url, true)
  xhr.send()
  xhr.onreadystatechange = await function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      const headers = xhr.getResponseHeader('x-remote-addr')
      addCookie('addr', headers, key)
    }
  }.bind(this)
}

const addCookie = (cookieName, cookieValue, path) => {
  document.cookie = `${cookieName}=${cookieValue}; max-age=300;`
}

const selectedChanged = () => {
  if (selectedCategory.value === 0) {
    store.changeChosenDistro(selectedDistro.value)
    listCleanUp()
    generateUrlList(selectedCategory.value, selectedDistro.value)
  } else if (selectedCategory.value === 1) {
    store.changeChosenSoftware(selectedSoftware.value)
    listCleanUp()
    generateUrlList(selectedCategory.value, selectedSoftware.value)
  } else if (selectedCategory.value === 2) {
    store.changeChosenFont(selectedFont.value)
    listCleanUp()
    generateUrlList(selectedCategory.value, selectedFont.value)
  }
}

const versionUrlChanged = () => {}

const test = () => {
  if (!props.isoCategory?.[0]?.column?.[0]) {
    console.log("category not ready yet")
  } else {
    console.log("timer cleanup")
    generateUrlList(0, 0)
    if (timer.value) {
      clearInterval(timer.value)
      timer.value = null
    }
  }
}

const generateUrlList = (category, column) => {
  if (props.isoCategory?.[category]?.column?.[column]?.urls) {
    props.isoCategory[category].column[column].urls.forEach(item => {
      versionList.value.push(item)
    })
  }
}

const listCleanUp = () => {
  versionList.value = versionList.value.slice(0, 1)
  resetModel()
}

const resetModel = () => {
  selectedVersionUrl.value = 'about:blank'
}

onMounted(() => {
  selectedCategory.value = store.currentCategory
  selectedDistro.value = store.currentDistro
  selectedSoftware.value = store.currentSoftware
})

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)
  }
})

watch(() => selectedCategory.value, () => {
  store.changeCategory(selectedCategory.value)
  setTimeout(() => {
    if (selectedCategory.value === 0) {
      listCleanUp()
      generateUrlList(selectedCategory.value, selectedDistro.value)
    } else if (selectedCategory.value === 1) {
      listCleanUp()
      generateUrlList(selectedCategory.value, selectedSoftware.value)
    } else if (selectedCategory.value === 2) {
      listCleanUp()
      generateUrlList(selectedCategory.value, selectedFont.value)
    }
  })
})

watch(() => props.isoCategory, () => {
  console.log("inject timer")
  if (!props.isoCategory?.[0]?.column?.[0]) {
    if (timer.value) clearInterval(timer.value)
    timer.value = setInterval(test, 40)
  }
}, { immediate: true, deep: true })
</script>

<style scoped>

</style>
