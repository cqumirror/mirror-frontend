<template>
  <div class="nav-menu-container">
    <button @click="showNav = true">打开导航</button>
    <transition name="slide">
      <div class="nav-menu" v-if="showNav">
        <button @click="showNav = false">关闭导航</button>
        <ul>
          <li>菜单项1</li>
          <li>菜单项2</li>
          <li>菜单项3</li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showNav: false
    }
  }
}
</script>

<style scoped>
.nav-menu-container {
  position: relative;
}
.nav-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
}
.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
