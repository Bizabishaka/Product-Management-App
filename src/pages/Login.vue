<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-slate-50">
    
    <div class="mb-8 text-center">
      <h1 class="text-3xl font-bold">PlatformLogo</h1>
    </div>

    
    <div class="w-full max-w-md bg-white rounded-2xl shadow p-8">
      
      <h2 class="text-xl font-semibold mb-2 text-center">Welcome Back!</h2>
      <p class="text-gray-600 mb-6 text-center">
        Please sign to manage your products
      </p>

      
      <form @submit.prevent="onSubmit" class="space-y-4">
        
        <div>
          <label class="block text-sm font-medium mb-1">Username</label>
          <input
            v-model="username"
            required
            placeholder="Enter username"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

       
        <div class="relative">
          <label class="block text-sm font-medium mb-1">Password</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            required
            placeholder="Enter password"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
          />
          
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <span v-if="showPassword">👁️</span>
            <span v-else>🙈</span>
          </button>
        </div>

        
        <div class="flex justify-between items-center text-sm text-gray-600">
          <label class="flex items-center gap-1">
            <input type="checkbox" v-model="rememberMe" />
            Remember me
          </label>
          <RouterLink to="/forgot-password" class="hover:underline">
            Forgot password?
          </RouterLink>
        </div>

       
        <button
          type="submit"
          :disabled="loading"
          class="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60"
        >
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>

        
        <p v-if="error" class="text-red-600 text-sm mt-2">{{ error }}</p>
      </form>
    </div>

  
    <footer class="mt-6 text-gray-500 text-sm">
      &copy; 2024 Zacktech
    </footer>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

export default {
  setup() {
    const router = useRouter()
    const auth = useAuthStore()

    const username = ref('')
    const password = ref('')
    const showPassword = ref(false)
    const rememberMe = ref(false)
    const loading = ref(false)
    const error = ref<string | null>(null)

    async function onSubmit() {
      loading.value = true
      error.value = null

      const res = await auth.login({
        username: username.value,
        password: password.value,
      })
      loading.value = false

      if (res.ok) {
      
        if (!rememberMe.value) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
        }
        router.push('/products')
      } else {
        error.value = res.message ?? 'Invalid credentials'
      }
    }

    return {
      username,
      password,
      showPassword,
      rememberMe,
      loading,
      error,
      onSubmit,
    }
  },
}
</script>
