<template>
  <el-container class="wiki-container">
    <el-aside style="margin: 0 auto; width: 13rem;" class="wiki-hidden">
    <ul class="wiki-aside">
      <template v-for="(article,k) in articles">
        <li :key="article.slug" :class="{active : isActive === k}" @click="toActive(k)" >

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

  </el-container>
</template>

<script>
export default {
  name: "wiki",
  data() {
    return {
      articles: [],
      isActive: 0,
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
      ChoosedSlug:articles[0].slug
    }
  },
  methods:{
    toActive(k){
      this.isActive = k;
    }
  },
  watch:{
    ChoosedSlug(){
      this.$router.push({name: 'wiki-index-slug', params: { slug: this.ChoosedSlug} });
    }
  },
  mounted(){
    this.$router.push({name: 'wiki-index-slug', params: { slug: this.articles[0].slug} }); //自动重定向到第一个帮助
  },

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
