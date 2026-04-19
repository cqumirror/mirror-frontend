<template>
  <div class="wiki-container">
    <button id="nav-open" @click="handleShowNav">
      <fa :icon="['fa', 'bars-staggered']" class="nav-open-icon" />
      <span class="nav-open-text">全部文档</span>

    </button>
    <transition name="slide">
      <div v-if="showNav" class="wiki-nav-container">
        <div class="wiki-nav">
          <el-tree
            ref="navTree"
            :data="treeData"
            :props="defaultProps"
            node-key="id"
            :default-expanded-keys="expandedKeys"
            :filter-node-method="filterNode"
            accordion
          >
            <template #default="{ data }">
              <div class="leaf-parent">
                <NuxtLink v-if="data.clickable" :to="data.filepath" class="leaf-end">{{ data.title }}</NuxtLink>
                <span v-else class="leaf-end">{{ data.title }}</span>
              </div>
            </template>
          </el-tree>
          <button id="nav-close" @click="handleCloseNav">
            <fa :icon="['fa', 'circle-xmark']" class="nav-close-icon" font-style="normal" font-size="2rem" />
            <i class="el-icon-close"/>
          </button>
        </div>
      </div>
    </transition>
    <div class="wiki-content-parent">
      <NuxtPage/>
    </div>
    <FloatToolsBtn
      v-if="wikiFloatBox.enabled"
      :data="wikiFloatBox.data"
    >
      <template #back-to-top>
        <el-backtop/>
      </template>
    </FloatToolsBtn>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const route = useRoute()
const runtimeConfig = useRuntimeConfig()

const filterText = ref('')
const showNav = ref(false)
const mobileSize = 990
const navTree = ref()
const defaultProps = {
  children: 'children',
  label: 'title',
  id: 'id'
}

const wikiFloatBox = computed(() => runtimeConfig.public?.wikiFloatBox || { enabled: false, data: null })

const { data: navDocs } = await useAsyncData('wiki-nav-docs', async () => {
  const docs = await queryCollection('content').all()
  return docs
    .map((doc) => {
      const path = doc.path || doc._path || ''
      return {
        ...doc,
        path
      }
    })
    .filter((doc) => doc.path.startsWith('/wiki/') && doc.path !== '/wiki')
})

function buildTree(docs) {
  const rootNodes = []
  const nodeMap = new Map()

  function ensureNode(id, title, filepath, pid, clickable) {
    if (!nodeMap.has(id)) {
      nodeMap.set(id, {
        id,
        pid,
        title,
        filepath,
        clickable,
        children: []
      })
    }

    const node = nodeMap.get(id)
    if (clickable) {
      node.clickable = true
      node.title = title
      node.filepath = filepath
    }

    return node
  }

  for (const doc of docs || []) {
    const relative = doc.path.replace(/^\/wiki\//, '')
    if (!relative) continue

    const segments = relative.split('/').filter(Boolean)
    for (let i = 0; i < segments.length; i++) {
      const id = segments.slice(0, i + 1).join('/')
      const pid = i === 0 ? null : segments.slice(0, i).join('/')
      const filepath = `/wiki/${segments.slice(0, i + 1).join('/')}`
      const isLeaf = i === segments.length - 1
      const title = isLeaf ? (doc.title || segments[i]) : segments[i]

      ensureNode(id, title, filepath, pid, isLeaf)
    }
  }

  for (const node of nodeMap.values()) {
    if (!node.pid) {
      rootNodes.push(node)
      continue
    }

    const parent = nodeMap.get(node.pid)
    if (parent) parent.children.push(node)
  }

  return rootNodes
}

const treeData = computed(() => buildTree(navDocs.value || []))

const expandedKeys = computed(() => {
  const raw = route.params.slug
  if (!raw) return []

  const parts = Array.isArray(raw) ? raw : [raw]
  const keys = []
  for (let i = 0; i < parts.length; i++) {
    keys.push(parts.slice(0, i + 1).join('/'))
  }
  return keys
})

function filterNode(value, data) {
  if (!value) return true
  return (data.title || '').includes(value)
}

function setWikiContentVisible(visible) {
  const blocks = document.getElementsByClassName('wiki-content-parent')
  for (const block of blocks) {
    block.style.display = visible ? 'inherit' : 'none'
  }
}

function handleShowNav() {
  showNav.value = true
  setWikiContentVisible(false)
}

function handleCloseNav() {
  showNav.value = false
  setWikiContentVisible(true)
}

function handleResize() {
  showNav.value = true
  setWikiContentVisible(true)
}

function onResize() {
  setTimeout(() => {
    if (window.innerWidth > mobileSize) {
      handleResize()
      return
    }

    if (showNav.value) {
      scrollTo(0, 0)
      handleShowNav()
    }
  }, 400)
}

watch(filterText, (val) => {
  navTree.value?.filter(val)
})

watch(
  () => route.fullPath,
  async () => {
    await nextTick()
    if (route.path === '/wiki') {
      navTree.value?.store?.collapseAll?.()
    }
  }
)

onMounted(() => {
  window.addEventListener('resize', onResize)
  if (window.innerWidth > mobileSize) {
    handleResize()
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.25s ease-out, opacity 0.25s ease-out;
}

.slide-enter {
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

