import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../services/api'

export const useProductStore = defineStore('products', () => {
  const products = ref<any[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchProducts(q?: {search?:string, limit?:number, skip?: number}) {
    isLoading.value = true
    error.value = null
    try {
      // search fallback
      if (q?.search) {
        const res = await api.get(`/products/search`, { params: { q: q.search, limit: q.limit ?? 100 } })
        products.value = res.data.products
      } else {
        const res = await api.get('/products', { params: { limit: q?.limit ?? 100 } })
        products.value = res.data.products
      }
    } catch (err: any) {
      error.value = err?.message || 'Failed to load products'
    } finally {
      isLoading.value = false
    }
  }

  async function fetchProductById(id: number) {
    try {
      const found = products.value.find(p => p.id === id)
      if (found) return found
      const res = await api.get(`/products/${id}`)
      return res.data
    } catch (err) {
      throw err
    }
  }

  async function addProduct(payload: any) {
    isLoading.value = true
    try {
      const res = await api.post('/products/add', payload)
      // DummyJSON returns created product
      products.value.unshift(res.data)
      return res.data
    } finally {
      isLoading.value = false
    }
  }

  async function updateProduct(id: number, payload: any) {
    isLoading.value = true
    try {
      const res = await api.put(`/products/${id}`, payload)
      const idx = products.value.findIndex(p => p.id === id)
      if (idx !== -1) products.value[idx] = res.data
      return res.data
    } finally {
      isLoading.value = false
    }
  }

  async function deleteProduct(id: number) {
    isLoading.value = true
    try {
      const res = await api.delete(`/products/${id}`)
      products.value = products.value.filter(p => p.id !== id)
      return res.data
    } finally {
      isLoading.value = false
    }
  }

  return { products, isLoading, error, fetchProducts, fetchProductById, addProduct, updateProduct, deleteProduct }
})
