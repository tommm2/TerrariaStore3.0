<template>
  <div>
    <div class="wrap">
      <div class="container pt-3 px-4">
        <div class="row justify-content-center">
          <div class="col-lg-8 col-sm-12 mb-sm-5 mb-lg-0 pb-4" v-if="cart.carts">
            <StepBar class="pt-5" :status="status" />
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
                    <td>
                      <i @click="changeQty(item.id, item.product.id, item.qty, false)" class="fas fa-minus mx-1"></i>
                      {{ item.qty }}/{{ item.product.unit }}
                      <i @click="changeQty(item.id, item.product.id, item.qty, true)" class="fas fa-plus mx-1"></i>
                    </td>
                    <td>{{ item.final_total | currency}}</td>
                    <td>
                        <i @click="delCart(item.id)" class="fas fa-trash-alt"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-if="cart.carts.length === 0" class="no-item-res text-white text-center">
              您的購物車為空， <router-link :to="{ name: 'CustomerProduct' }">按此前往購物</router-link>
            </div>
            <div class="price pt-3  d-flex justify-content-around font-weight-bold">
              <p class="text-muted">總計 {{cart.total | currency}}</p>
              <p v-if="cart.total !== cart.final_total" class="text-success">折扣價 {{cart.final_total | currency}}</p>
            </div>

            <div v-if="cart.carts.length === 0" class="input-group mute mb-3">
              <input disabled type="text" v-model="coupon_code" class="form-control " placeholder="ex :試試eee">
              <div class="input-group-append">
                <button disabled class="btn btn-outline-secondary" type="button">套用優惠碼</button>
              </div>
            </div>
            <div v-else class="input-group mb-3">
              <input type="text" v-model="coupon_code" class="form-control" placeholder="ex :試試eee">
              <div class="input-group-append">
                <button class="btn btn-outline-primary" type="button" @click="enterCoupon(coupon_code)">
                  套用優惠碼
                </button>
              </div>
            </div>
          </div>
          <div class="col-lg-8 col-sm-12" v-if="cart.carts">
            <h5 class="text-center pb-4 font-weight-bold">買家資訊</h5>
            <form class="mute" v-if="cart.carts.length === 0">
              <div class="form-group">
                <label for="email">Email</label>
                <input disabled class="w-100" name="email" id="email" type="email" placeholder="請輸入email">
              </div>
              <div class="form-group">
                <label for="username">收件人姓名</label>
                <input disabled class="w-100" name="name" id="username" type="text" placeholder="請輸入姓名">
              </div>
              <div class="form-group">
                <label for="address">收件人地址</label>
                <input disabled class=" w-100" name="address" id="address" type="text" placeholder="請輸入地址">
              </div>
              <div class="form-group">
                <label for="tel">收件人電話</label>
                <input disabled class="w-100" name="regex" id="tel" type="text" placeholder="請輸入電話">
              </div>
              <label for="comment">留言</label>
              <textarea class="w-100" id="comment" rows="8"></textarea>
              <button disabled class="btn btn-outline-secondary mt-4 mb-4 col-12" type="button">送出訂單</button>
            </form>
            <form v-else @submit.prevent="createOrder">
              <div class="form-group">
                <label for="email">Email</label>
                <input v-model="form.user.email" :class="{'invalid':errors.has('email')}" v-validate="'required|email'" class="w-100" name="email" id="email" type="email" placeholder="請輸入email">
                <span v-if="errors.has('email')" class="text-danger">
                    * {{errors.first('email')}}
                </span>
              </div>
              <div class="form-group">
                <label for="username">收件人姓名</label>
                <input v-model="form.user.name" :class="{'invalid':errors.has('name')}" v-validate="'required'" class=" w-100" name="name" id="username" type="text" placeholder="請輸入姓名">
                <span v-if="errors.has('name')" class="text-danger">* 收件人姓名必填</span>
              </div>
              <div class="form-group">
                <label for="address">收件人地址</label>
                <input v-model="form.user.address" :class="{'invalid':errors.has('address')}" v-validate="'required'" class=" w-100" name="address" id="address" type="text" placeholder="請輸入地址">
                <span v-if="errors.has('address')" class="text-danger">* 收件人地址必填</span>
              </div>
              <div class="form-group">
                <label for="tel">收件人電話</label>
                <input v-model="form.user.tel" :class="{'invalid':errors.has('regex')}"
                v-validate="{required:true,regex: /^[09]{2}[0-9]{8}$/}"
                class="w-100" name="regex" id="tel" type="text" placeholder="請輸入電話">
                <span v-if="errors.has('regex')" class="text-danger">* 請輸入正確手機格式</span>
              </div>
              <label for="comment">留言</label>
              <textarea v-model="form.message" class="w-100" id="comment" rows="8"></textarea>
              <button v-if="cart.carts.length === 0" disabled class="btn btn-outline-secondary mt-4 mb-4 col-12" type="button">送出訂單</button>
              <button v-else class="btn mt-4 mb-4 col-12 btn-outline-primary" type="submit">送出訂單</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import StepBar from '@/components/StepBar.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    StepBar
  },
  data () {
    return {
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
    ...mapActions(['getCartList', 'delCart', 'enterCoupon']),
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
          vm.$store.dispatch('updateMessage', { msg: '表單建立失敗', status: 'danger' })
        }
      })
    },
    changeQty (id, productId, qty, calc) {
      const vm = this
      let num
      if (calc === true) {
        num = qty + 1
      } else if (qty === 1) {
        num = 1
      } else {
        num = qty - 1
      }
      vm.$store.dispatch('changeQty', { id, productId, num })
    }
  },
  computed: {
    ...mapGetters(['cart'])
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
  background-image: url('~@/assets/image/tree-bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  padding: 100px 0;
  .row{
    background:rgba(0,0,0,0.8);
    border-radius: 10px;
    h5{
    font-size: 30px;
    }
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
      white-space: nowrap;
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
  .form-control{
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

.input-group.mute {
  .form-control{
    font-size: 20px;
    padding: 10px;
    border-radius: 5px;
    outline:none;
    border: 1px solid #6c757d;
    background: rgba(0, 0, 0, 0);
    color:#fff;
  }
}

.no-item-res{
  font-size:20px;
  padding: 10px 0;
  border-radius: 5px;
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
form.mute{
  input{
    margin-bottom: 15px;
    font-size: 20px;
    padding: 5px;
    border-radius: 5px;
    outline:none;
    border:1px solid #6c757d;
    background: rgba(0, 0, 0, 0);
    color:#fff;
  }
  textarea{
    border:1px solid #6c757d;
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
::-webkit-scrollbar-corner{
  height: 3px;
}
::-webkit-scrollbar-thumb {
  background:#8fc866;
  border-radius: 5px;
}
::-webkit-scrollbar-thumb:hover {
  background: #8fc86693;
}
</style>
