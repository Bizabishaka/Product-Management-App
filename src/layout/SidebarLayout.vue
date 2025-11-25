<template>
  <div class="flex min-h-screen bg-gray-50">

    
    <Sidebar :is-open="sidebarOpen" @close="sidebarOpen = false" />

    
    <div class="flex-1 flex flex-col transition-all" :class="sidebarOpen ? 'ml-64' : 'ml-0'">
      
      
      <header class="bg-white shadow p-4 flex items-center justify-between sm:hidden">
        <button @click="sidebarOpen = !sidebarOpen" class="text-2xl">☰</button>
        <div class="font-bold text-lg">PlatformLogo</div>
      </header>

      <main class="p-6 overflow-auto">
        <router-view />
      </main>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from './Sidebar.vue'

const sidebarOpen = ref(false)
</script>
