<template>
  <div>
    <div class="container">
      <div class="text-right">
        <button class="btn btn-primary text-white" @click="showModal(true)">
          <i class="fas fa-cart-plus"></i>
          <span>建立新商品</span>
        </button>
      </div>
      <table class="table mt-3">
        <thead class="bg-dark text-light">
          <th width="120">分類</th>
          <th class="text-center" width="150">產品名稱</th>
          <th class="text-center" width="120">原價</th>
          <th class="text-center" width="120">售價</th>
          <th width="120" class="text-right">狀態</th>
          <th width="120" class="text-center">Edit</th>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
          <td>{{ product.category }}</td>
          <td class="d-flex justify-content-between">
            <img width="40" :src="product.imageUrl">
            <span>{{product.title}}</span>
          </td>
          <td class="text-right">{{ product.origin_price | currency }}</td>
          <td class="text-right">{{ product.price | currency }}</td>
          <td class="text-right font-weight-bold">
            <span class="text-success" v-if="product.is_enabled">啟用</span>
            <span class="text-danger" v-else>未啟用</span>
          </td>
          <td class="text-center">
            <button class="btn btn-outline-secondary mr-2" @click="showModal(false, product)">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-outline-danger" @click="delModal(product)">
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
          </tr>
        </tbody>
      </table>
      <Pagination :pages="pagination" @handle="getProduct"/>
    </div>
    <!-- Add & Edit modal -->
    <ProductAddModal :temProduct="temProduct" :isNew="isNew" :status="status" @addProduct="addProduct"/>
    <!-- Delete modal -->
    <ProductDelModal :delItem="delItem" @emitDelProduct="delProduct"/>
  </div>
</template>
<script>
import $ from 'jquery'
import Pagination from '@/components/Pagination.vue'
import ProductAddModal from '@/components/ProductAddModal.vue'
import ProductDelModal from '@/components/ProductDelModal.vue'
export default {
  components: {
    Pagination,
    ProductAddModal,
    ProductDelModal
  },
  data () {
    return {
      products: [],
      temProduct: {
        title: '',
        category: '',
        origin: '',
        unit: '',
        image: '',
        description: '',
        is_enabled: '',
        imageUrl: ''
      },
      pagination: {},
      delItem: {},
      isNew: false,
      status: {
        filesLoading: false
      }
    }
  },
  methods: {
    getProduct (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`
      vm.$store.dispatch('updateLoading', true)
      vm.$http.get(api).then((res) => {
        if (res.data.success) {
          vm.products = res.data.products
          vm.pagination = res.data.pagination
        } else {
          vm.$bus.$emit('message:push', res.data.message, 'danger')
        }
        vm.$store.dispatch('updateLoading', false)
      })
    },
    showModal (isNew, item) {
      const vm = this
      $('#productModal').modal('show')
      if (isNew) {
        vm.temProduct = {}
        vm.isNew = true
      } else {
        vm.temProduct = { ...item }
        vm.isNew = false
      }
    },
    delModal (item) {
      const vm = this
      $('#delModal').modal('show')
      vm.delItem = item
    },
    addProduct (item) {
      const vm = this
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`
      let ajaxMethod = 'post'
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.temProduct.id}`
        ajaxMethod = 'put'
      }
      vm.$store.dispatch('updateLoading', true)
      vm.$http[ajaxMethod](api, { data: vm.temProduct }).then((res) => {
        if (res.data.success) {
          vm.products = res.data.products
          vm.getProduct()
          $('#productModal').modal('hide')
          vm.$bus.$emit('message:push', res.data.message, 'success')
        } else {
          vm.$bus.$emit('message:push', res.data.message, 'danger')
        }
        vm.$store.dispatch('updateLoading', false)
      })
    },
    delProduct (item) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${item.id}`
      vm.$store.dispatch('updateLoading', true)
      vm.$http.delete(api, { data: vm.temProduct }).then((res) => {
        if (res.data.success) {
          vm.delItem = {}
          vm.temProduct = {}
          vm.getProduct()
          $('#delModal').modal('hide')
          vm.$bus.$emit('message:push', res.data.message, 'success')
        } else {
          vm.$bus.$emit('message:push', res.data.message, 'danger')
        }
        vm.$store.dispatch('updateLoading', false)
      })
    }
  },
  created () {
    const vm = this
    vm.getProduct()
  }
}
</script>
<style lang="scss" scoped>
</style>
