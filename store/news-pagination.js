import { defineStore } from 'pinia'
export const useNewsPaginationStore = defineStore('news-pagination', {
  state: () => ({
    currentPage: 0
  }),
  actions: {
    currentChangeNext() {
      this.currentPage++
    },
    currentChangePre() {
      this.currentPage--
    }
  },
})
