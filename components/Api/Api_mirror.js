import Vue from 'vue'

const prefix = process.env.baseURL + "/static/tunasync.json"

export default {
  getMirror: params => {
    return prefix
  }
}
