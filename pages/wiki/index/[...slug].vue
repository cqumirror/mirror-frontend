<template>
  <div v-if="article" class="wiki-content-container-parent">
    <h1>{{ article.title }}</h1>
    <div class="wiki-content-container">
      <article id="md-content" class="wiki-page-content" @click="imgProxy">
        <ContentRenderer ref="nuxtContent" :value="article" />
      </article>
      <aside class="wiki-content-toc" v-if="article.body.toc.links.length > 0">
        <div class="wiki-toc">
          <h2 class="wiki-toc-title">目录</h2>
          <nav class="wiki-toc-nav">
            <ul>
              <li class="toc-list" v-for="link of article.body.toc.links" :key="link.id">
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
import { h, render } from 'vue'
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
      article.value = data.find(item => item._path === `/wiki/${slug.join('/')}/_index`)
      if (!article.value) {
        showError({
          statusCode: 404,
          message: 'Page not found'
        })
      }
    }
  } catch (e) {
    console.error(e)
  }
}

function addChild(selector) {
  const codeEls = document.querySelectorAll(selector)
  for (const codeEl of codeEls) {
    const copyBtn = codeEl.querySelector('.copy-btn')
    if (!copyBtn) {
      render(h(ClipboardBtn), codeEl)
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

function handleScrollTo(id) {
  document.querySelector('#' + id).scrollIntoView({
    behavior: 'smooth'
  })
}

watch(route, async () => {
  loaded.value = false
  await fetchData()
  updated()
}, { deep: true, immediate: true })
</script>
