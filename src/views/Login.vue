<template>
  <div class="login">
    <input type="text" v-model="username" />
    <br />
    <input type="password" v-model="password" />
    <br />
    <button @click="handleLogin">fuck it</button>
  </div>
</template>

<script lang="ts">
import { login } from '@/utils/auth'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup () {
    const router = useRouter()

    const username = ref('')
    const password = ref('')

    const handleLogin = async () => {
      try {
        await login(username.value, password.value)
        router.push({ name: 'Home' })
      } catch (e) {
        alert('?')
      }
    }

    return {
      username,
      password,
      handleLogin
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  padding: 16px;
}
</style>
