<template>
  <div class="p-4 sm:p-6">

    
    <h2 class="text-2xl font-semibold text-primary mb-1">Add Product</h2>
    <p class="text-gray-600 mb-4 sm:mb-6">Enter your details</p>

   
    <form 
      @submit.prevent="saveProduct" 
      class="bg-white p-6 sm:p-8 rounded-2xl shadow-md space-y-6 border border-gray-100 max-w-3xl mx-auto"
    >

      
      <h3 class="text-lg sm:text-xl font-semibold text-gray-800 pb-2 border-b">
        Product Information
      </h3>

      
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

        
        <div>
          <label class="block text-sm font-medium mb-1">Title</label>
          <input 
            v-model="form.title" 
            required 
            class="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

       
        <div>
          <label class="block text-sm font-medium mb-1">Category</label>
          <input 
            v-model="form.category" 
            class="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        
        <div>
          <label class="block text-sm font-medium mb-1">Price</label>
          <input 
            v-model.number="form.price" 
            type="number" 
            class="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        
        <div>
          <label class="block text-sm font-medium mb-1">Stock</label>
          <input 
            v-model.number="form.stock" 
            type="number" 
            class="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

      </div>

      
      <div>
        <label class="block text-sm font-medium mb-1">Description</label>
        <textarea 
          v-model="form.description" 
          rows="3"
          class="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        ></textarea>
      </div>

      
      <div>
        <label class="block text-sm font-medium mb-1">Media</label>

        
        <label 
          for="media"
          class="w-full cursor-pointer p-4 border-2 border-dashed rounded-xl flex flex-col items-center gap-2 hover:bg-gray-50 transition text-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-8 h-8 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 15a4 4 0 004 4h10a4 4 0 004-4M7 10l5-5m0 0l5 5m-5-5v12" />
          </svg>
          <span class="text-gray-600 text-sm sm:text-base">
            Click to upload image
          </span>
        </label>

        <input 
          id="media"
          type="file"
          accept="image/*"
          @change="handleMediaUpload"
          class="hidden"
        />

      
        <div v-if="previewImage" class="mt-3 flex justify-center sm:justify-start">
          <img 
            :src="previewImage" 
            alt="preview" 
            class="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-xl border shadow"
          >
        </div>
      </div>

      
      <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">

        <button 
          type="submit"
          class="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Save
        </button>

        <button 
          type="button"
          @click="$router.back()" 
          class="w-full sm:w-auto px-6 py-2.5 border rounded-lg hover:bg-gray-100 transition"
        >
          Cancel
        </button>

      </div>

    </form>

    
    <p 
      v-if="message" 
      class="text-green-600 mt-4 font-medium animate-pulse text-center"
    >
      {{ message }}
    </p>

  </div>
</template>

<script lang="ts">
import { reactive, ref } from 'vue'
import { useProductStore } from '../stores/products'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const store = useProductStore()

    const form = reactive({
      title: '',
      description: '',
      category: '',
      price: 0,
      stock: 0,
      mediaFile: null as File | null,
    })

    const previewImage = ref<string | null>(null)
    const message = ref('')

    function handleMediaUpload(e: Event) {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        form.mediaFile = file
        previewImage.value = URL.createObjectURL(file)
      }
    }

    async function saveProduct() {
      try {
        const fd = new FormData()
        fd.append("title", form.title)
        fd.append("description", form.description)
        fd.append("category", form.category)
        fd.append("price", form.price.toString())
        fd.append("stock", form.stock.toString())
        if (form.mediaFile) fd.append("media", form.mediaFile)

        const created = await store.addProduct(fd)

        message.value = "Product saved successfully! 🎉"
        router.push(`/products/${created.id}`)

      } catch (err) {
        alert("Failed to save 😭")
      }
    }

    return {
      form,
      saveProduct,
      handleMediaUpload,
      previewImage,
      message,
    }
  }
}
</script>
