<template>
<div class="body">
  <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import storage from '@/utils/storage'
import { useStore } from 'vuex'

export default defineComponent({
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
  background-color: #f5f5f5;
}
</style>
