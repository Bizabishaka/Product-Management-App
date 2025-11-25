<template>
  <header class="bg-white shadow px-4 sm:px-6 py-4 flex items-center justify-between">

    
    <div class="flex items-center gap-4">
      <button @click="$emit('toggle-sidebar')" class="sm:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
      <div class="font-semibold text-lg">MyLogo</div>
    </div>

    
    <div class="flex-1 mx-4 relative hidden sm:block">
      <input
        type="text"
        v-model="keyword"
        placeholder="Search products..."
        class="w-full pl-10 pr-3 py-2 border rounded-lg outline-none"
      />
      <MagnifyingGlassIcon class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
    </div>

    
    <div class="flex items-center gap-3">
      <div class="relative">
        <button @click="toggleNotifs" class="relative">
          <BellIcon class="w-6 h-6 text-gray-700" />
          <span v-if="ui.notifications.length" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            {{ ui.notifications.length }}
          </span>
        </button>

        <div v-if="showNotif" class="absolute right-0 mt-3 bg-white shadow-lg border rounded p-3 w-56 text-sm z-20">
          <p v-if="ui.notifications.length === 0" class="text-gray-500">No updates yet</p>
          <ul v-else>
            <li v-for="(n, i) in ui.notifications" :key="i" class="py-1 border-b last:border-b-0">
              {{ n }}
            </li>
          </ul>
        </div>
      </div>

      <button @click="addItem" class="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-1 whitespace-nowrap">
        <PlusIcon class="w-4 h-4" /> Add Item
      </button>
    </div>

    
    <div v-if="showMobileSearch" class="absolute left-0 right-0 top-full bg-white p-3 shadow-md sm:hidden">
      <input type="text" v-model="keyword" placeholder="Search products..." class="w-full pl-10 pr-3 py-2 border rounded-lg outline-none" />
      <MagnifyingGlassIcon class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
    </div>

  </header>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useUIStore } from "../stores/ui";
import { BellIcon, PlusIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

const router = useRouter();
const ui = useUIStore();

const keyword = ref(ui.search);
const showNotif = ref(false);
const showMobileSearch = ref(false);

watch(keyword, (val) => ui.setSearch(val));

function toggleNotifs() { showNotif.value = !showNotif.value }
function addItem() { router.push("/products/new") }
</script>
