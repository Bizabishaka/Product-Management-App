<template>
  <div class="p-6">
    <button @click="$router.back()" class="mb-4 text-sm underline">← Back</button>

    <div v-if="loading" class="p-6 bg-white rounded shadow">
      <Spinner />
    </div>

    <div v-if="product" class="bg-white rounded shadow p-6 flex flex-col md:flex-row gap-6">
      <!-- Left: Product Image -->
      <div class="shrink-0 md:w-1/3">
        <img :src="product.thumbnail" alt="thumb" class="w-full h-64 object-cover rounded" />
      </div>

      <!-- Right: Product Details -->
      <div class="flex-1 flex flex-col gap-4">
        <h1 class="text-2xl font-bold text-primary">{{ product.title }}</h1>

        <div class="flex gap-4 text-gray-700 font-medium">
          <div>Category: {{ product.category }}</div>
          <div>Price: ${{ product.price }}</div>
        </div>

        <p class="text-gray-600">{{ product.description }}</p>

        <!-- Rating Chart -->
        <div v-if="product.rating" class="mt-4">
          <canvas ref="ratingChart" class="w-full h-48"></canvas>
        </div>

        <!-- Actions -->
        <div class="flex gap-3 mt-4">
          <button @click="onDelete" class="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
        </div>
      </div>
    </div>

    <div v-if="error" class="text-red-600 mt-4">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductStore } from "../stores/products";
import Spinner from "../components/Spinner.vue";

import { Chart, registerables } from "chart.js/auto";
Chart.register(...registerables);

export default {
  components: { Spinner },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useProductStore();

    const id = Number(route.params.id);
    const product = ref<any | null>(null);
    const loading = ref(true);
    const error = ref<string | null>(null);
    const ratingChart = ref<HTMLCanvasElement | null>(null);

    onMounted(async () => {
      try {
        const p = await store.fetchProductById(id);
        product.value = p;

        // Render Chart
        if (product.value.rating && ratingChart.value) {
          new Chart(ratingChart.value, {
            type: "bar",
            data: {
              labels: ["Rating"],
              datasets: [
                {
                  label: "Customer Rating",
                  data: [product.value.rating],
                  backgroundColor: "#3b82f6", // blue
                  borderRadius: 6,
                },
              ],
            },
            options: {
              responsive: true,
              scales: {
                y: {
                  min: 0,
                  max: 5,
                },
              },
              plugins: {
                legend: {
                  display: false,
                },
              },
            },
          });
        }
      } catch (err) {
        error.value = "Failed to load product";
      } finally {
        loading.value = false;
      }
    });

    async function onDelete() {
      if (!confirm("Delete this product?")) return;
      try {
        await store.deleteProduct(id);
        router.push("/products");
      } catch (err) {
        alert("Failed to delete");
      }
    }

    return { product, loading, error, onDelete, ratingChart };
  },
};
</script>

<style scoped>
/* optional styling tweaks */
</style>
