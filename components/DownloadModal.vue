<template>
  <modal name="download-dialog" :adaptive="true" :focusTrap="true" height="auto" width="440px"
         @before-close="handleBeforeClose">
    <div id="download-modal">
      <!-- radio button group -->
      <div id="radio-button-group">
        <form>
          <template v-for="(item, index) of isoCategory" :key="index">
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
  name: "DownloadModal",
  props: {
    isoCategory: {type: Array}
  },
  data() {
    return {
      selectedCategory: 0,
      selectedDistro: 0,
      selectedSoftware: 0,
      selectedVersionUrl: 'about:blank',
      selectedColumnKey: 0,
      versionList: [
        {
          name: '---',
          url: 'about:blank'
        }
      ],
      timer: undefined,
      timerInWatch: undefined

    }
  },
  computed: {
    currentCategoryKey() {
      return this.$store.state.downloadDialogChosen.currentCategory
    },
    currentDistroKey() {
      return this.$store.state.downloadDialogChosen.currentDistro
    },
    currentSoftwareKey() {
      return this.$store.state.downloadDialogChosen.currentSoftware
    }
  },
  created() {
    this.selectedCategory = this.currentCategoryKey
    this.selectedDistro = this.currentDistroKey
    this.selectedSoftware = this.currentSoftwareKey

    this.selectedColumnKey = 0
  },
  methods: {
    handleCancel() {
      this.$modal.hide('download-dialog')
    },
    handleBeforeClose() {
      this.$emit('before-close')
    },
    verify() {

    },
    handleDownload() {
      const url = this.selectedVersionUrl
      if (url === 'about:blank') {
        return
      }
      const name = url.slice(url.lastIndexOf("/") + 1)
      const a = document.createElement("a")
      this.verify(url)
      a.setAttribute("href", this.selectedVersionUrl)
      a.setAttribute("download", name)
      a.click()
      a.remove()
    },
    selectedChanged(newVal) {
      if (this.selectedCategory === 0) {
        this.$store.commit('downloadDialogChosen/changeChosenDistro', this.selectedDistro)
        this.listCleanUp()
        this.generateUrlList(this.selectedCategory, this.selectedDistro)
      } else if (this.selectedCategory === 1) {
        this.$store.commit('downloadDialogChosen/changeChosenSoftware', this.selectedSoftware)
        this.listCleanUp()
        this.generateUrlList(this.selectedCategory, this.selectedSoftware)
      }
    },
    versionUrlChanged(newVal) {

    },
    test() {
      if (!this.$props.isoCategory[0].column[0]) {
        console.log("category not ready yet")
      } else {
        console.log("timer cleanup")
        this.generateUrlList(0, 0)
        clearInterval(this.timer)
      }
    },
    generateUrlList(category, column) {
      this.$props.isoCategory[category].column[column].urls.forEach(item => {
        this.versionList.push(item)
      })
    },
    listCleanUp() {
      this.versionList = this.versionList.slice(0, 1)
      this.resetModel()
    },
    resetModel() {
      this.selectedVersionUrl = 'about:blank'
    }
  },
  watch: {
    'selectedCategory': {
      handler: function () {
        this.$store.commit('downloadDialogChosen/changeCategory', this.selectedCategory)
        this.$nextTick(() => {
          if (this.selectedCategory === 0) {
            this.listCleanUp()
            this.generateUrlList(this.selectedCategory, this.selectedDistro)
          } else if (this.selectedCategory === 1) {
            this.listCleanUp()
            this.generateUrlList(this.selectedCategory, this.selectedSoftware)
          }

        })

      },
    },
    'isoCategory': {
      handler: async function () {
        console.log("inject timer")
        if (!this.$props.isoCategory[0].column[0]) {
          this.timer = setInterval(this.test, 40)
        }
      },
      immediate: true,
    }

  }
}
</script>

<style scoped>

</style>
