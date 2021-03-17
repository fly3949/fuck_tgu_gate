<template>
  <div class="wrapper red">
    <div class="body">
      <div class="logo"><img src="@/assets/logo.png" @click="handleOpenSetting"></div>
      <Content />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, provide } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Content from '@/components/Content.vue'
import { Toast } from 'vant'

export default defineComponent({
  name: 'Home',
  components: { Content },
  setup () {
    const router = useRouter()
    const store = useStore()

    function handleOpenSetting () {
      router.push({ name: 'Setting' })
    }

    const form = computed(() => {
      return store.state.info
    })

    onMounted(() => {
      if (!form.value.name || !form.value.faculty || !form.value.stuNum) {
        Toast('请完善审批信息')
        router.push({ name: 'Setting' })
      }
    })

    provide('info', form.value)

    return { handleOpenSetting }
  }
})
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  max-width: 750px;
  margin: 0 auto;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 633px;
    top: 0;
  }
}

.body {
  position: relative;
  z-index: 2;
  overflow: hidden;
  padding-bottom: 40px;

  .logo {
    text-align: center;
    margin: 43px 0 36px;
  }
}

@media screen and (max-width: 479px) {
  .body {
    .logo {
      img {
        width: 75%;
      }
      margin: 20px 0;
    }
  }
  .wrapper {
    &:after {
      height: 500px;
    }
  }
}

.wrapper.green:after {
  background: #4daa40;
}

.body.green.statues {
  background: #4daa40;
}

.wrapper.blue:after {
  background: #0459aa;
}

.body.blue.statues {
  background: #0459aa;
}

.wrapper.red:after {
  background: #e03636;
}
</style>
