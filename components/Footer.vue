<template>
  <div class="mirror-footer">
    <div class="mirror-footer-content" >
      <el-row :gutter="30">
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :offset-md="4" :offset-lg="4">
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
            <el-row>
              <el-col>
                根据相关法律法规，本站不对欧盟用户提供服务。
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                本站不对特定滥用镜像站资源的用户提供服务,将采用多种技术措施反制滥用与恶意攻击行为。
              </el-col>
            </el-row>
          </span>
        </el-col>
        <el-col :xs="24" :sm="24" :md="7" :lg="7" :offset-md="7" :offset-lg="7">
            <span>
<!--              <el-row>-->
<!--                <b style="font-size: 20px;">Sponsor:</b>-->
<!--                <ul>-->
<!--                  <li style="list-style: none;">-->
<!--                    <div style="display: flex; align-items: center;justify-content: center; gap: 10px;">-->
<!--                    <img src="/static/img/sponsor-1.jpg" style="width: 40px; margin-top: 10px;"/>-->
<!--                    <div>-->
<!--                      感谢<a style="text-decoration: none;color: white" href="https://www.rezcwl.com" target="_blank"><b>上海睿尔智创网络科技有限公司</b></a>为本站提供部分存储设施。-->
<!--                    </div>-->
<!--                    </div>-->
<!--                  </li>-->
<!--                </ul>-->
<!--              </el-row>-->
              <el-row>
                  <b style="font-size: 20px;">Contact Us:</b>
                  <ul>
                    <li>
                      <fa :icon="['fas','envelope']"/>{{ "\xa0" }}<a href="mailto:cqumirror@gmail.com"style="text-decoration: none;color: white;"> Mail</a>
                    </li>
                    <li>
                      <fa :icon="['fab','github']"/>{{ "\xa0" }}<a style="text-decoration: none;color: white" href="https://github.com/cqumirror/feedback">Github</a>
                    </li>
                  </ul>
              </el-row>
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
  justify-content: center;
  background-color: #384452;
  color: #f0ffff;
  display: flex;
}

.mirror-footer-content {
  margin: 5vh 4vw;
}
.el-row {
  margin-bottom: 10px;
  flex-wrap: wrap;
}
ul {
  margin-bottom: 0;
}
</style>
