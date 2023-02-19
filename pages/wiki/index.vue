<template>
  <el-container class="wiki-container"> 
    <el-aside style="margin: 0 auto; width: 13rem;">
    <ul>
      <template v-for="(article,k) in articles">
        <li :key="article.slug" :class="{active : isActive === k}" @click="toActive(k)" >
          <NuxtLink :to="{name: 'wiki-index-slug', params: { slug: article.slug } }" class="wiki-content" :id="k"
          >
                {{ article.slug }}
          </NuxtLink>
        </li>
      </template>
    </ul>
  </el-aside>
  <el-main>
    <nuxt-child/>
  </el-main>
  </el-container>
</template>

<script>
import '@/assets/css/main.scss'
export default {
  name: "wiki",
  data() {
    return {
      articles: [],
      isActive: 0,
    }
  },
  async asyncData({ $content, params }) {
    const articles = await $content('wiki')
      .only(['title', 'description', 'img', 'slug', 'author'])
      .sortBy('createdAt', 'asc')
      .fetch()
    return {
      articles
    }
  },
  methods:{
    toActive(k){
      this.isActive = k;
    }
  },
  mounted(){
    this.$router.replace('/wiki/'+this.articles[0].slug); //自动重定向到第一个帮助
  }
}
</script>

<style scoped>
li {
  display: block;
  list-style: none;
  border-radius: 0.3rem;
}
li:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
.active {
background-color: #53CAFF !important; 
  
}
.active .wiki-content {
  color: #fff;
}
.wiki-content {
  display: block;
  color: #53CAFF;
  height: 1rem;
  font-size: 1rem;
  line-height: 1rem;
  font-weight: 400;
  padding: 1rem 1rem;
  text-decoration: none;
}

.wiki-container{
  margin-left: 10vw;

}
</style>
