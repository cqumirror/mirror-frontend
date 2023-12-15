import shiki from 'shiki'
import fs from 'fs/promises'
import path from 'path'
// https://nuxt.com/docs/api/configuration/nuxt-config

async function listContentRoutes(directory, prefix = '/') {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  const files = entries.filter(entry => entry.name.toLocaleLowerCase().endsWith('.md'))
  const directories = entries.filter(entry => entry.isDirectory())

  let routes = files.map(f => (prefix + f.name.toLocaleLowerCase().replace(/\.md$/, '')).replace(/\/_index/, ''))
  routes = routes.concat(...await Promise.all(directories.map(d => listContentRoutes(path.join(directory, d.name), `${prefix}${d.name}/`))))
  return routes
}

export default defineNuxtConfig({
  ssr: false,
  devServer: {
    port: 3010,
    host: '0.0.0.0'
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
    },
    async 'nitro:config'(nitroConfig) {
      nitroConfig.prerender.routes.push(...await listContentRoutes(path.join(__dirname, 'content')))
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
    '@/plugins/font-awesome',
    '@/plugins/vue-scrollto',
    '@/plugins/clipboard-js'
  ],
  components: true,
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    '@element-plus/nuxt'
  ],
  content: {
    markdown: {
      remarkPlugins: {
        'remark-gfm': true
      },
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
