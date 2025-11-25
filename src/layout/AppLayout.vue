<template>
  <div class="flex min-h-screen bg-gray-50">
    
    <Sidebar :is-open="sidebarOpen" @close="sidebarOpen = false" />

    
    <div class="flex-1 flex flex-col">
      
      <Navbar @toggle-sidebar="sidebarOpen = !sidebarOpen" />

     
      <main class="p-4 sm:p-6">
        <router-view/>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from './Sidebar.vue'
import Navbar from './Navbar.vue'

const sidebarOpen = ref(false)
</script>
