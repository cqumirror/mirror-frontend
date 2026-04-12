const config = useRuntimeConfig()
const prefix = config.public.baseURL || ''

export default {
  getMirror: params => {
    return (prefix + "/static/tunasync.json")
  },
  getIsoList: params => {
    return (prefix + "/static/isoinfo.json")
  },
  getNotices: params => {
    return (prefix + "/static/notice.json")
  },
  getBaseurl: params => {
    return prefix
  }
}
