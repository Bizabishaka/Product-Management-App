<template>
  <div class="flex flex-col h-screen bg-gray-50">
    <Navbar />
    <main class="flex-1 p-6 overflow-auto">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import Navbar from './Navbar.vue'
</script>
