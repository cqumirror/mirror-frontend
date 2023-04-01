<template>
  <el-container id="mirror-list">
    <el-main v-loading="fullscreenLoading">
      <h3><fa :icon="['fas','layer-group']" style="margin-right: 1vw"/>镜像列表</h3>
      <el-table
        :data="listData"
        style="width: 100%"
        :row-style="{height:0+'px'}"
        :cell-style="{padding:5+'px'}"
        :row-class-name="tableRowClassName">
        <template v-for="item in listCol">
          <template v-if="!item.hidden">
            <template v-if="item.width">
              <el-table-column
                v-if="item.prop==='tag'"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
              >
                <template slot-scope="scope">
                  <el-tag :type="scope.row.tag" size="mini"
                  >
                    {{ scope.row.status }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column
                v-else
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
              />
            </template>
            <el-table-column
              v-else
              min-width="170"
              :prop="item.prop"
              :label="item.label"
            ><template slot-scope="scope">
              <a class="mirror-href" :href="mirror_url + scope.row.name">{{ scope.row.name }}</a>
            </template>
            </el-table-column>
          </template>
        </template>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import Api_mirror from "@/components/Api/Api_mirror";

export default {
  name: "Mirrorlist",
  computed: {
    scoped() {
      return scoped
    }
  },
  data() {
    return {
      listCol: [
        {
          prop: 'name',
          label: 'Name',
          hidden: false,
        },
        {
          prop: 'lastUpdate',
          label: 'Last Update',
          width: '160',
          hidden: false,
        },
        {
          prop: 'status',
          label: 'Status',
          width: '60',
          hidden: true,
        },
        {
          prop: 'tag',
          label: 'Status',
          width: '100',
          hidden: false,
        }
      ],
      tagList: {
        syncing: '',
        success: 'success',
        paused: 'warning',
        failed: 'danger',
      },
      listData: [],
      fullscreenLoading: false,
      mirror_url: process.env.mirrorURL,

      timer: {},
      onCreated: true,
    }
  },
  created() {
    this.init()
    this.onCreated = false
    this.timer = setInterval(this.init,30000)
    // this.init()
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
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
        await fetch(Api_mirror.getMirror()).then(res => res.json()).
        then(data => {
          this.generateList(data)
          this.ifAddLoading()
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
          status: item.status,
          tag: this.tagList[item.status]
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

.el-tag--mini /deep/ {
  height: 23px !important;
  width: 55px;
  text-align: center;
}

.el-table::before {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}

.el-table /deep/ .el-table__cell {
  border-bottom: 0px solid transparent !important;
}

.el-table /deep/ tbody tr:hover>td {
  background-color: #00000000;
}
.el-table /deep/ .pending-row {
  background: #FFF4E3;
}

.el-table /deep/ .error-row {
  background: #ffd9cb;
}

.el-table /deep/ .syncing-row {
  background: #E3FFFD;
}

.el-table /deep/ .success-row {
  background: #FFFFFF;
}

.mirror-href {
  color: #1ccb4c;
  text-decoration: none;
}

</style>
