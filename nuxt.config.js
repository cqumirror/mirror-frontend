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
  app: {
    head: {
      title: '重庆大学开源软件镜像站',
      htmlAttrs: {
        lang: ['zh-CN', 'en-US']
      },
      meta: [
        { charset: 'utf-8' },
        { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '重庆大学开源软件镜像站，致力于为国内和校内用户提供高质量的开源软件镜像、Linux 镜像源服务，帮助用户更方便地获取开源软件。本镜像站由重庆大学蓝盟负责维护。' },
        { name: 'keywords', content: '镜像站,镜像源,Linux,软件源,开源' },
        { name: 'author', content: 'Lanunion' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/static/favicon.png' }
      ]
    }
  },
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
    '@/plugins/font-awesome'
  ],
  components: true,
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    '@element-plus/nuxt',
    '@vite-pwa/nuxt'
  ],
  content: {
    markdown: {
      mdc: false,
      anchorLinks: false,
      remarkPlugins: {
        'remark-gfm': true,
        '../../utils/shortcode.js': { startBlock: '[[', endBlock: ']]' }
      }
    },
    highlight: {
      theme: 'nord',
      preload: ['bash', 'ini', 'vue', 'yaml']
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
  },
  pwa: {
    manifest: {
      name: '重庆大学开源软件镜像站',
      lang: 'zh-CN',
      short_name: '重大镜像站',
      start_url: 'https://mirrors.cqu.edu.cn',
      theme_color: '#ffffff',
      description: '重庆大学开源软件镜像站，致力于为国内和校内用户提供高质量的开源软件镜像、Linux 镜像源服务，帮助用户更方便地获取开源软件。本镜像站由重庆大学蓝盟负责维护。',
      useWebmanifestExtension: false
    }
  }
})
