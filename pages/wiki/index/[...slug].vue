<template>
  <div v-if="article" class="wiki-content-container-parent">
    <h1>{{ article.title }}</h1>
    <div class="wiki-content-container">
      <article id="md-content" class="wiki-page-content" @click="imgProxy">
        <ContentRenderer ref="nuxtContent" :value="article" />
      </article>
      <aside class="wiki-content-toc" v-if="article.toc && article.toc.length > 0">
        <div class="wiki-toc">
          <h2 class="wiki-toc-title">目录</h2>
          <nav class="wiki-toc-nav">
            <ul>
              <li class="toc-list" v-for="link of article.toc" :key="link.id">
                <a role="button" class="" :href="`/#${$route.fullPath}#${link.id}`"
                  @click.prevent="handleScrollTo(link.id)">
                  {{ link.text }}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  </div>
</template>
<script setup>
import ClipboardBtn from '@/components/ClipboardBtn.vue'

import { Fancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css'

const loaded = ref(false)

function imgProxy(e) {
  const element = {
    name: e.target.alt,
    url: e.target.src,
    tag: e.target.tagName.toLowerCase()
  }
  if (element.tag === 'img') {
    Fancybox.show([{ src: element.url }], {})
  }
}

const route = useRoute()
function decodeUrlString(encodedString) {
  return decodeURIComponent(encodedString.replace(/\+/g, ' '))
}

const article = ref(null)
async function fetchData() {
  const { slug } = route.params
  try {
    let { data } = await useAsyncData('wiki/' + slug.join('/'), () => queryContent('wiki', ...slug).find())
    data = unref(data)
    if (data.length === 1) {
      article.value = data[0]
    } else {
      const index = data.findIndex((item) => item._path.split('/').pop() === '_index')
      article.value = data[index]
    }
  } catch (e) {
    console.error(e)
  }
}

function addChild(className) {
  // 这段肯定是有bug的。会向shortcode block 插入复制按钮，未知原因，原生vue无法复现，可能是框架bug
  const blocks = document.getElementsByClassName(className)
  for (const block of blocks) {
    const codeEl = block.querySelector('.shiki')
    if (codeEl) {
      debugger
      const copyBtn = block.querySelector('.copy-btn')
      if (!copyBtn) {
        const CopyButton = ClipboardBtn
        const component = new CopyButton().$mount()
        block.appendChild(component.$el)
      }
    }
  }
}

function updated() {
  if (!loaded.value) {
    setTimeout(() => {
      addChild('pre.shiki')
      loaded.value = true
      if (route.hash) {
        const id = decodeUrlString(route.hash)
        handleScrollTo(id.replace('#', ''))
      }
    }, 450)
  }
}
watch(route, async () => {
  loaded.value = false
  await fetchData()
  updated()
}, { deep: true, immediate: true })
</script>
<script>
export default {
  methods: {
    handleScrollTo(id) {
      this.$scrollTo('#' + id)
    }
  }
}
</script>
