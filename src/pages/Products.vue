<template>
  <div class="w-full p-3 sm:p-4">
 
    <div class="flex flex-col gap-4 mb-6">
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
      >
        <div>
          <h1 class="text-2xl font-bold">Products</h1>
          <h2 class="text-sm text-gray-600">
            Manage your inventory and view product performance
          </h2>
        </div>

        <button
          @click="goAdd"
          class="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg w-full sm:w-auto justify-center"
        >
          <div
            class="w-6 h-6 bg-white rounded-full flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 text-blue-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
              />
            </svg>
          </div>
          Add Product Item
        </button>
      </div>

     
      <div class="relative w-full sm:w-1/2">
        <input
          type="text"
          v-model="ui.search"
          placeholder="Search products..."
          class="w-full pl-10 pr-3 py-2 border rounded-lg outline-none"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-4.35-4.35M9.5 17a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
          />
        </svg>
      </div>
    </div>

   
    <div v-if="store.isLoading" class="p-6 bg-white rounded shadow">
      <Spinner />
    </div>

   
    <div v-if="store.error" class="text-red-600 p-4">{{ store.error }}</div>

    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
      <div
        v-for="p in displayedProducts"
        :key="p.id"
        class="bg-white rounded-xl shadow-sm hover:shadow-md border p-4 flex flex-col justify-between relative"
      >
        <div class="flex items-center gap-3 mb-3">
          <img
            :src="p.thumbnail"
            class="w-16 h-16 rounded-full object-cover shadow-sm"
          />
          <div class="flex-1">
            <div class="font-medium text-lg leading-tight">{{ p.title }}</div>
            <div class="text-gray-500 text-sm">
              {{ truncate(p.description, 60) }}
            </div>
          </div>
        </div>

        <div
          class="flex flex-wrap justify-between text-sm text-gray-600 mt-2 gap-2"
        >
          <div class="capitalize">{{ p.category }}</div>
          <div>${{ p.price }}</div>
          <div>Stock: {{ p.stock }}</div>
        </div>

      
        <div class="absolute top-4 right-4">
          <button
            @click="menuOpen = menuOpen === p.id ? null : p.id"
            class="text-xl px-2 hover:bg-gray-200 rounded"
          >
            ⋮
          </button>
          <div
            v-if="menuOpen === p.id"
            class="absolute right-0 mt-2 bg-white border shadow rounded w-32 z-20"
          >
            <button
              @click="view(p.id)"
              class="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              View
            </button>
            <button
              @click="edit(p.id)"
              class="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Edit
            </button>
            <button
              @click="deleteProduct(p.id)"
              class="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="store.products.length > 6" class="mt-6 text-center">
      <button
        v-if="!showAll"
        @click="showAll = true"
        class="text-blue-600 underline"
      >
        {{ displayedProducts.length }} of {{ store.products.length }} — show all
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted } from "vue";
import AppLayout from "../layout/AppLayout.vue";
import Spinner from "../components/Spinner.vue";
import { useProductStore } from "../stores/products";
import { useUIStore } from "../stores/ui";
import { useRouter } from "vue-router";

export default {
  components: { AppLayout, Spinner },
  setup() {
    const store = useProductStore();
    const ui = useUIStore();
    const router = useRouter();
    const menuOpen = ref<number | null>(null);
    const showAll = ref(false);

    onMounted(() => store.fetchProducts());

    const displayedProducts = computed(() => {
      const filtered = store.products.filter((p) =>
        p.title.toLowerCase().includes(ui.search.toLowerCase())
      );
      return showAll.value ? filtered : filtered.slice(0, 6);
    });

    function view(id: number) {
      router.push(`/products/${id}`);
    }
    function edit(id: number) {
      router.push(`/products/${id}?edit=true`);
    }
    async function deleteProduct(id: number) {
      await store.deleteProduct(id);
      ui.notify(`Deleted product ID ${id}`);
      menuOpen.value = null;
    }

    function truncate(text: string, len = 100) {
      return text && text.length > len ? text.slice(0, len) + "…" : text;
    }
    function goAdd() {
      router.push("/products/new");
    }

    return {
      store,
      ui,
      displayedProducts,
      menuOpen,
      showAll,
      view,
      edit,
      deleteProduct,
      truncate,
      goAdd,
    };
  },
};
</script>
