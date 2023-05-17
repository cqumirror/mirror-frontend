export const state = () => ({
  currentCategory: 0,
  currentDistro: 0,
  currentSoftware: 0
})

export const mutations = {
  changeCategory(state, key) {
    state.currentCategory = typeof key === 'number' ? key : 0
  },
  changeChosenDistro(state, key) {
    state.currentDistro = typeof key === 'number' ? key : 0
  },
  changeChosenSoftware(state, key) {
    state.currentSoftware = typeof key === 'number' ? key : 0
  }
}
