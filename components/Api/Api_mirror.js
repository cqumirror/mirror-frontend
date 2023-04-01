import Vue from 'vue'

const prefix = 'https://mirrors.cqu.edu.cn'

export default {
  getMirror: params => {
    return (prefix + "/static/tunasync.json")
  },
  getIsoList: params => {
    return (prefix + "/static/isoinfo.json")
  },
}
