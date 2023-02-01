<template>
  <el-container>
    <el-main v-loading="fullscreenLoading">
      <el-table
        :data="listData"
        style="width: 100%"
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
                  <el-tag :type="scope.row.tag"
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
              :prop="item.prop"
              :label="item.label"
            />
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
          width: '220',
          hidden: false,
        },
        {
          prop: 'status',
          label: 'Status',
          width: '100',
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
      fullscreenLoading: false
    }
  },
  created() {
    this.init()
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
      this.fullscreenLoading = true
      await this.$axios.get(Api_mirror.getMirror()).then(res => {
        console.log(res.data)
        this.generateList(res.data)
        this.fullscreenLoading = false
      }).catch(err => {
        console.log(err)
        this.fullscreenLoading = false
        // TODO add error message
      })
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
      data.forEach(item => {
        this.listData.push({
          name: item.name,
          lastUpdate: item['last_update'],
          status: item.status,
          tag: this.tagList[item.status]
        })
      })
    },
  },
}
</script>

<style scoped>
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
</style>
