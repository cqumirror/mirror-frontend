import config from '../../utils/config'

const prefix = config.baseURL

export default {
  getMirror: (params) => {
    return prefix + '/static/tunasync.json'
  },
  getIsoList: (params) => {
    return prefix + '/static/isoinfo.json'
  },
  getNotices: (params) => {
    return prefix + '/static/notice.json'
  },
  getBaseurl: params => {
    return prefix
  }
}
