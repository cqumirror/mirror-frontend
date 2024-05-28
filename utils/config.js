export default {
  VERSION: 'VERSION-TO-MANAGE',
  baseURL: (process.env.NODE_ENV === 'production' ? '' : 'https://mirrors.cqu.edu.cn/'),
  // baseURL: 'https://mirrors.cqu.edu.cn/',
  mirrorURL: (process.env.NODE_ENV === 'production' ? '/' : 'https://mirrors.cqu.edu.cn/'),
  // mirrorURL: 'https://mirrors.cqu.edu.cn/',
  baseLinkColor: '#1ccb4c',
  siteTitle: '重庆大学开源软件镜像站',
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
      { url: '/#/wiki', desc: ' 使用帮助 ' },
      { url: '/#/status', desc: ' 服务器状态 ' },
      { url: '/#/news', desc: ' 新闻公告 ' },
      { url: 'https://net.cqu.edu.cn', desc: ' 重庆大学信息化办公室 ' },
      { url: 'http://lanunion.cqu.edu.cn/', desc: ' 重大蓝盟 ' }
    ]
  },
  newsPage: {
    pageSize: 10
  },
  indexFloatBox: {
    enabled: true,
    data: [
      {
        label: '回到\n旧版',
        tooltip: '回到旧版首页',
        goto: '/old-frontend'
      }
    ]
  },
  wikiFloatBox: {
    enabled: true,
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
