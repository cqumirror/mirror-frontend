<template>
  <div class="wiki-container">
    <button id="nav-open" @click="handleShowNav">
      <i class="nav-open-icon" />
    </button>
    <transition name="slide">
      <div class="wiki-nav-container" v-if="showNav">
        <div class="wiki-nav">
          <el-tree ref="navTree" :data="data" :props="defaultProps" node-key="id" @node-click="handleNodeClick"
            :default-expanded-keys="expandedKeys" accordion>
            <template v-slot="{ data }">
              <div class="leaf-parent">
                <nuxt-link :to="`${data._path}`" class="leaf-end">{{
                  data.title
                }}</nuxt-link>
              </div>
            </template>
          </el-tree>
          <button id="nav-close" @click="handleCloseNav">
            <el-icon><el-icon-close /></el-icon>
          </button>
        </div>
      </div>
    </transition>
    <div class="wiki-content-parent">
      <article v-if="$route.name === 'wiki'" id="md-content" class="wiki-page-content">
        <ContentRenderer v-if="article" ref="nuxtContent" :value="article" />
      </article>
      <NuxtPage v-else />
    </div>
    <FloatToolsBtn v-if="wikiFloatBox.enabled" :data="wikiFloatBox.data">
      <template v-slot:back-to-top>
        <el-backtop />
      </template>
    </FloatToolsBtn>
  </div>
</template>

<script setup>
import { Close as ElIconClose } from '@element-plus/icons-vue'
import config from '../../utils/config'

const wikiFloatBox = config.wikiFloatBox
const defaultProps = {
  children: 'children',
  label: 'title',
  id: 'id'
}

const showNav = ref(false)
function handleShowNav() {
  showNav.value = true
  const blocks = document.getElementsByClassName('wiki-content-parent')
  for (const block of blocks) {
    block.style.display = 'none'
  }
}
function handleCloseNav() {
  const blocks = document.getElementsByClassName('wiki-content-parent')
  for (const block of blocks) {
    block.style.display = 'inherit'
  }
  showNav.value = false
}
function handleResize() {
  showNav.value = true
  const blocks = document.getElementsByClassName('wiki-content-parent')
  for (const block of blocks) {
    block.style.display = 'inherit'
  }
}

function traverseTree(node, callback) {
  if (!node) return
  callback(node)
  const children = node.root ? node.root.childNodes : node.childNodes
  if (children) {
    children.forEach((child) => {
      traverseTree(child, callback)
    })
  }
}
function handleNodeClick(node) { }

const navTree = ref(null)
function handleCollapseAll() {
  nextTick(() => {
    if (showNav.value) {
      traverseTree(navTree.value.store.root, (node) => {
        node.expanded = false
      })
    }
  })
}
const route = useRoute()
const expandedKeys = ref([])
const mobileSize = 990
onMounted(() => {
  window.onresize = () => {
    setTimeout(() => {
      if (window.innerWidth > mobileSize) {
        handleResize()
      } else {
        if (showNav.value) {
          scrollTo(0, 0)
          handleShowNav()
        }
      }
    }, 400)
  }
  if (route.name === 'wiki') {
    expandedKeys.value = []
  } else {
    const { path } = route
    const pathArr = path.split('/')
    const id = pathArr[pathArr.length - 1]
    expandedKeys.value = [id]
  }
  if (window.innerWidth > mobileSize) {
    handleResize()
  }
})
function preProcess(articles) {
  articles.forEach((item) => {
    item._path = item._path.replace('/_index', '')
    const slugArr = item._path.split('/')
    item.id = slugArr[slugArr.length - 1]
    item.pid = slugArr.length === 2 ? 0 : slugArr[slugArr.length - 2]
  })
}
function buildTree(items) {
  const result = []
  const itemMap = {}
  for (const item of items) {
    const id = item.id
    const pid = item.pid
    if (!itemMap[id]) {
      itemMap[id] = {
        children: []
      }
    }
    itemMap[id] = {
      ...item,
      children: itemMap[id].children
    }
    const treeItem = itemMap[id]
    if (pid === 0) {
      result.push(treeItem)
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: []
        }
      }
      itemMap[pid].children.push(treeItem)
    }
  }
  return result
}
const article = ref(null)
async function fetchIndex() {
  const res = await useAsyncData('wiki-index', () => queryContent('wiki/_index').findOne())
  article.value = unref(res.data)
}
const data = ref([])
async function fetchArticles() {
  const res = await useAsyncData('wiki', () => queryContent('wiki')
    .only(['title', 'description', 'author', '_path'])
    .sort({ title: 1 })
    .find())
  const articles = unref(res.data)
  preProcess(articles)
  data.value = buildTree(articles)[0].children
}
fetchArticles()
watchEffect(() => {
  if (route.name === 'wiki') {
    fetchIndex()
    expandedKeys.value = []
    handleCollapseAll()
  }
})
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.25s ease-out, opacity 0.25s ease-out;
}
.slide-enter-from {
  transform: translateX(100%);
  opacity: 100%;
}
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 100%;
}
.slide-enter-active {
  animation: slide-in 0.2s ease-out;
}
.slide-leave-active {
  animation: slide-out 0.25s ease-out;
}
@keyframes slide-in {
  0% {
    transform: translateX(-100%);
    opacity: 0.95;
  }
  100% {
    transform: translateX(0%);
    opacity: 1;
  }
}
@keyframes slide-out {
  0% {
    transform: translateX(0%);
    opacity: 1;
  }
  100% {
    transform: translateX(-100%);
    opacity: 0.95;
  }
}
</style>
