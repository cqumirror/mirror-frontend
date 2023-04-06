<template>
  <div class="wiki-container">
    <button id="nav-open" @click="handleShowNav">
      <i class="nav-open-icon"/>
    </button>
    <transition name="slide">
    <div class="wiki-nav-container" v-if="showNav">
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
            <div class="leaf-parent">
              <nuxt-link :to="`${data.filepath}`" class="leaf-end">{{ data.title }}</nuxt-link>
            </div>
          </template>
        </el-tree>
        <button id="nav-close" @click="handleCloseNav">
          <i class="el-icon-close"/>
        </button>
      </div>
    </div>
    </transition>
    <div class="wiki-content-parent">
      <article v-if="$route.name === 'wiki'" id="md-content" class="wiki-page-content">
        <nuxt-content ref="nuxtContent" :document="article" />
      </article>
      <NuxtChild v-else/>
    </div>
    <FloatToolsBtn
      v-if="wikiFloatBox.enabled"
      :data="wikiFloatBox.data"
    >
      <template slot="back-to-top">
        <el-backtop/>
      </template>
    </FloatToolsBtn>
  </div>

</template>

<script>
export default {
  name: "wiki",
  data() {
    return {
      wikiFloatBox: process.env.wikiFloatBox,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'title',
        id: 'id'
      },
      expandedKeys: [],
      article: {},

      showNav: false,
      mobileSize: 990
    }
  },
  methods: {
    handleShowNav() {
      this.showNav=true
      const blocks = document.getElementsByClassName('wiki-content-parent')
      for(let block of blocks) {
        block.style.display = 'none';
      }
    },
    handleCloseNav() {
      const blocks = document.getElementsByClassName('wiki-content-parent')
      for(let block of blocks) {
        block.style.display = 'inherit';
      }
      this.showNav=false
    },
    handleResize() {
      this.showNav=true
      const blocks = document.getElementsByClassName('wiki-content-parent')
      for(let block of blocks) {
        block.style.display = 'inherit';
      }
    },
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
        if (this.showNav) {
          const tree = this.$refs.navTree;
          this.traverseTree(tree.store.root, (node) => {
            node.expanded = false;
          })
        }
      })

    },
    async fetchIndex() {
      this.article = await this.$content('wiki/_index').fetch()
    }
  },
  async fetch() {
    const options = {
      deep: true
    }
    const articles = await this.$content('wiki', options)
      .only(['title', 'description', 'slug', 'author','filepath'])
      .sortBy('title', 'asc')
      .fetch()
    this.preProcess(articles)

    this.data = this.buildTree(articles)[0].children


  },
  mounted() {
    window.onresize = () => {
      setTimeout(() => {
        if (window.innerWidth > this.mobileSize) {
          this.handleResize()
        } else {
          if (this.showNav) {
            scrollTo(0,0)
            this.handleShowNav()
          }

        }
      }, 400)
    }
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
  updated() {

  },
  watch: {
    '$route': {
      handler: function() {
        if (this.$route.name === 'wiki') {
          this.fetchIndex()
          this.expandedKeys = []
          this.handleCollapseAll()
        }
      },
      immediate: true,
    },
    'showNav': {
      handler: function () {
        if (this.showNav) {

        }
      }
    }
  },


}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.25s ease-out, opacity 0.25s ease-out;
}

.slide-enter {
  transform: translateX(100%);
  opacity: 100%;
}

.slide-leave-to {
  transform: translateX(-100%);
  opacity: 100%;
}

.slide-enter-active {
  animation: slide-in 0.2s ease-out;
}

.slide-leave-active {
  animation: slide-out 0.25s ease-out;
}

@keyframes slide-in {
  0% {
    transform: translateX(-100%);
    opacity: 0.95;
  }
  100% {
    transform: translateX(0%);
    opacity: 1;
  }
}

@keyframes slide-out {
  0% {
    transform: translateX(0%);
    opacity: 1;
  }
  100% {
    transform: translateX(-100%);
    opacity: 0.95;
  }
}
</style>
