<template>
  <aside
    :class="[
      'bg-white shadow-lg flex flex-col justify-between h-screen fixed sm:static z-20 transition-transform w-64',
      mobileSidebarClass
    ]"
  >
    
    <div>
      <div class="p-6 font-bold text-xl">PlatformLogo</div>
      <nav class="mt-4">
        <RouterLink to="/dashboard" class="flex items-center gap-3 p-4 hover:bg-gray-100 rounded">
          <HomeIcon class="w-5 h-5 text-gray-600" /> Dashboard
        </RouterLink>
        <RouterLink to="/products" class="flex items-center gap-3 p-4 hover:bg-gray-100 rounded">
          <CubeIcon class="w-5 h-5 text-gray-600" /> Products
        </RouterLink>
        <RouterLink to="/orders" class="flex items-center gap-3 p-4 hover:bg-gray-100 rounded">
          <ClipboardDocumentListIcon class="w-5 h-5 text-gray-600" /> Orders
        </RouterLink>
        <RouterLink to="/customers" class="flex items-center gap-3 p-4 hover:bg-gray-100 rounded">
          <UserGroupIcon class="w-5 h-5 text-gray-600" /> Customers
        </RouterLink>
      </nav>
    </div>

   
    <div class="mb-4">
      <RouterLink to="/settings" class="flex items-center gap-3 p-4 hover:bg-gray-100 rounded">
        <Cog6ToothIcon class="w-5 h-5 text-gray-600" /> Settings
      </RouterLink>

      <button @click="logout" class="flex items-center gap-2 p-4 text-left w-full hover:bg-red-100 text-red-600 rounded">
        <ArrowLeftOnRectangleIcon class="w-5 h-5" /> Logout
      </button>
    </div>
  </aside>

  <!-- Mobile overlay -->
  <div v-if="isOpen" @click="$emit('close')" class="fixed inset-0 bg-black opacity-50 sm:hidden z-10"></div>
</template>

<script setup lang="ts">
import {
  HomeIcon,
  CubeIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { computed } from 'vue';

const props = defineProps<{ isOpen: boolean }>()
const emit = defineEmits(['close'])
const router = useRouter()
const auth = useAuthStore()


const mobileSidebarClass = computed(() => {
  return window.innerWidth >= 640 ? 'translate-x-0' : (props.isOpen ? 'translate-x-0' : '-translate-x-full')
})

function logout() {
  auth.logout()
  router.push('/login')
}
</script>
