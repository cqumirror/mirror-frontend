<template>
  <div id="status-container-parent">
<!--    <h2>服务器监控</h2>-->
    <h2 id="status-title"><fa :icon="['fas','terminal']" style="margin-right: 1vw"/>同步状态</h2>
    <Statuslist/>
  </div>
</template>

<script>
export default {
  name: "status",
}
</script>

<style scoped>

</style>
