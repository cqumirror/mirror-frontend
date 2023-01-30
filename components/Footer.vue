<template>
  <div class="mirror-footer">
    <el-row :gutter="5" style="margin:0;padding:0;">
      <el-col :span="6" :offset="2">
      <span>
      本站在重庆大学信息化办公室的支持下创办，由重庆大学蓝盟运行维护。
      本站的主页和镜像同步工具分别 fork 自清华大学 TUNA 协会的 镜像管理器 项目和 镜像站网页 项目。
      </span>
      </el-col>
      <el-col :span="4" :offset="2">
      <span>
        Contact Us:
        <ul>
          <li>Mailing List</li>
          <li>Github</li>
        </ul>
      </span>
      </el-col>
    </el-row>
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
  margin: 0 0;
  padding: 0 0;
}

</style>
