<template>
  <div>
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span class="font-weight-bold" v-if="isNew">新增產品</span>
              <span class="font-weight-bold" v-else>修改產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span class="text-light" aria-hidden="true"><i class="fas fa-times"></i></span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label class="font-weight-bold" for="image">輸入圖片網址</label>
                  <input type="text" class="form-control" id="image" placeholder="請輸入圖片連結">
                </div>
                <div class="form-group">
                  <label class="font-weight-bold" for="customFile">或 上傳圖片
                    <img v-if="status.filesLoading" width="40" src="@/assets/image/loading-img2.gif">
                  </label>
                  <input type="file" id="customFile" class="form-control" ref="files" @change="emitUpload">
                </div>
                <img :src="temProduct.imageUrl">
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label class="font-weight-bold" for="title">標題</label>
                  <input type="text" class="form-control" id="title"
                    placeholder="請輸入標題" v-model="temProduct.title">
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label class="font-weight-bold" for="category">分類</label>
                    <input type="text" class="form-control" id="category" placeholder="請輸入分類" v-model="temProduct.category">
                  </div>
                  <div class="form-group col-md-6">
                    <label class="font-weight-bold" for="price">單位</label>
                    <input type="unit" class="form-control" id="unit" placeholder="請輸入單位" v-model="temProduct.unit">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                  <label class="font-weight-bold" for="origin_price">原價</label>
                    <input type="number" class="form-control" id="origin_price" placeholder="請輸入原價" v-model="temProduct.origin_price">
                  </div>
                  <div class="form-group col-md-6">
                    <label class="font-weight-bold" for="price">售價</label>
                    <input type="number" class="form-control" id="price" placeholder="請輸入售價" v-model="temProduct.price">
                  </div>
                </div>
                <hr>
                <div class="form-group">
                  <label class="font-weight-bold" for="description">產品描述</label>
                  <textarea type="text" class="form-control" id="description"
                  placeholder="請輸入產品描述" v-model="temProduct.description"></textarea>
                </div>
                <div class="form-group">
                  <label class="font-weight-bold" for="content">說明內容</label>
                  <textarea type="text" class="form-control" id="content"
                    placeholder="請輸入產品說明內容" v-model="temProduct.content"></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                      id="is_enabled" v-model="temProduct.is_enabled" :true-value="1" :false-value="0">
                    <label class="form-check-label" for="is_enabled">
                      <span class="font-weight-bold">是否啟用</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-danger w-25" data-dismiss="modal">
                <i class="fas fa-times"></i><span class="ml-2">取消</span>
            </button>
            <button type="button" class="btn btn-outline-primary w-25" @click="emitAddProduct">
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
  props: ['temProduct', 'isNew', 'status'],
  methods: {
    emitUpload () {
      const vm = this
      vm.$emit('imgUpload')
    },
    emitAddProduct () {
      const vm = this
      vm.$emit('addProduct')
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
