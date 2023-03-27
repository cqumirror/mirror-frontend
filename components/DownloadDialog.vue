<template>
  <transition name="modal">
    <div id="download-dialog" class="modal-mask" @click="handleClickMask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">

            </slot>
          </div>
          <div class="modal-body">
            <slot name="body">

            </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
<!--              <button class="modal-default-button" @click="$emit('close')">-->
<!--                OK-->
<!--              </button>-->
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "DownloadDialog",
  data() {
    return {

    }
  },
  methods: {
    // close dialog when click mask
    handleClickMask(e) {
      const ele = e.target.className
      if (ele === 'modal-wrapper') {
        this.$emit('close')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// TODO 修改样式
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}



.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
