<template>
 <div class="float-tools-parent">
   <div class="float-tools-conatiner">
     <template v-for="item of data">
       <el-tooltip class="item" effect="dark" :content="item.tooltip" placement="left">
         <div class="float-tools-item" @click="handleClick(item.goto)">
           {{ item.label }}
         </div>
       </el-tooltip>
     </template>
     <slot class="float-tools-item" name="back-to-top">

     </slot>
   </div>
 </div>
</template>

<script>
export default {
  name: "FloatToolsBtn",
  props: {
    data: { type: Array }
  },
  methods: {
    handleClick(item) {
      console.log(item)
      window.location.href = item
    }
  }
}
</script>

<style scoped>

</style>
