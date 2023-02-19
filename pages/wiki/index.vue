<template>
  <el-container class="wiki-container"> 
    <el-aside style="margin: 0 auto; width: 13rem;">
    <ul>
      <template v-for="(article,k) in articles">
        <li :key="article.slug" :class="{active : isActive === k}" @click="toActive(k)" >
          <NuxtLink :to="{name: 'wiki-index-slug', params: { slug: article.slug } }" class="wiki-content">
            <div class="wiki-title">
                {{ article.slug }}
            </div>
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
  }
}
</script>

<style scoped>
li {
  list-style: none;
  height: 2rem;
  margin-top:0.1rem ;
  padding-top:0.8rem ;
  border-radius: 0.3rem;
}
a {
  text-decoration: none;
}
.active {
  background-color: #53CAFF;
}
li .nuxt-link-active {
  color: #fff;
}
.wiki-content {
  
  color: #53CAFF;
}


.wiki-title{
  height: 1rem;
  font-size: 1rem;
  line-height: 1rem;
  margin-left: 1rem;
  font-weight: 400;
}
.wiki-container{
  margin-left: 10vw;

}
</style>
