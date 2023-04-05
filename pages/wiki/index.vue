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
          accordion
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
    traverseTree(node, callback) {
      if (!node) return;
      callback(node);
      const children = node.root ? node.root.childNodes : node.childNodes;
      if (children) {
        children.forEach((child) => {
          this.traverseTree(child, callback);
        });
      }
    },
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
    handleCollapseAll() {
      this.$nextTick(() => {
        const tree = this.$refs.navTree;
        this.traverseTree(tree.store.root, (node) => {
          node.expanded = false;
        })
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
    if (this.$route.name === 'wiki') {
      this.expandedKeys = []
      return
    } else {
      const path = this.$route.params.pathMatch
      const pathArr = path.split("/")
      const id = pathArr[pathArr.length-1]
      this.expandedKeys = [id]
    }
  },
  // updated() {
  //   console.log(this.$route.name,"=== route name ===")
  //   if (this.$route.name === 'wiki') {
  //     console.log({name: 'homepage'})
  //     // this.expandedKeys = []
  //   }
  // },
  watch: {
    '$route': {
      handler: function() {
        console.log(this.$route.name,"=== index.vue watch ===")
        if (this.$route.name === 'wiki') {
          console.log({name:'homepage'})
          this.expandedKeys = []
          this.handleCollapseAll()
        }
      },
      immediate: true,
    },
  },


}
</script>

<style scoped>

</style>
