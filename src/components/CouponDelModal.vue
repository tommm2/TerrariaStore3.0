<template>
  <div>
    <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title font-weight-bold" id="exampleModalLongTitle">刪除確認</h5>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body text-center mt-2 mb-2">
            確定要刪除<span class="font-weight-bold mr-2 ml-2">{{delItem.title}}</span>嗎??
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-danger w-25" data-dismiss="modal">
              <i class="fas fa-times"></i><span class="ml-2">取消</span>
            </button>
            <button type="button" class="btn btn-outline-primary w-25" @click="emitDelCoupon(delItem)">
              <i class="fas fa-check"></i><span class="ml-2">刪除</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['delItem'],
  methods: {
    emitDelCoupon (item) {
      const vm = this
      vm.$emit('emitDelCoupon', item)
    }
  }
}
</script>
