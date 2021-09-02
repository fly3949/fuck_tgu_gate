<template>
  <div class="wrapper">
    <div class="background">
      <div class="text">网页由 wk.tiangong.edu.cn 提供</div>
    </div>
    <div class="container" ref="container" :class="{animated: isAnimated}" :style="{transform: `translateY(${marginTop}px`}">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Hammer from 'hammerjs'

export default defineComponent({
  props: {
  },
  setup () {
    const container = ref(null as unknown as EventTarget)

    const marginTop = ref(0)
    const isAnimated = ref(false)

    onMounted(() => {
      const stage = container.value
      const mc = new Hammer.Manager(stage)
      const Pan = new Hammer.Pan()
      mc.add(Pan)
      let initialMargin = 0
      mc.on('panmove', (e: any) => {
        console.log(e)
        const computedDeltaY = e.deltaY > 0 ? Math.round(Math.pow(e.deltaY, 0.8)) : e.deltaY
        marginTop.value = -initialMargin > e.deltaY ? initialMargin + e.deltaY : computedDeltaY
      })
      mc.on('panstart', (e: any) => {
        // console.log(e)
        isAnimated.value = false
      })
      mc.on('panend', (e: any) => {
        // console.log(e)
        isAnimated.value = true
        if (marginTop.value > 0) {
          marginTop.value = 0
        }
        initialMargin = marginTop.value
      })
    })

    return {
      container,
      marginTop,
      isAnimated
    }
  }
})
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  background-color: #ededed;
  height: 100vh;
  overflow: hidden;

  .background {
    position: absolute;
    width: 100vw;
    .text {
      z-index: 0;
      color: #a7a7a7;
      font-size: 14px;
      text-align: center;
      margin-top: 24px;
    }
  }

  .container {
    &.animated {
      transition: transform 0.3s ease;
    }
  }
}
</style>
