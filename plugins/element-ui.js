import Vue from 'vue'
import locale from 'element-ui/lib/locale/lang/zh-CN'

// dev options(use this to use full function of element ui)
// Vue.use(Element, { locale })
// import Element from 'element-ui'


// production options
import {
  Pagination,
  Input,
  Table,
  TableColumn,
  Breadcrumb,
  BreadcrumbItem,
  Tag,
  Tree,
  Alert,
  Row,
  Col,
  Container,
  Main,
  Backtop,
  Tooltip,
  Loading
} from "element-ui";

Vue.use(Pagination,{ locale })
Vue.use(Input, { locale })
Vue.use(Table,{ locale })
Vue.use(TableColumn,{ locale })
Vue.use(Breadcrumb,{ locale })
Vue.use(BreadcrumbItem,{ locale })
Vue.use(Tag,{ locale })
Vue.use(Tree,{ locale })
Vue.use(Alert,{ locale })
Vue.use(Row,{ locale })
Vue.use(Col,{ locale })
Vue.use(Container,{ locale })
Vue.use(Main,{ locale })
Vue.use(Backtop,{ locale })
Vue.use(Tooltip,{ locale })
Vue.use(Loading, { locale })
