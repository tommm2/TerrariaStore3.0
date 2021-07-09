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
    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-dark text-light font-weight-bold">
            <h5 class="modal-title" id="exampleModalLabel" v-if="isNew">新增優惠卷</h5>
            <h5 class="modal-title" id="exampleModalLabel" v-else>修改優惠卷</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">優惠卷名稱</label>
              <input type="text" class="form-control" id="title" v-model="tempCoupon.title"
                placeholder="請輸入標題">
            </div>
            <div class="form-group">
              <label for="coupon_code">優惠碼</label>
              <input type="text" class="form-control" id="coupon_code" v-model="tempCoupon.code"
                placeholder="請輸入優惠碼">
            </div>
            <div class="form-group">
              <label for="due_date">到期日</label>
              <input type="date" class="form-control" id="due_date"
                v-model="due_date">
            </div>
            <div class="form-group">
              <label for="price">折扣百分比</label>
              <input type="number" class="form-control" id="price"
                v-model="tempCoupon.percent" placeholder="請輸入折扣百分比">
            </div>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox"
                  :true-value="1"
                  :false-value="0"
                  v-model="tempCoupon.is_enabled" id="is_enabled">
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-danger w-25" data-dismiss="modal">
            <i class="fas fa-times"></i><span class="ml-2">取消</span>
            </button>
            <button type="button" class="btn btn-outline-primary w-25" @click="addCoupon">
              <i class="fas fa-check"></i>
              <span class="ml-2" v-if="isNew">新增</span>
              <span class="ml-2" v-else>修改</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Delete modal -->
    <CouponDelModal :delItem="delItem" @emitDelCoupon="delCoupon"/>
  </div>
</template>
<script>
import $ from 'jquery'
import Pagination from '@/components/Pagination.vue'
import CouponDelModal from '@/components/CouponDelModal.vue'
export default {
  components: {
    Pagination,
    CouponDelModal
  },
  props: {
    config: Object
  },
  data () {
    return {
      coupons: {},
      tempCoupon: {
        id: '',
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
        const dateAndTime = new Date(vm.due_date * 1000).toISOString().split('T')
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
      vm.due_date = new Date(vm.due_date * 1000)
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
</style>
