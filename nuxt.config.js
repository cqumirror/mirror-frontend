import shiki from 'shiki';

export default defineNuxtConfig({
  compatibilityDate: '2026-04-11',

  // 使用 Vite 构建器（Nuxt 4 默认）
  builder: 'vite',

  // SSR 配置
  ssr: false,

  // Nitro 配置
  nitro: {
    preset: 'static',
    prerender: {
      routes: async () => {
        console.warn("generating routes")
        return []
      }
    }
  },

  // 开发服务器配置
  devServer: {
    port: 3000,
    host: '0.0.0.0'
  },

  // 应用配置
  app: {
    head: {
      title: '重庆大学开源软件镜像站',
      htmlAttrs: {
        lang: 'zh-CN'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '重庆大学开源软件镜像站，致力于为国内和校内用户提供高质量的开源软件镜像、Linux 镜像源服务，帮助用户更方便地获取开源软件。本镜像站由重庆大学蓝盟负责维护。' },
        { name: 'keywords', content: '镜像站,镜像源,Linux,软件源,开源'},
        { name: 'author', content: 'Lanunion' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/static/favicon.png' }
      ]
    }
  },

  // CSS 配置
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '@/assets/css/lib/fontawesome.min.css',
    '@/assets/css/fonts.css',
    '@/assets/css/global.scss',
    '@/assets/css/main.scss',
    'vue-final-modal/style.css'
  ],

  // 组件自动导入
  components: true,

  // 模块配置
  modules: [
    '@nuxt/content',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    '@vite-pwa/nuxt'
  ],

  // Content 模块配置
  content: {
    markdown: {
      remarkPlugins: [
        'remark-gfm',
        '@/utils/shortcode',
        '@/utils/expand'
      ],
      highlighter: 'shiki',
      shiki: {
        theme: 'nord'
      }
    },
    documentDriven: false
  },

  // Google Fonts 配置
  googleFonts: {
    families: {
      Roboto: true,
      Lato: [100, 300],
      'Noto+Sans+SC': true
    },
    display: 'swap',
    download: true,
    inject: true
  },

  // PWA 配置（使用 @vite-pwa/nuxt）
  pwa: {
    manifest: {
      name: '重庆大学开源软件镜像站',
      short_name: '重大镜像站',
      description: '重庆大学开源软件镜像站，致力于为国内和校内用户提供高质量的开源软件镜像、Linux 镜像源服务，帮助用户更方便地获取开源软件。本镜像站由重庆大学蓝盟负责维护。',
      theme_color: '#ffffff',
      lang: 'zh-CN',
      start_url: '/',
      display: 'standalone'
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}']
    }
  },

  // 运行时配置
  runtimeConfig: {
    public: {
      VERSION: process.env.VERSION || '1.0.0',
      baseURL: process.env.NODE_ENV === 'production' ? '/' : 'https://mirrors.cqu.edu.cn/',
      mirrorURL: process.env.NODE_ENV === 'production' ? '/' : 'https://mirrors.cqu.edu.cn/',
      baseLinkColor: '#1ccb4c',
      siteTitle: "重庆大学开源软件镜像站",
      exportUrls: [
        { url: 'https://mirrors.cqu.edu.cn/', desc: ' 解析ipv4和ipv6 ' },
        { url: 'http://mirrors.cqu.edu.cn/', desc: ' 解析ipv4和ipv6 ' }
      ],
      contactUrls: [
        { url: 'https://github.com/cqumirror/feedback', desc: '' }
      ],
      siteLinks: {
        enabled: true,
        links: [
          { url: '/wiki', desc: ' 使用帮助 ' },
          { url: '/status', desc: ' 服务器状态 ' },
          { url: '/news', desc: ' 新闻公告 ' },
          { url: 'https://net.cqu.edu.cn', desc: ' 重庆大学信息化办公室 ' },
          { url: 'http://lanunion.cqu.edu.cn/', desc: ' 重大蓝盟 ' }
        ]
      },
      newsPage: {
        pageSize: 10
      },
      indexFloatBox: {
        enabled: false,
        data: [
          {
            label: '回到\n旧版',
            tooltip: '回到旧版首页',
            goto: '/old-frontend'
          }
        ]
      },
      wikiFloatBox: {
        enabled: false,
        data: [
          {
            label: '回到\n旧版',
            tooltip: '回到旧版WIKI页面',
            goto: '/hugo-wiki'
          }
        ]
      },
      whiteListDomain: [
        'mirrors.cqu.edu.cn'
      ]
    }
  },

  // Vite 配置
  vite: {
    // 自定义 Vite 插件
    plugins: [],
    // 优化依赖
    optimizeDeps: {
      include: [
        'element-plus',
        'vue-scrollto', // CJS
        'clipboard', // CJS
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/vue-fontawesome',
        '@fortawesome/free-solid-svg-icons',
        '@fortawesome/free-regular-svg-icons',
        '@fortawesome/free-brands-svg-icons',
        'vue-final-modal',
        '@vue/devtools-kit',
        '@vue/devtools-core',
        '@fancyapps/ui',
      ]
    },
    // 构建选项
    build: {
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            'element-plus': ['element-plus'],
            'vendor': ['vue', 'vue-router', 'pinia']
          }
        }
      }
    }
  },

  // 构建前运行自定义代码
  hooks: {
    'build:before': () => {
      console.log('在构建前运行自定义代码')
    },
    'dev:before': () => {
      console.log('在开发模式运行自定义代码')
    }
  },

  // 性能优化
  performance: {
    gzip: true,
    prefetch: false,
    preload: false
  },

  // 实验性功能
  experimental: {
    payloadExtraction: false
  },

  // 路由配置
  router: {
    options: {
      strict: false
    }
  },

  // 类型检查
  typescript: {
    strict: false,
    typeCheck: false
  }
})
