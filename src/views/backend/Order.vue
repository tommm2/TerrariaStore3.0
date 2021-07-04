<template>
  <div>
    <div class="container">
      <table class="table mt-5">
        <thead class="text-white bg-dark">
          <tr>
            <th>購買時間</th>
            <th>Email</th>
            <th>購買款項</th>
            <th>應付金額</th>
            <th>是否付款</th>
          </tr>
        </thead>
        <tbody v-if="orders.length">
          <tr v-for="(item, key) in sortOrder" :key="key" :class="{'text-secondary': !item.is_paid}">
            <td>{{ item.create_at | date }}</td>
            <td><span v-text="item.user.email" v-if="item.user"></span></td>
            <td>
              <ul class="list-unstyled">
                <li v-for="(product, i) in item.products" :key="i">
                  {{ product.product.title }} 數量：{{ product.qty }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="text-right">{{ item.total | currency }}</td>
            <td>
              <strong v-if="item.is_paid" class="text-success">已付款</strong>
              <span v-else class="text-muted">尚未起用</span>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination :pages="pagination" @handle="getOrders"/>
    </div>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination.vue'
export default {
  data () {
    return {
      orders: {},
      isNew: false,
      pagination: {}
    }
  },
  components: {
    Pagination
  },
  methods: {
    getOrders (page = 1) {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`
      vm.$store.dispatch('updateLoading', true)
      vm.$http.get(url, vm.tempProduct).then((response) => {
        vm.orders = response.data.orders
        vm.pagination = response.data.pagination
        vm.$store.dispatch('updateLoading', false)
      })
    }
  },
  computed: {
    sortOrder () {
      const vm = this
      let newOrder = []
      if (vm.orders.length) {
        newOrder = vm.orders.sort((a, b) => {
          const aIsPaid = a.is_paid ? 1 : 0
          const bIsPaid = b.is_paid ? 1 : 0
          return bIsPaid - aIsPaid
        })
      }
      return newOrder
    }
  },
  created () {
    const vm = this
    vm.getOrders()
  }
}
</script>
<style lang="scss" scoped>
</style>
