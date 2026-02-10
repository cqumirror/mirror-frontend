import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'node:url'

// 获取项目根目录的正确 ESM 路径
const __dirname = fileURLToPath(new URL('.', import.meta.url))
const isDev = process.env.NODE_ENV === 'development'

// 递归获取 Content 路由 (用于 Nitro 预渲染)
async function listContentRoutes(directory: string, prefix = '/') {
  try {
    const entries = await fs.readdir(directory, { withFileTypes: true })
    const files = entries.filter(entry => entry.name.toLowerCase().endsWith('.md'))
    const directories = entries.filter(entry => entry.isDirectory())

    let routes = files.map(f => (prefix + f.name.toLowerCase().replace(/\.md$/, '')).replace(/\/_index/, ''))

    for (const d of directories) {
      const subRoutes = await listContentRoutes(path.join(directory, d.name), `${prefix}${d.name}/`)
      routes = routes.concat(subRoutes)
    }
    return routes
  } catch (e) {
    return []
  }
}

export default defineNuxtConfig({


  // 1. 基础应用配置
  app: {
    head: {
      title: '重庆大学开源软件镜像站',
      htmlAttrs: { lang: 'zh-CN' },
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

  // 2. 核心模式设置
  ssr: false,

  // 3. 开发服务器配置
  devServer: {
    port: 3010,
    host: '0.0.0.0'
  },

  // 4. Vite 优化
  vite: {
    server: {
          hmr: {
            protocol: 'ws',
            clientPort: 3010,
          }
        },
    optimizeDeps: {
      include: [
        'vue',
        'element-plus',
        '@fortawesome/fontawesome-svg-core',
        'vuedraggable'
      ]
    },
  },

  // 5. 模块配置
  modules: [
    '@nuxt/content',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    '@element-plus/nuxt',
    '@vite-pwa/nuxt'
  ],

  // 6. 样式与资源
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '@/assets/css/main.scss'
  ],

  // 7. Nuxt Content v2 配置
  content: {
    markdown: {
      mdc: false,
      anchorLinks: false,
      remarkPlugins: {
        'remark-gfm': true,
        // 使用绝对路径加载自定义插件
        [path.resolve(__dirname, 'utils/shortcode.js')]: { startBlock: '[[', endBlock: ']]' }
      }
    },
    highlight: {
      theme: 'nord',
      preload: ['bash', 'ini', 'vue', 'yaml']
    }
  },

  // 8. 路由与 Nitro 钩子
  hooks: {
    async 'nitro:config'(nitroConfig) {
      if (nitroConfig.prerender) {
        const routes = await listContentRoutes(path.join(__dirname, 'content'))
        nitroConfig.prerender.routes = nitroConfig.prerender.routes || []
        nitroConfig.prerender.routes.push(...routes)
      }
    }
  },

  // 9. PWA 配置
  pwa: {
    disable: isDev,
    registerType: 'autoUpdate',
    manifest: {
      name: '重庆大学开源软件镜像站',
      lang: 'zh-CN',
      short_name: '重大镜像站',
      start_url: 'https://mirrors.cqu.edu.cn',
      theme_color: '#ffffff',
      description: '重庆大学开源软件镜像站，致力于为国内和校内用户提供高质量的开源软件镜像、Linux 镜像源服务，帮助用户更方便地获取开源软件。本镜像站由重庆大学蓝盟负责维护。',
      useWebmanifestExtension: false
    },
    workbox: {
      // 建议：开发环境下关闭拦截，防止缓存旧的构建文件
      disable: process.env.NODE_ENV === 'development',
      runtimeCaching: [
        {
          urlPattern: ({ request }) => request.mode === 'navigate',
          handler: 'NetworkFirst'
        }
      ]
    }
  },

  // 10. 自动导入配置
  components: true,
  devtools: { enabled: true }
})
