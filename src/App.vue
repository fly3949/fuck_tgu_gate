<template>
  <div class="body">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import storage from '@/utils/storage'
import { useStore } from 'vuex'
import { checkLocalUser } from './utils/auth'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup () {
    const store = useStore()
    const router = useRouter()

    onMounted(async () => {
      if (storage.get('INFO')) {
        console.log(storage.get('INFO'))
        store.commit('SET_INFO', storage.get('INFO'))
      }
      if (storage.get('USERNAME') && storage.get('PASSWORD')) {
        try {
          await checkLocalUser()
        } catch (e) {
          // auth fail
          window.location.href = 'https://www.bilibili.com/'
        }
      } else {
        router.push({ name: 'Login' })
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
