<template>
  <div v-if="modelValue">
    <div class="shade" />
    <div class="wrapper">
      <div class="modal">
        <div class="layui-layer-title" style="cursor: move;" move="ok">{{title}}</div>
        <div id="" class="layui-layer-content layui-layer-padding">
          <i class="layui-layer-ico layui-layer-ico7"></i>
          <slot />
        </div>
        <div class="layui-layer-btn">
          <a class="layui-layer-btn0" @click="handleConfirm">确认</a>
          <a class="layui-layer-btn1" @click="handleCancel">关闭</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  emits: ['confirm', 'cancel'],
  setup (props, { emit }) {
    function handleConfirm () {
      emit('confirm')
    }

    function handleCancel () {
      emit('cancel')
    }

    return {
      handleConfirm,
      handleCancel
    }
  }
})
</script>

<style lang="scss" scoped>
.shade {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: #000;
  opacity: 0.3;
}

.wrapper {
  z-index: 20;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  opacity: 1;
  top: 150px;
  left: 0;
  margin: 0;
  padding: 0;
  background-color: #fff;
  box-shadow: 1px 1px 50px rgb(0 0 0 / 30%);
  border-radius: 2px;
  animation-fill-mode: both;
  animation-duration: .3s;
  min-width: 260px;
}

.layui-layer-title {
  padding: 0 80px 0 20px;
  height: 42px;
  line-height: 42px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  color: #333;
  overflow: hidden;
  background-color: #F8F8F8;
  border-radius: 2px 2px 0 0;
}

.layui-layer-padding {
  padding: 20px 20px 20px 55px;
  text-align: left;
}

.layui-layer-content {
  position: relative;

  .layui-layer-ico {
    position: absolute;
    top: 16px;
    left: 15px;
    width: 30px;
    height: 30px;
    display: inline-block;
    vertical-align: top;
    background: url("../assets/icon.png") no-repeat;
  }
}

.layui-layer-btn {
  text-align: center;
  padding: 0 10px 16px;
  pointer-events: auto;
}

.layui-layer .layui-layer-btn .layui-layer-btn0 {
  background-color: #265d5a;
  border-color: #1b524f;
  color: #265d5a;
}

.layui-layer-btn a {
  box-sizing: border-box;
  line-height: 28px;
  margin: 0 5px;
  padding: 6px 8px;
  border: 1px solid #dedede;
  background-color: #f1f1f1;
  color: #333;
  border-radius: 2px;
  font-weight: 400;
  cursor: pointer;
  text-decoration: none;
  font-size: 14px;

  &.layui-layer-btn0 {
    background-color: #265d5a;
    border-color: #1b524f;
    color: #265d5a;
  }
}

</style>
