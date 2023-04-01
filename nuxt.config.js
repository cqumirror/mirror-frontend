export default {
  // Target: https://go.nuxtjs.dev/config-target
  // target: 'static',
  target: 'static',
  ssr: false,
  server: {
    port: 3010, //线上端口
    host: '0.0.0.0'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-frontend',
    htmlAttrs: {
      lang: 'zh-CN'
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
    '@nuxtjs/pwa'
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
  pwa: {
    meta: {
      theme_color: '#1ccb4c',
    },
    manifest: {
      name: '重庆大学开源软件镜像站',
      lang: 'zh-CN',
      short_name: '重大镜像站',
      start_url: 'https://mirrors.cqu.edu.cn',
      theme_color: '#1ccb4c',
      description: '重庆大学开源软件镜像站，致力于为国内和校内用户提供高质量的开源软件镜像、Linux 镜像源服务，帮助用户更方便地获取开源软件。本镜像站由重庆大学蓝盟负责维护。',
      useWebmanifestExtension: false
    }
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
        {url:'https://net.cqu.edu.cn',desc: ' 重庆大学信息化办公室 '},
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
