<template>
  <div class="mirror-footer">
    <div class="mirror-footer-content">
      <el-row
        :gutter="40"
        type="flex"
        class="footer-main"
      >
        <!-- 左侧说明 -->
        <el-col
          :xs="24"
          :sm="24"
          :md="10"
          :lg="10"
          :offset-md="2"
          :offset-lg="2"
        >
          <div class="footer-text">
            <el-row>
              <el-col>
                本站在
                <a
                  class="footer-link"
                  href="http://net.cqu.edu.cn/"
                  target="_blank"
                >
                  <b>重庆大学信息化办公室</b>
                </a>
                的支持下创办，由
                <a
                  class="footer-link"
                  href="https://mirrors.cqu.edu.cn/introductions/"
                  target="_blank"
                >
                  <b>重庆大学蓝盟</b>
                </a>
                运营维护。
              </el-col>
            </el-row>

            <el-row>
              <el-col>
                本站镜像同步工具 fork 自清华大学 TUNA 协会的
                <a
                  class="footer-link"
                  href="https://github.com/tuna/tunasync"
                  target="_blank"
                >
                  <b><em>镜像管理器</em></b>
                </a>
                项目。
                <a
                  class="footer-link"
                  href="https://github.com/cqumirror/mirror-frontend"
                  target="_blank"
                >
                  <b><em>镜像站前端</em></b>
                </a>
                基于 <b>NuxtJS</b> 自行构建。
              </el-col>
            </el-row>

            <el-row>
              <el-col>
                根据相关法律法规，本站不对欧盟用户提供服务。
              </el-col>
            </el-row>

            <el-row>
              <el-col>
                本站不对特定滥用镜像站资源的用户提供服务，将采用多种技术措施反制滥用与恶意攻击行为。
              </el-col>
            </el-row>
          </div>
        </el-col>
        <!-- 右侧 2x2 -->
        <el-col
          :xs="24"
          :sm="24"
          :md="10"
          :lg="10"
        >
          <div class="footer-grid">
            <!-- 指导单位 -->
            <div class="footer-card">
              <div class="footer-title">
                指导单位
              </div>
              <a
                href="http://net.cqu.edu.cn/"
                target="_blank"
                class="footer-image-link"
              >
                <img
                  src="/static/img/guide-placeholder.png"
                  alt="指导单位"
                  class="footer-image"
                />
              </a>
            </div>
            <!-- 运营维护 -->
            <div class="footer-card">
              <div class="footer-title">
                运营维护
              </div>
              <a
                href="https://mirrors.cqu.edu.cn/introductions/"
                target="_blank"
                class="footer-image-link"
              >
                <img
                  src="/static/img/maintain-placeholder.PNG"
                  alt="运营维护"
                  class="footer-image"
                />
              </a>
            </div>
            <!-- Contact -->
            <div class="footer-card">
              <div class="footer-title">
                Contact Us
              </div>
              <ul class="contact-list">
                <li>
                  <fa :icon="['fas','envelope']"/>
                  <a
                    href="mailto:cqumirror@gmail.com"
                    class="footer-link"
                  >
                    Mail
                  </a>
                </li>
                <li>
                  <fa :icon="['fab','github']"/>
                  <a
                    href="https://github.com/cqumirror/feedback"
                    class="footer-link"
                    target="_blank"
                  >
                    Github
                  </a>
                </li>
              </ul>
            </div>
            <!-- Sponsor -->
<!--            <div class="footer-card">-->
<!--              <div class="footer-title">-->
<!--                Sponsor-->
<!--              </div>-->
<!--              <ul class="sponsor-list">-->
<!--                <li>-->
<!--                  <div class="sponsor-content">-->
<!--                    <img-->
<!--                      src="/static/img/sponsor-1.jpg"-->
<!--                      class="sponsor-image"-->
<!--                      alt="Sponsor"-->
<!--                    />-->
<!--                    <div class="sponsor-text">-->
<!--                      感谢-->
<!--                      <a-->
<!--                        class="footer-link"-->
<!--                        href="https://www.rezcwl.com"-->
<!--                        target="_blank"-->
<!--                      >-->
<!--                        <b>上海睿尔智创网络科技有限公司</b>-->
<!--                      </a>-->
<!--                      为本站提供部分存储设施。-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </li>-->
<!--              </ul>-->
<!--            </div>-->
          </div>
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
  width: 100%;
}
/* 左侧 */
.footer-text {
  font-size: 16px;
  line-height: 1.8;
}
.el-row {
  margin-bottom: 10px;
  flex-wrap: wrap;
}
/* 链接 */
.footer-link {
  text-decoration: none;
  color: white;
}
/* 右侧 2x2 */
.footer-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(180px, 1fr));
  gap: 35px 40px;
  align-items: start;
  justify-items: center;
}
/* 单元 */
.footer-card {
  width: 100%;
  text-align: center;
}
/* 标题 */
.footer-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 14px;
}
/* 图片 */
.footer-image-link {
  display: inline-block;
}
.footer-image {
  display: block;
  max-width: 180px;
  max-height: 100px;
  width: auto;
  height: auto;
}
/* Contact */
.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.contact-list li {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 16px;
}
/* sponsor */
.sponsor-list {
  list-style: none;

  padding: 0;
  margin: 0;
}
.sponsor-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.sponsor-image {
  width: 40px;
  margin-top: 6px;
  flex-shrink: 0;
}
.sponsor-text {
  font-size: 14px;
  line-height: 1.7;
  text-align: left;
}

/* 移动端 */
@media screen and (max-width: 991px) {
  .footer-grid {
    grid-template-columns: 1fr;
    margin-top: 30px;
  }

}
</style>
