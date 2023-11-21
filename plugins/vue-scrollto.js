import VueScrollTo from 'vue-scrollto'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(VueScrollTo)
})
