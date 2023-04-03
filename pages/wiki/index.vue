<template>
  <div class="wiki-container">
    <div class="wiki-nav-container">
      <div class="wiki-nav">
        <el-tree
          ref="navTree"
          :data="data"
          :props="defaultProps"
          node-key="id"
          @node-click="handleNodeClick"
          :default-expanded-keys="expandedKeys"
        >
          <template slot-scope="{node,data}">
            <nuxt-link :to="data.path">{{ data.title }}</nuxt-link>
          </template>
        </el-tree>
      </div>
    </div>
    <div class="wiki-content-parent">
      <NuxtChild/>
    </div>
  </div>

</template>

<script>
export default {
  name: "wiki",
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'title',
        id: 'id'
      },
      expandedKeys: []
    }
  },
  methods: {
    handleNodeClick(node) {
      console.log(node)
      // this.$router.push({name: 'wiki-index-all', params: { slug: node.path + '_index' } });
    },
    buildTree(items) {
      const result = [];
      const itemMap = {};
      for (const item of items) {
        const id = item.id;
        const pid = item.pid;

        if (!itemMap[id]) {
          itemMap[id] = {
            children: [],
          }
        }

        itemMap[id] = {
          ...item,
          children: itemMap[id]['children']
        }

        const treeItem =  itemMap[id];

        if (pid === 0) {
          result.push(treeItem);
        } else {
          if (!itemMap[pid]) {
            itemMap[pid] = {
              children: [],
            }
          }
          itemMap[pid].children.push(treeItem)
        }

      }
      return result;
    },
    preProcess(articles) {
      articles.forEach(item => {
        item.path = item.path.replace('/_index', '')
        const slugArr = item.path.split("/")
        item.id = slugArr[slugArr.length-1]
        item.pid = slugArr.length === 2 ? 0:slugArr[slugArr.length-2]
      })
    },
  },
  async fetch() {
    const options = {
      deep: true
    }
    const articles = await this.$content('wiki', options)
      .only(['title', 'description', 'img', 'slug', 'author'])
      .sortBy('title', 'asc')
      .fetch()

    this.preProcess(articles)

    this.data = this.buildTree(articles)[0].children

  },
  mounted() {
    const pathArr = this.$route.fullPath.split("/")
    const id = pathArr[pathArr.length-1]
    this.expandedKeys.push(id)

  }
}
</script>

<style scoped>

</style>
