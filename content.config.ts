// content.config.ts
import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    // 'content' 是集合的名称，您可以自定义
    content: defineCollection({
      type: 'page', // 'page' 类型表示一个文件对应一个页面路由
      source: '**/*.md', // 匹配 content/ 目录下的所有 .md 文件
    })
  }
})
