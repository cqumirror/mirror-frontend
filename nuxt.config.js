export default {
  // Target: https://go.nuxtjs.dev/config-target
  // target: 'static',
  target: 'server',
  // ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-frontend',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    'element-ui/lib/theme-chalk/index.css'
    // '@/assets/css/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/font-awesome'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxt/content'
  ],
  // module configs
  proxy: {
    '/api': {
      target: 'https://mirrors.cqu.edu.cn',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  },
  axios: {
    proxy: true,
    baseURL: process.env.baseURL,
    proxyHeaders: false,
    credentials: false
  },
  content: {
    markdown: {
      remarkPlugins: [
        ['remark-gfm'],
        ['@/utils/shortcode', {startBlock: "[[",endBlock: "]]"}]
      ]
    }
  },
  env: {
    baseURL: (process.env.NODE_ENV === 'production' ? 'https://mirrors.cqu.edu.cn' : 'http://localhost:3000'),
    mirrorURL: "https://mirrors.cqu.edu.cn/",
    baseLinkColor: '#1ccb4c'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  }
}
