import shiki from 'shiki'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devServer: {
    port: 3010,
    host: '0.0.0.0'
  },
  generate: {
    async routes() {
      console.warn('generating routes')
      const { $content } = require('@nuxt/content')

      const blogRoutes = await $content('wiki', { deep: true }).only(['slug', 'path']).fetch()
        .then(files => {
          return files.map(file => `/wiki/${file.slug}`)
        })

      const newsRoutes = await $content('news', { deep: true }).only(['slug']).fetch()
        .then(files => {
          return files.map(file => file.path.replace('/_index', ''))
        })

      return [...blogRoutes, ...newsRoutes]
    }
  },
  router: {
    options: {
      hashMode: true
    }
  },
  hooks: {
    'generate:page': page => {
      // 解决 nuxt 不尊重 metadata 的问题
      page.html = page.html.replace(/ data-n-head=".*?"/gi, '').replace(/ data-hid=".*?"/gi, '')
    }
  },
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '@/assets/css/lib/fontawesome.min.css',
    // 'element-ui/lib/theme-chalk/index.css',
    '@/assets/css/lib/fontawesome.min.css',
    '@/assets/css/fonts.css',
    '@/assets/css/main.scss'
  ],
  plugins: [
    '@/plugins/element-plus',
    '@/plugins/font-awesome',
    '@/plugins/vue-scrollto',
    '@/plugins/clipboard-js'
  ],
  components: true,
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt'
  ],
  content: {
    markdown: {
      remarkPlugins: [
        ['remark-gfm'],
        ['@/utils/shortcode', { startBlock: '[[', endBlock: ']]' }],
        ['@/utils/expand']
      ],
      async highlighter() {
        const highlighter = await shiki.getHighlighter({
          // Complete themes: https://github.com/shikijs/shiki/tree/master/packages/themes
          theme: 'nord'
        })
        return (rawCode, lang) => {
          return highlighter.codeToHtml(rawCode, lang)
        }
      }
    },
    liveEdit: false
  },
  googleFonts: {
    families: {
      Roboto: true,
      Lato: [100, 300],
      'Noto+Sans+SC': true
    },
    display: 'swap',
    useStylesheet: true,
    download: true,
    base64: false,
    inject: true,
    overwriting: false,
    outputDir: '@/assets',
    stylePath: 'css/fonts.css',
    fontsPath: '@/assets/fonts'
  },
  build: {
    transpile: [/^element-ui/],
    // enable babelrc
    babelrc: true,
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        // 在开发模式下运行自定义代码
        console.log('运行自定义代码')
      }

      // 在构建前运行自定义代码
      config.plugins.push({
        apply: (compiler) => {
          compiler.hooks.beforeCompile.tap('MyPlugin', () => {
            console.log('在构建前运行自定义代码')
          })
        }
      })
    }
  }
})
