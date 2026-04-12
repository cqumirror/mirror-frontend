export const state = () => ({
  currentPage: 0
})

export const mutations = {
  currentChangeNext(state) {
    state.currentPage++
  },
  currentChangePre(state) {
    state.currentPage--
  }
}
