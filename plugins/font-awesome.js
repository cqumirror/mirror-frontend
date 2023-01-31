import Vue from 'vue'
import { library,config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// icon need tobe import before use in vue components
// font awesome icon version: 5.15.4
// cheatsheet: https://fontawesome.com/v5/search?o=r&m=free
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from "@fortawesome/free-brands-svg-icons";


/* add icons to the library */
library.add(fas)
library.add(far)
library.add(fab)

// prevent icon resize to large:
// https://github.com/FortAwesome/vue-fontawesome/issues/14#issuecomment-426723245
// config interfaces/options:
// export interface Config {
//   familyPrefix: string;
//   cssPrefix: string;
//   styleDefault: IconPrefix | CssStyleClass | IconStyle;
//   familyDefault: IconFamily;
//   replacementClass: string;
//   autoReplaceSvg: boolean | 'nest';
//   autoAddCss: boolean;
//   autoA11y: boolean;
//   searchPseudoElements: boolean;
//   observeMutations: boolean;
//   keepOriginalSource: boolean;
//   measurePerformance: boolean;
//   showMissingIcons: boolean;
// }
config.autoAddCss = false
config.showMissingIcons = true

// add font awesome icon component
// use <fa icon=""/> to add icon
Vue.component('fa', FontAwesomeIcon)

// disable productionTip
Vue.config.productionTip = false
