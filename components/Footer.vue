<template>
  <div class="mirror-footer">
    <div class="mirror-footer-content" >
      <el-row :gutter="5">
        <el-col :span="12" :offset="2">
      <span>
        <el-row>
          <el-col>
            本站在重庆大学信息化办公室的支持下创办，由重庆大学蓝盟运行维护。
            <br/>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            本站镜像同步工具 fork 自清华大学 TUNA 协会的 镜像管理器 项目。网页项目使用 Nuxt.js 构建。
          </el-col>
        </el-row>
      </span>
        </el-col>
        <el-col :span="6" :offset="2">
      <span>
        <b>Contact Us:</b>
        <ul>
          <li>
            <fa :icon="['fas','envelope']"/>{{ "\xa0" }}Mailing List
          </li>
          <li>
            <fa :icon="['fab','github']"/>{{ "\xa0" }}Github
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
