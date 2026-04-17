import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons' // \f02d 对应的图标
// import part of the icons
import {
  faNewspaper,
  faPaperclip,
  faInbox,
  faEnvelope,
  faLayerGroup,
  faTerminal
} from '@fortawesome/free-solid-svg-icons'
import {
  faFileArchive,
  faPaperPlane
} from '@fortawesome/free-regular-svg-icons'
import {
  faGithub
} from "@fortawesome/free-brands-svg-icons"

library.add(faNewspaper)
library.add(faPaperclip)
library.add(faInbox)
library.add(faEnvelope)
library.add(faLayerGroup)
library.add(faTerminal)
library.add(faFileArchive)
library.add(faPaperPlane)
library.add(faGithub)
library.add(faBook)
config.autoAddCss = false
config.showMissingIcons = true

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('fa', FontAwesomeIcon)
})
