import shiki from 'shiki';
export default {
  // Target: https://go.nuxtjs.dev/config-target
  // target: 'static',
  target: 'static',
  ssr: false,
  // loading indicator options
  loadingIndicator: {
    name: '@/template/indicator.html',
    color: '#3ab499',
    background: 'white'
  },
  server: {
    port: 3010, //线上端口
    host: '0.0.0.0'
  },
  generate: {
    async routes() {
      console.warn("generating routes")
      const { $content } = require('@nuxt/content')

      const blogRoutes = await $content('wiki',{ deep: true }).only(['slug','path']).fetch()
        .then(files => {
          return files.map(file => `/wiki/${file.slug}`)
        })

      const newsRoutes = await $content('news',{deep: true}).only(['slug']).fetch()
        .then(files => {
          return files.map(file => file.path.replace('/_index',''))
        })

      return [...blogRoutes, ...newsRoutes]
    }
  },
  router: {
    trailingSlash: false,
    mode: 'hash'
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '重庆大学开源软件镜像站',
    htmlAttrs: {
      lang: ['zh-CN','en-US']
    },
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: '重庆大学开源软件镜像站，致力于为国内和校内用户提供高质量的开源软件镜像、Linux 镜像源服务，帮助用户更方便地获取开源软件。本镜像站由重庆大学蓝盟负责维护。' },
      { name: 'keywords', content: '镜像站,镜像源,Linux,软件源,开源'},
      { name: 'author', content: 'Lanunion' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/static/favicon.png' }
    ]
  },
  hooks: {
    'generate:page': page => {
      // 解决 nuxt 不尊重 metadata 的问题
      page.html = page.html.replace(/ data-n-head=".*?"/gi, '').replace(/ data-hid=".*?"/gi, '')

    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '@/assets/css/lib/fontawesome.min.css',
    // 'element-ui/lib/theme-chalk/index.css',
    '@/assets/css/lib/fontawesome.min.css',
    '@/assets/css/fonts.css',
    '@/assets/css/global.scss',
    '@/assets/css/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/font-awesome',
    '@/plugins/vue-scrollto',
    '@/plugins/clipboard-js',
    '@/plugins/vue-modal'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/pwa'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-compress',
    '@nuxtjs/axios',
    '@nuxt/content',
    '@nuxtjs/google-fonts'
  ],
  // module configs
  axios: {
    proxy: false,
    baseURL: process.env.baseURL,
    proxyHeaders: false,
    credentials: false
  },
  content: {
    markdown: {
      remarkPlugins: [
        ['remark-gfm'],
        ['@/utils/shortcode', {startBlock: "[[",endBlock: "]]"}],
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
    liveEdit: false,
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
  pwa: {
    meta: {
      theme_color: '#ffffff',
    },
    manifest: {
      name: '重庆大学开源软件镜像站',
      lang: 'zh-CN',
      short_name: '重大镜像站',
      start_url: 'https://mirrors.cqu.edu.cn',
      theme_color: '#ffffff',
      description: '重庆大学开源软件镜像站，致力于为国内和校内用户提供高质量的开源软件镜像、Linux 镜像源服务，帮助用户更方便地获取开源软件。本镜像站由重庆大学蓝盟负责维护。',
      useWebmanifestExtension: false
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
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
}


