<template>
  <div class="body">
    <FakeWechatBackground>
      <router-view/>
    </FakeWechatBackground>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import storage from '@/utils/storage'
import { useStore } from 'vuex'
import FakeWechatBackground from './components/FakeWechatBackground.vue'

export default defineComponent({
  components: { FakeWechatBackground },
  setup () {
    const store = useStore()

    onMounted(() => {
      if (storage.get('INFO')) {
        console.log(storage.get('INFO'))
        store.commit('SET_INFO', storage.get('INFO'))
      }
    })

    return {}
  }
})
</script>

<style lang="scss" scoped>
.body {
  min-height: 100vh;
  background-color: #f5f5f5;
}
</style>
