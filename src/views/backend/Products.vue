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
                        <td>{{product.category}}</td>
                        <td class="d-flex justify-content-between">
                        <img width="40" :src="product.imageUrl">
                        <span>{{product.title}}</span>
                        </td>
                        <td class="text-right">{{product.origin_price | currency}}</td>
                        <td class="text-right">{{product.price | currency}}</td>
                        <td class="text-right font-weight-bold">
                            <span class="text-success" v-if="product.is_enabled">啟用</span>
                            <span class="text-danger" v-else>未啟用</span>
                        </td>
                        <td class="text-center">
                            <button class="btn btn-outline-secondary mr-2" @click="showModal(false,product)">
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
              <input type="text" class="form-control" id="image"
                placeholder="請輸入圖片連結">
            </div>
            <div class="form-group">
              <label class="font-weight-bold" for="customFile">或 上傳圖片
                <img v-if="status.filesLoading" width="40" src="@/assets/image/loading-img2.gif">
              </label>
              <input type="file" id="customFile" class="form-control"
                ref="files" @change="uploadFile">
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
                <input type="text" class="form-control" id="category"
                  placeholder="請輸入分類" v-model="temProduct.category">
              </div>
              <div class="form-group col-md-6">
                <label class="font-weight-bold" for="price">單位</label>
                <input type="unit" class="form-control" id="unit"
                  placeholder="請輸入單位" v-model="temProduct.unit">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
              <label class="font-weight-bold" for="origin_price">原價</label>
                <input type="number" class="form-control" id="origin_price"
                  placeholder="請輸入原價" v-model="temProduct.origin_price">
              </div>
              <div class="form-group col-md-6">
                <label class="font-weight-bold" for="price">售價</label>
                <input type="number" class="form-control" id="price"
                  placeholder="請輸入售價" v-model="temProduct.price">
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
        <button type="button" class="btn btn-outline-primary w-25" @click="addProduct">
            <i class="fas fa-check"></i>
            <span class="ml-2" v-if="isNew === true">新增</span>
            <span class="ml-2" v-else>修改</span>
        </button>
      </div>
    </div>
  </div>
        </div>

        <!--del-product-modal -->
        <div class="modal fade" id="delModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title" id="exampleModalLongTitle">刪除確認</h5>
                    <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body text-center mt-3 mb-3">
                    確定要刪除<span class="font-weight-bold mr-1 ml-2">
                            <img :src="delItem.imageUrl">
                            {{delItem.title}}
                        </span>嗎??
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-danger w-25" data-dismiss="modal">
                        <i class="fas fa-times"></i><span class="ml-2">取消</span>
                    </button>
                    <button type="button" class="btn btn-outline-primary w-25" @click="delProduct(delItem)">
                        <i class="fas fa-check"></i><span class="ml-2">刪除</span>
                    </button>
                </div>
                </div>
            </div>
        </div>
   </div>
</template>
<script>
import $ from 'jquery'
import Pagination from '@/components/Pagination.vue'
export default {
  components: {
    Pagination
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
    },
    uploadFile () {
      const vm = this
      const uploadData = vm.$refs.files.files[0]
      const formData = new FormData()
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`
      vm.status.filesLoading = true
      formData.append('file-to-upload', uploadData)
      vm.$http.post(api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        if (res.data.success) {
          vm.$set(vm.temProduct, 'imageUrl', res.data.imageUrl)
          vm.$bus.$emit('message:push', '上傳成功', 'success')
        } else {
          vm.$bus.$emit('message:push', '上傳失敗', 'danger')
        }
        vm.status.filesLoading = false
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
