<template>
  <div id="status-container" v-loading="fullscreenLoading">
    <keep-alive>
      <table class="status-table">
      <tbody>
      <tr>
        <th class="status-list">Name</th>
        <th class="status-list">Last Update</th>
        <th class="status-list">Upstream</th>
        <th class="status-list">Status</th>
        <th class="status-list">Size</th>
      </tr>
      <template v-for="item of listData">
        <tr :class="item.className">
          <td class="status-list status-list-data">{{ item.name }}</td>
          <td class="status-list status-list-data">{{ item.lastUpdate }}</td>
          <td class="status-list status-list-data">{{ item.upStream }}</td>
          <td class="status-list status-list-data">{{ item.status }}</td>
          <td class="status-list status-list-data">{{ item.size }}</td>
        </tr>
      </template>
      </tbody>
    </table>
    </keep-alive>
  </div>
</template>

<script>
import Api_mirror from "@/components/Api/Api_mirror";
import cacheControl from "~/middleware/cacheControl";
// import "@/assets/css/main.scss"

export default {
  name: "Statuslist",
  middleware: cacheControl({
    'max-age': 600,
    'stale-when-revalidate': 5
  }),
  computed: {
    scoped() {
      return scoped
    }
  },
  data() {
    return {
      tagList: {
        syncing: '',
        success: 'success',
        paused: 'warning',
        failed: 'danger',
      },
      listData: [],
      fullscreenLoading: false,
      timer: {},
      onCreated: true,
    }
  },
  created() {
    this.init()
    this.onCreated = false
    this.timer = setInterval(this.init,30000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    tableRowClassName(row) {
      // change table color
      if (row.status === 'syncing') {
        return 'syncing-row'
      } else if (row.status === 'success') {
        return 'success-row'
      } else if (row.status === 'failed') {
        return 'error-row'
      } else if (row.status === 'paused') {
        return 'pending-row'
      }
      return ''
    },
    async init() {
      if (typeof window === 'object') {
        this.ifAddLoading()
        await fetch(Api_mirror.getMirror()).then(data => data.json()).then(res => {
          this.generateList(res)
          this.ifAddLoading()
        }).catch(err => {
          console.log(err)
          this.ifAddLoading()
          // TODO add error message
        })
      }
    },
    ifAddLoading() {
      if (this.onCreated) {
        this.fullscreenLoading = !this.fullscreenLoading
      } else {
        this.fullscreenLoading = false
      }
    },
    generateList(data) {
      // sort by names
      data.sort(function(s, t) {
        let a = s.name.toLowerCase();
        let b = t.name.toLowerCase();
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      })
      // generate table data
      let listData = []
      data.forEach(item => {
        listData.push({
          name: item.name,
          lastUpdate: this.timeConvert(item['last_update']),
          upStream: item.upstream,
          size: item.size,
          status: item.status,
          className: this.tableRowClassName(item)
        })
      })
      this.listData = JSON.parse(JSON.stringify(listData))
    },
    timeConvert(timeStr) {
      const splitStr = timeStr.split(" ")
      const d = splitStr[0].split("-")
      const t = splitStr[1].split(":")
      const UTCDate = new Date(Date.UTC(d[0],d[1]-1,d[2],t[0]-8,t[1],t[2]))
      const clientTimezone = new Intl.DateTimeFormat().resolvedOptions().timeZone
      const options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: false,
        timeZone: clientTimezone
      };
      const timeObject = new Intl.DateTimeFormat(
        navigator.language,
        options
      ).format(UTCDate)
      return timeObject.toString()
    },
  },
}
</script>
<style scoped>
</style>
