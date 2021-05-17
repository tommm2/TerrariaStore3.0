<template>
    <div>
        <Loading :isLoading="isLoading"/>
        <div class="wrap">
            <div class="container p-lg-5 pt-sm-5">
                <div class="row justify-content-center">
                    <div class="col-lg-8 col-sm-12 mb-sm-5 mb-lg-0 pb-4" v-if="cart.carts">
                        <stepBar :status="status"></stepBar>
                        <h5 class="text-center pb-4 font-weight-bold">購物車列表</h5>
                        <div class="table-list" v-if="cart.carts.length !== 0">
                            <table  class="table text-white">
                                <thead class="bg-primary">
                                    <th>品名</th>
                                    <th>數量</th>
                                    <th>價錢</th>
                                    <th>刪除</th>
                                </thead>
                                <tbody>
                                  <tr v-for="item in cart.carts" :key="item.id">
                                    <td>
                                        <img width="30" :src="item.product.imageUrl" :alt="item.product.title">
                                        <span class="d-md-inline d-sm-block">
                                            {{item.product.title }}
                                        </span>
                                        <div class="text-success" v-if="item.coupon">
                                            已套用優惠券
                                        </div>
                                    </td>
                                    <td>{{ item.qty }}/{{ item.product.unit }}</td>
                                    <td>{{ item.final_total | currency}}</td>
                                    <td>
                                        <i @click="delCart(item.id)" class="fas fa-trash-alt"></i>
                                    </td>
                                  </tr>
                                </tbody>
                            </table>
                        </div>
                        <div v-if="cart.carts.length === 0" class="no-item-res text-white text-center font-weight-bold">
                            <i class="fas fa-cart-arrow-down mr-2"></i>空無一物的購物車
                        </div>
                        <div class="price pt-3  d-flex justify-content-around font-weight-bold">
                            <p class="text-muted">總計 {{cart.total | currency}}</p>
                            <p v-if="cart.total !== cart.final_total" class="text-success">折扣價 {{cart.final_total | currency}}</p>
                        </div>
                        <div class="input-group mb-3">
                            <input type="text" v-model="coupon_code" class="form-control" placeholder="ex :試試eee">
                            <div class="input-group-append">
                                <button disabled v-if="coupon_code === ''" class="btn btn-outline-primary" type="button">
                                套用優惠碼
                                </button>
                                <button v-else class="btn btn-outline-primary" type="button" @click="enterCoupon()">
                                套用優惠碼
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8 col-sm-12">
                        <h5 class="text-center pb-4 font-weight-bold">買家資訊</h5>
                        <form  @submit.prevent="createOrder">
                            <div class="form-group">
                                <label for="email">收件人電子郵件</label>
                                <input v-model="form.user.email" :class="{'invalid':errors.has('email')}" v-validate="'required|email'" class="w-100" name="email" id="email" type="email" placeholder="請輸入email">
                                <span v-if="errors.has('email')" class="text-danger">
                                    * {{errors.first('email')}}
                                </span>
                            </div>

                            <div class="form-group">
                                <label for="username">收件人姓名</label>
                                <input v-model="form.user.name" :class="{'invalid':errors.has('name')}" v-validate="'required'" class=" w-100" name="name" id="username" type="text" placeholder="請輸入姓名">
                                <span v-if="errors.has('name')" class="text-danger">
                                    * 收件人姓名必填
                                </span>
                            </div>

                            <div class="form-group">
                                <label for="address">收件人地址</label>
                                <input v-model="form.user.address" :class="{'invalid':errors.has('address')}" v-validate="'required'" class=" w-100" name="address" id="address" type="text" placeholder="請輸入地址">
                                <span v-if="errors.has('address')" class="text-danger">
                                * 收件人地址必填
                                </span>
                            </div>
                            <div class="form-group">
                                <label for="tel">收件人電話</label>
                                <input v-model="form.user.tel" :class="{'invalid':errors.has('regex')}"
                                v-validate="{required:true,regex: /^[09]{2}[0-9]{8}$/}"
                                class="w-100" name="regex" id="tel" type="text" placeholder="請輸入電話">
                                <span v-if="errors.has('regex')" class="text-danger">
                                * 請輸入正確手機格式
                                </span>
                            </div>
                            <label for="comment">留言</label>
                            <textarea v-model="form.message" class="w-100" id="comment" rows="8"></textarea>
                            <button class="btn mt-4 mb-4 col-12 btn-outline-primary" type="submit">送出訂單</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import StepBar from '@/views/frontend/StepBar.vue'
import Loading from '@/components/Loading.vue'
export default {
  components: {
    StepBar,
    Loading
  },
  data () {
    return {
      cart: [],
      isLoading: false,
      delLoading: false,
      coupon_code: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      status: 1
    }
  },
  methods: {
    getCartList () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.isLoading = true
      vm.$http.get(api).then((res) => {
        vm.isLoading = false
        vm.cart = res.data.data
        vm.$bus.$emit('getCartNum', res.data.data.carts.length, res.data.data)
      })
    },
    enterCoupon () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const code = {
        code: vm.coupon_code
      }
      vm.isLoading = true
      vm.$http.post(api, { data: code }).then((res) => {
        if (res.data.success) {
          vm.$bus.$emit('message:push', '已套用優惠卷:)', 'primary')
        } else {
          vm.$bus.$emit('message:push', '還敢亂打優惠碼', 'danger')
        }
        vm.getCartList()
        vm.isLoading = false
      })
    },
    delCart (id) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      vm.isLoading = true
      vm.$http.delete(api).then((res) => {
        if (res.data.success) {
          vm.$bus.$emit('message:push', '商品刪除成功', 'primary')
        } else {
          vm.$bus.$emit('message:push', '商品刪除失敗', 'danger')
        }
        vm.getCartList()
        vm.isLoading = false
      })
    },
    createOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      const order = vm.form
      vm.$validator.validate().then((valid) => {
        if (valid) {
          this.$http.post(api, { data: order }).then((res) => {
            if (res.data.success) {
              vm.$router.push(`/customerCheckOut/${res.data.orderId}`)
            }
          })
        } else {
          vm.$bus.$emit('message:push', '表單未填寫完整', 'danger')
        }
      })
    }
  },
  created () {
    const vm = this
    vm.getCartList()
    vm.$bus.$emit('getRoute', vm.$route.path)
  }
}
</script>
<style lang="scss" scoped>
    .wrap{
        background-image: url('../../assets/image/tree-bg.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        padding: 200px 0;
        .container{
           background:rgba(0,0,0,0.8);
           border-radius: 10px;
        }
    }
    .table-list{
        display: block;
        overflow-y: auto;
        height: 300px;
        table{
            tr {
                width: 100%;
                border: none;
            }
            td {
                text-align: center;
                padding: 6px;
                i{
                    cursor: pointer;
                    transition: .3s ease;
                    &:hover{
                        color: #8fc866;
                    }
                }
            }
        }
    }
    .input-group{
        input{
            font-size: 20px;
            padding: 10px;
            border-radius: 5px;
            outline:none;
            border:2px solid #8fc866;
            background: rgba(0, 0, 0, 0);
            color:#fff;
        }
        button{
            font-size: 18px;
            &:hover{
                color:white;
            }
        }
    }
    .no-item-res{
        font-size:20px;
        background: gray;
        padding: 10px 0;
        border-radius: 10px;
    }
    .price{
        font-size: 20px;
    }
    h5{
        font-size: 35px;
        color: #8fc866;
    }
    form{
        .invalid{
            border: 1px solid #DC3545;
        }
        label{
            display: block;
            color:#fff;
        }
        input{
            margin-bottom: 15px;
            font-size: 20px;
            padding: 5px;
            border-radius: 5px;
            outline:none;
            border:1px solid #8fc866;
            background: rgba(0, 0, 0, 0);
            color:#fff;
        }
        textarea{
            border:1px solid #8fc866;
            background: rgba(0, 0, 0, 0);
            color:#fff;
            outline:none;
        }
        button:hover{
            color: #fff;
        }
    }
    ::-webkit-scrollbar {
        width: 3px;
    }
    ::-webkit-scrollbar-thumb {
        background:#8fc866;
        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #8fc86693;
    }
</style>
