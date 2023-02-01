import Vue from 'vue'

const prefix = '/api' + "/static/tunasync.json"

export default {
  getMirror: params => {
    return prefix
  }
}
