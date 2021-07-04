<template>
  <div>
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
                v-model="tempCoupon.due_date">
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
            <button type="button" class="btn btn-outline-primary w-25" @click="emitAddCoupon">
              <i class="fas fa-check"></i>
              <span class="ml-2" v-if="isNew">新增</span>
              <span class="ml-2" v-else>修改</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['isNew', 'tempCoupon'],
  methods: {
    emitAddCoupon () {
      const vm = this
      vm.$emit('emitAddCoupon')
    }
  }
}
</script>
