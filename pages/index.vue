<template>
  <el-container>
    <el-aside width="10vw"></el-aside>
    <Mirrorlist/>
    <el-aside width="40vw">
      <SideBar/>
    </el-aside>
  </el-container>

</template>

<script>
export default {
  name: 'IndexPage'
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
}
</style>
