import { defineStore } from 'pinia'
export const useDownloadDialogChosenStore = defineStore('download-dialog-chosen', {
  state: () => ({
    currentCategory: 0,
    currentDistro: 0,
    currentSoftware: 0
  }),
  actions: {
    changeCategory(key) {
      this.currentCategory = typeof key === 'number' ? key : 0
    },
    changeChosenDistro(key) {
      this.currentDistro = typeof key === 'number' ? key : 0
    },
    changeChosenSoftware(key) {
      this.currentSoftware = typeof key === 'number' ? key : 0
    }
  },
})