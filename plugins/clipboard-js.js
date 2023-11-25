import clipboard from 'clipboard'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.config.globalProperties.clipboard = clipboard
})
