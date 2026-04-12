import { defineStore } from 'pinia'

export const useDownloadDialogStore = defineStore('downloadDialog', {
  state: () => ({
    currentCategory: 0,
    currentDistro: 0,
    currentSoftware: 0,
    currentFont: 0
  }),

  actions: {
    changeCategory(value: number) {
      this.currentCategory = value
    },
    changeChosenDistro(value: number) {
      this.currentDistro = value
    },
    changeChosenSoftware(value: number) {
      this.currentSoftware = value
    },
    changeChosenFont(value: number) {
      this.currentFont = value
    }
  }
})
