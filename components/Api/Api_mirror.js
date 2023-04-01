import Vue from 'vue'

const prefix = process.env.baseURL

export default {
  getMirror: params => {
    return (prefix + "/static/tunasync.json")
  },
  getIsoList: params => {
    return (prefix + "/static/isoinfo.json")
  },
  getNotices: params => {
    return (prefix + "/static/notice.json")
  }
}
