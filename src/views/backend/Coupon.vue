<template>
  <div>
    <Loading :isLoading="isLoading"/>
    <div class="container">
      <div class="text-right">
        <button type="button" class="btn btn-outline-primary" @click="openCouponModal(true)">
          <i class="fas fa-cart-plus mr-2"></i>建立新的優惠券
        </button>
      </div>
      <table class="table mt-4">
        <thead class="bg-dark text-white">
          <tr>
            <th>名稱</th>
            <th>折扣百分比</th>
            <th>到期日</th>
            <th>狀態</th>
            <th>編輯 / 刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in coupons" :key="key">
            <td>{{ item.title }}</td>
            <td>{{ item.percent }}%</td>
            <td>{{ item.due_date | date }}</td>
            <td>
              <span v-if="item.is_enabled === 1" class="text-success font-weight-bold">啟用</span>
              <span v-else class="text-danger font-weight-bold">未起用</span>
            </td>
            <td>
            <button type="button" class="btn btn-outline-secondary mr-1" @click="openCouponModal(false, item)">
                  <i class="fas fa-edit"></i>
              </button>
              <button type="button" class="btn btn-outline-danger" @click="delCouponModal(item)">
                  <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination :pages="pagination" @handle="getCoupons"/>
    </div>
    <!-- Add & Edit modal -->
    <CouponAddModal :isNew="isNew" :tempCoupon="tempCoupon" @emitAddCoupon="addCoupon"/>
    <!-- Delete modal -->
    <CouponDelModal :delItem="delItem" :due_date="due_date" @emitDelCoupon="delCoupon" />
  </div>
</template>
<script>
import $ from 'jquery'
import Pagination from '@/components/Pagination.vue'
import CouponAddModal from '@/components/CouponAddModal.vue'
import CouponDelModal from '@/components/CouponDelModal.vue'
export default {
  components: {
    Pagination,
    CouponAddModal,
    CouponDelModal
  },
  props: {
    config: Object
  },
  data () {
    return {
      coupons: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        due_date: 0,
        code: ''
      },
      pagination: {},
      delItem: {},
      due_date: new Date(),
      isNew: false,
      isLoading: false
    }
  },
  watch: {
    due_date () {
      const vm = this
      const timestamp = Math.floor(new Date(vm.due_date) / 1000)
      vm.tempCoupon.due_date = timestamp
    }
  },
  methods: {
    openCouponModal (isNew, item) {
      const vm = this
      $('#couponModal').modal('show')
      vm.isNew = isNew
      if (vm.isNew) {
        vm.tempCoupon = {}
      } else {
        vm.tempCoupon = { ...item }
        const dateAndTime = new Date(vm.tempCoupon.due_date * 1000).toISOString().split('T')
        vm.due_date = dateAndTime[0]
      }
    },
    getCoupons (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`
      vm.$store.dispatch('updateLoading', true)
      vm.$http.get(api, vm.tempProduct).then((res) => {
        vm.coupons = res.data.coupons
        vm.$store.dispatch('updateLoading', false)
        vm.pagination = res.data.pagination
      })
    },
    addCoupon () {
      const vm = this
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`
      let ajaxMethod = 'post'
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
        ajaxMethod = 'put'
      }
      vm.$store.dispatch('updateLoading', true)
      vm.due_date = new Date(vm.tempCoupon.due_date * 1000)
      vm.$http[ajaxMethod](api, { data: vm.tempCoupon }).then((res) => {
        if (res.data.success) {
          $('#couponModal').modal('hide')
          vm.$bus.$emit('message:push', res.data.message, 'success')
          vm.getCoupons()
        } else {
          vm.$bus.$emit('message:push', res.data.message, 'danger')
        }
        vm.$store.dispatch('updateLoading', false)
      })
    },
    delCouponModal (item) {
      const vm = this
      vm.delItem = item
      $('#delCouponModal').modal('show')
    },
    delCoupon (item) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${item.id}`
      vm.$store.dispatch('updateLoading', true)
      vm.$http.delete(api).then((res) => {
        if (res.data.success) {
          vm.coupons = res.data.coupons
          vm.$bus.$emit('message:push', res.data.message, 'success')
          vm.getCoupons()
          $('#delCouponModal').modal('hide')
        } else {
          vm.$bus.$emit('message:push', res.data.message, 'danger')
        }
        vm.$store.dispatch('updateLoading', false)
      })
    }
  },
  created () {
    const vm = this
    vm.getCoupons()
  }
}
</script>
<style lang="scss" scoped>
  .wavy{
      position: relative;
      -webkit-box-reflect: below -12px linear-gradient(transparent, rgba(0, 0, 0, 0.2));
      span{
        position: relative;
        display: inline-block;
        animation: animate 1s ease-in-out infinite;
        animation-delay: calc(.1s*var(--i))
      }
  }
  @keyframes animate{
      0%{
          transform: translateY(0px)
      }
      20%{
          transform: translateY(-24px)
      }
      40%, 100%{
          transform: translateY(0px)
      }
  }
</style>
