<template>
  <modal name="download-dialog" adaptive focusTrap height="auto" width="440px"
    @before-close="handleBeforeClose">
    <div id="download-modal">
      <!-- radio button group -->
      <div id="radio-button-group">
        <form>
          <template v-for="(item, index) of isoCategory" :key="index">
            <label>
              <input type="radio" v-model="selectedCategory" :value="item.key" :checked="selectedCategory === item.key" />
              {{ item.label }}
            </label>
          </template>
        </form>
      </div>
      <div id="select-group">
        <!-- select group -->
        <div>
          <label>选择发行版: </label>
          <select v-model="selectedDistro" v-if="selectedCategory === 0" @change="selectedChanged">
            <template v-for="(item, index) of isoCategory[0].column" :key="index">
              <option :value="item.key">{{ item.distro }}</option>
            </template>
          </select>
          <select v-model="selectedSoftware" v-if="selectedCategory === 1" @change="selectedChanged">
            <template v-for="(item, index) of isoCategory[1].column" :key="index">
              <option :value="item.key">{{ item.distro }}</option>
            </template>
          </select>
        </div>
        <!-- select group -->
        <div>
          <label>选择版本: </label>
          <select v-model="selectedVersionUrl" @change="versionUrlChanged">
            <template v-for="(item, index) of versionList" :key="index">
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
  </modal>
</template>

<script>
export default {
  name: 'DownloadModal',
  methods: {
    handleCancel() {
      this.$modal.hide('download-dialog')
    }
  }
}
</script>
<script setup>
import { nextTick, watch, onMounted } from 'vue'
import { useDownloadDialogChosenStore } from '../store/download-dialog-chosen'

const props = defineProps({
  isoCategory: {
    type: Array
  }
})
const emit = defineEmits(['before-close'])
const selectedCategory = ref(0)
const selectedDistro = ref(0)
const selectedSoftware = ref(0)
const selectedVersionUrl = ref('about:blank')
const selectedColumnKey = ref(0)
const versionList = ref([
  {
    name: '---',
    url: 'about:blank'
  }
])
const downloadDialogChosenStore = useDownloadDialogChosenStore()
const currentCategoryKey = computed(() => downloadDialogChosenStore.currentCategory)
const currentDistroKey = computed(() => downloadDialogChosenStore.currentDistro)
const currentSoftwareKey = computed(() => downloadDialogChosenStore.currentSoftware)
let timer = null
const timerInWatch = ref(null)
const currentCategory = useState('downloadDialogChosen.currentCategory')
watch(selectedCategory, () => {
  downloadDialogChosenStore.changeCategory(selectedCategory.value)
  nextTick(() => {
    if (selectedCategory.value === 0) {
      listCleanUp()
      generateUrlList(selectedCategory.value, selectedDistro.value)
    } else if (selectedCategory.value === 1) {
      listCleanUp()
      generateUrlList(selectedCategory.value, selectedSoftware.value)
    }
  })
}, { deep: true })
watch(() => props.isoCategory, () => {
  console.log('inject timer')
  if (!props.isoCategory[0].column[0]) {
    timer = setInterval(test, 40)
  }
}, { immediate: true, deep: true })
function selectedChanged(newVal) {
  if (selectedCategory.value === 0) {
    downloadDialogChosenStore.changeChosenDistro(selectedDistro.value)
    listCleanUp()
    generateUrlList(selectedCategory.value, selectedDistro.value)
  } else if (selectedCategory.value === 1) {
    downloadDialogChosenStore.changeChosenSoftware(selectedSoftware.value)
    listCleanUp()
    generateUrlList(selectedCategory.value, selectedSoftware.value)
  }
}
function handleBeforeClose() {
  emit('before-close')
}
function verify() { }
function handleDownload() {
  const url = selectedVersionUrl.value
  if (url === 'about:blank') {
    return
  }
  const name = url.slice(url.lastIndexOf('/') + 1)
  const a = document.createElement('a')
  verify(url)
  a.setAttribute('href', selectedVersionUrl.value)
  a.setAttribute('download', name)
  a.click()
  a.remove()
}
function versionUrlChanged(newVal) { }
function test() {
  if (!props.isoCategory[0].column[0]) {
    console.log('category not ready yet')
  } else {
    console.log('timer cleanup')
    generateUrlList(0, 0)
    clearInterval(timer)
  }
}
function generateUrlList(category, column) {
  props.isoCategory[category].column[column].urls.forEach((item) => {
    versionList.value.push(item)
  })
}
function listCleanUp() {
  versionList.value = versionList.value.slice(0, 1)
  resetModel()
}
function resetModel() {
  selectedVersionUrl.value = 'about:blank'
}
onMounted(() => {
  selectedCategory.value = currentCategoryKey.value
  selectedDistro.value = currentDistroKey.value
  selectedSoftware.value = currentSoftwareKey.value
  selectedColumnKey.value = 0
})
</script>
