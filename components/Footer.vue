<template>
  <div class="mirror-footer">
    <div class="mirror-footer-content" >
      <el-row :gutter="2">
        <el-col :span="12" :offset="3">
      <span>
        <el-row>
          <el-col>
            本站在<a style="text-decoration: none;color: white" href="http://net.cqu.edu.cn/" target="_blank"><b>重庆大学
            信息化办公室</b></a>的支持下创办，由<a style="text-decoration: none;color: white" href="http://lanunion.cqu.edu.cn/" target="_blank"><b>重庆大学蓝盟</b></a>运营维护。
            <br/>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            本站镜像同步工具 fork 自清华大学 TUNA 协会的
            <a style="text-decoration: none;color: white" href="https://github.com/tuna/tunasync" target="_blank"><b>
              <em>镜像管理器</em></b></a> 项目。
            <a style="text-decoration: none;color: white" href="https://github.com/cqumirror/mirror-frontend" target="_blank">
              <b><em>镜像站前端</em></b> 基于<b>NuxtJS</b>自行构建。
            </a>
          </el-col>
        </el-row>
      </span>
        </el-col>
        <el-col :span="8" :offset="1">
      <span>
        <b>Contact Us:</b>
        <ul>
          <li>
            <fa :icon="['fas','envelope']"/>{{ "\xa0" }}<a href="mailto:cqumirror@gmail.com"style="text-decoration: none;color: white;"> Mail</a>
          </li>
          <li>
            <fa :icon="['fab','github']"/>{{ "\xa0" }}<a style="text-decoration: none;color: white" href="https://github.com/cqumirror/feedback">Github</a>
          </li>
        </ul>
      </span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
.mirror-footer {
  background-color: #384452;
  color: #f0ffff;
  display: flex;
}

.mirror-footer-content {
  margin: 6vh 4vw;
}

</style>
