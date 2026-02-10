<template>
  <el-dialog
    :model-value="modelValue"
    @update:model-value="val => $emit('update:modelValue', val)"
    title="下载链接生成"
    :width="440"
    draggable
  >
    <div id="download-modal">
      <div id="radio-button-group">
        <form @submit.prevent>
          <template v-for="(item, index) of isoCategory" :key="index">
            <label class="radio-label">
              <input
                type="radio"
                v-model="selectedCategory"
                :value="item.key"
              />
              {{ item.label }}
            </label>
          </template>
        </form>
      </div>

      <div id="select-group">
        <div class="select-item">
          <label>选择{{ selectedCategory === 0 ? '发行版' : '软件' }}: </label>
          <select
            v-if="selectedCategory === 0"
            v-model="selectedDistro"
            @change="selectedChanged"
            class="custom-select"
          >
            <template v-for="(item, index) of isoCategory[0]?.column || []" :key="index">
              <option :value="item.key">{{ item.distro }}</option>
            </template>
          </select>
          <select
            v-else-if="selectedCategory === 1"
            v-model="selectedSoftware"
            @change="selectedChanged"
          >
            <template v-for="(item, index) of isoCategory[1]?.column || []" :key="index">
              <option :value="item.key">{{ item.distro }}</option>
            </template>
          </select>
        </div>

        <div class="select-item">
          <label>选择版本: </label>
          <select v-model="selectedVersionUrl">
            <template v-for="(item, index) of versionList" :key="index">
              <option :value="item.url">{{ item.name }}</option>
            </template>
          </select>
        </div>
      </div>

      <div id="check-button">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleDownload" id="button-confirm">确认下载</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
  import { ref, computed, watch, onMounted } from 'vue'
  import { useDownloadDialogChosenStore } from '../store/download-dialog-chosen'

  const props = defineProps({
  isoCategory: { type: Array, default: () => [] },
  modelValue: { type: Boolean, default: false }
})
  const emit = defineEmits(['update:modelValue'])

  const downloadDialogChosenStore = useDownloadDialogChosenStore()

  const selectedCategory = ref(0)
  const selectedDistro = ref(0)
  const selectedSoftware = ref(0)
  const selectedVersionUrl = ref('about:blank')

  const versionList = computed(() => {
  const base = [{ name: '---', url: 'about:blank' }]
  if (!props.isoCategory?.length) return base

  const category = selectedCategory.value
  const columnIdx = (category === 0) ? selectedDistro.value : selectedSoftware.value

  const urls = props.isoCategory[category]?.column?.[columnIdx]?.urls || []
  return [...base, ...urls]
})

  watch(selectedCategory, (val) => {
  downloadDialogChosenStore.changeCategory(val)
  selectedVersionUrl.value = 'about:blank'
})

  function selectedChanged() {
  selectedVersionUrl.value = 'about:blank'
  if (selectedCategory.value === 0) {
  downloadDialogChosenStore.changeChosenDistro(selectedDistro.value)
} else {
  downloadDialogChosenStore.changeChosenSoftware(selectedSoftware.value)
}
}

  function handleCancel() { emit('update:modelValue', false) }

  function handleDownload() {
  if (selectedVersionUrl.value === 'about:blank') return
  window.open(`${window.location.origin}${selectedVersionUrl.value}`, '_blank')
  emit('update:modelValue', false)
}

  onMounted(() => {
  selectedCategory.value = downloadDialogChosenStore.currentCategory
  selectedDistro.value = downloadDialogChosenStore.currentDistro
  selectedSoftware.value = downloadDialogChosenStore.currentSoftware
})
</script>

<style scoped>
#download-modal {
  padding: 10px 5px;
}

#radio-button-group {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.radio-label {
  margin: 0 15px;
  cursor: pointer;
  font-size: 18px;
}

.radio-label input[type="radio"] {
  transform: scale(1.3);
  margin-right: 8px;
}

#select-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 25px;
}

.select-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.custom-select {
  width: 260px;
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1.5px solid #dcdfe6;
  cursor: pointer;
}
.select-item select {
  width: 280px;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
}

#check-button {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

#button-confirm {
  padding: 12px 24px;
  font-size: 16px;
  height: auto;
}

:deep(.el-dialog__body) {
  padding-top: 10px;
}
</style>
