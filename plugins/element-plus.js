import locale from 'element-plus/dist/locale/zh-cn.mjs'

import {
  ElPagination,
  ElTable,
  ElTableColumn,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTag,
  ElTree,
  ElAlert,
  ElRow,
  ElCol,
  ElContainer,
  ElMain,
  ElBacktop,
  ElTooltip,
  ElLoading
} from 'element-plus'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(ElPagination, { locale })
  nuxtApp.vueApp.use(ElTable, { locale })
  nuxtApp.vueApp.use(ElTableColumn, { locale })
  nuxtApp.vueApp.use(ElBreadcrumb, { locale })
  nuxtApp.vueApp.use(ElBreadcrumbItem, { locale })
  nuxtApp.vueApp.use(ElTag, { locale })
  nuxtApp.vueApp.use(ElTree, { locale })
  nuxtApp.vueApp.use(ElAlert, { locale })
  nuxtApp.vueApp.use(ElRow, { locale })
  nuxtApp.vueApp.use(ElCol, { locale })
  nuxtApp.vueApp.use(ElContainer, { locale })
  nuxtApp.vueApp.use(ElMain, { locale })
  nuxtApp.vueApp.use(ElBacktop, { locale })
  nuxtApp.vueApp.use(ElTooltip, { locale })
  nuxtApp.vueApp.use(ElLoading, { locale })
})
