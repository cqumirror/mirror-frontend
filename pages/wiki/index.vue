<template>
  <el-container class="wiki-container">
    <el-aside style="margin: 0 auto; width: 13rem;" class="wiki-hidden">
    <ul class="wiki-aside">
      <template v-for="article in articles">
        <li :id = "article.slug" :key="article.slug" :class="{active : ChoosedSlug === article.slug}" @click="toActive(article.slug)" >

          <NuxtLink :to="{name: 'wiki-index-slug', params: { slug: article.slug } }" class="wiki-content">
                {{ article.slug }}
          </NuxtLink>

        </li>
      </template>
    </ul>
  </el-aside>

  <el-main>
    <div>
      <select class = "wiki-mobile-nav" v-model="ChoosedSlug">
        <template v-for="article in articles">
          <option :value="article.slug">
            <div>{{article.slug}}</div>

            </option>
        </template>
      </select>
    </div>
    <nuxt-child/>
  </el-main>
  <FloatToolsBtn
    v-if="wikiFloatBox.enabled"
    :data="wikiFloatBox.data"
  >
    <template slot="back-to-top">
      <el-backtop/>
    </template>
  </FloatToolsBtn>
  </el-container>
</template>

<script>

export default {
  name: "wiki",
  data() {
    return {
      wikiFloatBox: process.env.wikiFloatBox,
      articles: [],
      ChoosedSlug:''
    }
  },
  async asyncData({ $content, params }) {
    const articles = await $content('wiki')
      .only(['title', 'description', 'img', 'slug', 'author'])
      .sortBy('title', 'asc')
      .fetch()
    return {
      articles,
    }
  },
  methods:{
    toActive(slug){
      this.isActive = slug;
      this.ChoosedSlug =slug ;

    }
  },
  watch:{
    ChoosedSlug(){
      this.$router.push({name: 'wiki-index-slug', params: { slug: this.ChoosedSlug} });
    }
  },
  mounted(){
    let p = this.$router.history.current.path;
    let pathlist=  p.split('/');
    if(pathlist.length === 3){
      this.ChoosedSlug = pathlist[2];

    }else if(pathlist.length ===2) {
      this.ChoosedSlug = this.articles[0].slug;
    }
    this.$router.push({name: 'wiki-index-slug', params: { slug: this.ChoosedSlug} });

  },
  updated(){
    let p = this.$router.history.current.path;
    let pathlist=  p.split('/');
    if(pathlist.length ===2) {
      document.getElementById(this.articles[0].slug).click(); //修复了在页面中点击wiki会到 /wiki 空白页面的bug
    }

  }

}
</script>

<style scoped lang="scss">

$mobile-size: 767px;

.wiki-aside {
  display: flex;
  flex-direction:column;
  li {
  display: block;
  list-style: none;
  margin-top: 0.5rem;
  border-radius: 0.3rem;
  }
li:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
}

.wiki-hidden {
  @media (max-width: $mobile-size) {
    display: none;
  }
}
.wiki-mobile-nav{
  display: none;
  width : 100%;
  height: 2rem;
  border: 1px solid #000;
  border-radius: 0.2rem;
  option {

    color: #1ccb4c;
  }
  @media (max-width: $mobile-size) {
    display: block;
  }
}

.active {
background-color: #1ccb4c !important;

}
.active {
  .wiki-content {
  color: #fff;
  }
}
.wiki-content {
  display: block;
  color: #1ccb4c;
  font-size: 1rem;
  line-height: 1rem;
  font-weight: 400;
  padding: 1rem 1rem;
  text-decoration: none;
}

.wiki-container{
  margin-left: 10vw;
  @media (max-width: $mobile-size) {
    margin-left: 1vw;
    margin-right: 1vw;
  }
}

</style>
