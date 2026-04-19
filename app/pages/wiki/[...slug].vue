<template>
  <div class="wiki-content-container-parent">
    <h1>{{ article?.title }}</h1>
    <div class="wiki-content-container">
      <article id="md-content" class="wiki-page-content" @click="imgProxy">
        <ContentRenderer v-if="article" :value="article" class="nuxt-content" />
      </article>
      <aside v-if="tocLinks.length > 0" class="wiki-content-toc">
        <div class="wiki-toc">
          <h2 class="wiki-toc-title">目录</h2>
          <nav class="wiki-toc-nav">
            <ul>
              <li
                v-for="link in tocLinks"
                :key="link.id"
                class="toc-list"
              >
                <a
                  role="button"
                  :href="`#${link.id}`"
                  @click.prevent="handleScrollTo(link.id)"
                >
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
import { Fancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css'
import { computed, createApp, nextTick, watch } from 'vue'
import ClipboardBtn from '@/components/ClipboardBtn.vue'

const route = useRoute()

const slugPath = computed(() => {
  const slug = route.params.slug
  const parts = Array.isArray(slug) ? slug : [slug]
  return parts.filter(Boolean).join('/')
})

const { data: article } = await useAsyncData(
  () => `wiki-${slugPath.value}`,
  async () => {
    if (!slugPath.value) {
      throw createError({ statusCode: 404, statusMessage: 'Page not found' })
    }

    const doc = await queryCollection('content').path(`/wiki/${slugPath.value}`).first()
    if (!doc) {
      throw createError({ statusCode: 404, statusMessage: 'Page not found' })
    }

    return doc
  },
  { watch: [slugPath] }
)

const tocLinks = computed(() => {
  return article.value?.body?.toc?.links || article.value?.toc || []
})

function handleScrollTo(id) {
  const target = document.getElementById(id)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function imgProxy(e) {
  const element = {
    url: e.target.src,
    tag: e.target.tagName.toLowerCase()
  }
  if (element.tag === 'img') {
    Fancybox.show([{ src: element.url }], {})
  }
}

function addChild(className) {
  const blocks = document.getElementsByClassName(className)
  for (const block of blocks) {
    const hasCode = block.querySelector('.shiki') || block.querySelector('pre code')
    if (!hasCode) continue
    if (block.querySelector('.copy-btn')) continue

    const mountNode = document.createElement('div')
    block.appendChild(mountNode)
    createApp(ClipboardBtn).mount(mountNode)
  }
}

function decodeUrlString(encodedString) {
  return decodeURIComponent(encodedString.replace(/\+/g, ' '))
}

watch(
  article,
  async () => {
    await nextTick()
    addChild('nuxt-content-highlight')

    if (route.hash) {
      const id = decodeUrlString(route.hash).replace('#', '')
      handleScrollTo(id)
    }
  },
  { immediate: true }
)
</script>

<style scoped>
</style>

