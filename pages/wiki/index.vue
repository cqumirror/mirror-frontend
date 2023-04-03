<template>
  <div>
    test
    <el-tree
      :data="data"
      :props="defaultProps"
      @node-click="handleNodeClick"
    ></el-tree>
    <NuxtChild/>
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
        label: 'title'
      }
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
        item.path = item.path.replace('/_index', '')
        const slugArr = item.path.split("/")
        item.id = slugArr[slugArr.length-1]
        item.pid = slugArr.length === 2 ? 0:slugArr[slugArr.length-2]
        if (item.title) {
          console.log(item.title)
        }
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

  }
}
</script>

<style scoped>

</style>
