export default {
  // Target: https://go.nuxtjs.dev/config-target
  // target: 'static',
  target: 'server',
  server: {
    port: 3010, //线上端口
    host: '0.0.0.0'
  },

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
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/css/lib/fontawesome.min.css',
    '@/assets/css/fonts.css',
    '@/assets/css/global.scss'
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
    '@nuxt/content',
    '@nuxtjs/google-fonts'
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
  env: {
    baseURL: (process.env.NODE_ENV === 'production' ? 'https://mirrors.cqu.edu.cn/' : 'http://localhost:3000'),
    mirrorURL: (process.env.NODE_ENV === 'production' ? '/' : 'https://mirrors.cqu.edu.cn/'),
    baseLinkColor: '#1ccb4c',
    siteTitle: "重庆大学开源软件镜像站",
    exportUrls: [
      {url:'https://mirrors.cqu.edu.cn/',desc:' 只解析ipv4 '},
      {url:'http://mirrors.cqu.edu.cn/',desc:' 只解析ipv4 '}
    ],
    contactUrls: [
      {url:'https://github.com/cqumirror/feedback',desc:''}
    ],
    siteLinks: {
      enabled: true,
      links: [
        {url:'/wiki',desc:' 使用帮助 '},
        {url:'/status',desc:' 服务器状态 '},
        {url:'/news',desc: ' 新闻公告 '},
        {url:'http://lanunion.cqu.edu.cn/',desc:' 重大蓝盟 '}
      ]
    },
    newsPage: {
      pageSize: 10
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  }
}
