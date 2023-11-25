import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// import all icons

// icon need tobe import before use in vue components
// font awesome icon version: 5.15.4
// cheatsheet: https://fontawesome.com/v5/search?o=r&m=free
// import { fas } from '@fortawesome/free-solid-svg-icons'
// import { far } from '@fortawesome/free-regular-svg-icons'
// import { fab } from "@fortawesome/free-brands-svg-icons";
/* add icons to the library */
// library.add(fas)
// library.add(far)
// library.add(fab)

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
import { faGithub } from '@fortawesome/free-brands-svg-icons'

library.add(faNewspaper)
library.add(faPaperclip)
library.add(faInbox)
library.add(faEnvelope)
library.add(faLayerGroup)
library.add(faTerminal)
library.add(faFileArchive)
library.add(faPaperPlane)
library.add(faGithub)

config.autoAddCss = false
config.showMissingIcons = true

// add font awesome icon component
// use <fa icon=""/> to add icon

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.component('fa', FontAwesomeIcon)
})
