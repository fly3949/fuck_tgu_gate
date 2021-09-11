<template>
  <FakeWechatBackground>
    <div class="wrapper" :class="[backgroundColorClass]">
      <div class="body">
        <div class="logo"><img src="@/assets/logo.png" @click="handleOpenSetting"></div>
        <Content :state="state" @out="showOutModal = true" @enter="showEnterModal = true" />
      </div>

      <Modal v-model="showOutModal" @confirm="handleOutSchool" @cancel="showOutModal = false" title="出校确认">确认是否出校？</Modal>
      <Modal v-model="showEnterModal" @confirm="handleEnterSchool" @cancel="showEnterModal = false" title="进校确认">确认是否进校？</Modal>
    </div>
  </FakeWechatBackground>
</template>

<script lang="ts">
import { computed, ref, defineComponent, onMounted, provide } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Content from '@/components/Content.vue'
import { Toast } from 'vant'
import dayjs from '@/utils/dayjs'
import Modal from '@/components/Modal.vue'
import FakeWechatBackground from '../components/FakeWechatBackground.vue'
import { randomNum } from '@/utils/ common'

const showOutModal = ref(false)
const showEnterModal = ref(false)

export default defineComponent({
  name: 'Home',
  components: { Content, Modal, FakeWechatBackground },
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

    const state = computed(() => {
      if (form.value.status === 1) {
        return 'pass'
      }
      if (form.value.status === 2) {
        return 'out'
      }
      if (form.value.status === 3) {
        return 'forbidden'
      }

      if (dayjs().isBetween(form.value.leaveTime, form.value.backTime, null, '[]')) {
        return 'pass'
      }

      return 'forbidden'
    })

    const backgroundColorClass = computed(() => {
      if (state.value.localeCompare('pass') === 0) {
        return 'green'
      }
      if (state.value.localeCompare('out') === 0) {
        return 'blue'
      }

      return 'red'
    })

    function handleOutSchool () {
      // 随机延迟
      const timeout = randomNum(3000, 6000)
      setTimeout(() => {
        showOutModal.value = false
        store.commit('SET_STATUS', 2)
      }, timeout)
    }

    function handleEnterSchool () {
      // 随机延迟
      const timeout = randomNum(3000, 6000)
      setTimeout(() => {
        showEnterModal.value = false
        store.commit('SET_STATUS', 3)
      }, timeout)
    }

    provide('info', form.value)

    return { handleOpenSetting, state, backgroundColorClass, handleOutSchool, handleEnterSchool, showOutModal, showEnterModal }
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
    z-index: -1;
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
