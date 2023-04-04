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
            <nuxt-link :to="`${data.filepath}`">{{ data.title }}</nuxt-link>
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
        item.filepath = item.filepath.replace('/_index', '')
        const slugArr = item.filepath.split("/")
        item.id = slugArr[slugArr.length-1]
        item.pid = slugArr.length === 2 ? 0:slugArr[slugArr.length-2]
      })
    },
  },
  async fetch() {
    console.log("start fetching")
    debugger
    const options = {
      deep: true
    }
    const articles = await this.$content('wiki', options)
      .only(['title', 'description', 'slug', 'author','filepath'])
      .sortBy('title', 'asc')
      .fetch()
    console.log("fetch end")
    console.log(articles)
    this.preProcess(articles)

    this.data = this.buildTree(articles)[0].children


  },
  mounted() {

    const path = this.$route.params.pathMatch
    const pathArr = path.split("/")
    const id = pathArr[pathArr.length-1]
    this.expandedKeys.push(id)


  }
}
</script>

<style scoped>

</style>
