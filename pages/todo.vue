<template>
  <div><el-tree :data="treeData" ref="tree" :default-expand-all="false"></el-tree>
    <el-button @click="handleExpandAll">展开全部</el-button>
    <el-button @click="handleCollapseAll">折叠全部</el-button></div>

</template>

<script>
export default {
  data() {
    return {
      treeData: [
        {
          id: 1,
          label: '一级节点 1',
          children: [
            {
              id: 2,
              label: '二级节点 1-1'
            },
            {
              id: 3,
              label: '二级节点 1-2'
            }
          ]
        },
        {
          id: 4,
          label: '一级节点 2',
          children: [
            {
              id: 5,
              label: '二级节点 2-1'
            },
            {
              id: 6,
              label: '二级节点 2-2'
            }
          ]
        }
      ]
    };
  },
  methods: {
    handleExpandAll() {
      const tree = this.$refs.tree;
      this.traverseTree(tree.store.root, (node) => {
        node.expanded = true;
      });
    },
    handleCollapseAll() {
      const tree = this.$refs.tree;
      this.traverseTree(tree.store.root, (node) => {
        node.expanded = false;
      });
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
    }
  }
};
</script>
