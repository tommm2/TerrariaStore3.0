<template>
    <div>
      <a v-if="cart.carts" href="#" class="cart-background" data-toggle="modal" data-target="#cartModal">
            <img src="@/assets/image/cart-object.gif" alt="cart-icon">
            <div v-if="cart.carts.length > 0"  class="cart-mark">
                {{ cart.carts.length }}
            </div>
      </a>
      <div class="modal fade p-3" id="cartModal" tabindex="-1" role="dialog" aria-labelledby="cartModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="header mt-3">
                        <img class="col-sm-12" src="@/assets/image/cart-bg.gif" alt="cart-bg">
                        <div class="header-text">
                            我的購物車
                        </div>
                    </div>
                    <div class="body">
                        <div class="col-sm-12" v-if="cart.carts">
                        <div v-if="cart.carts.length !== 0" class="table-list">
                            <table class="table text-white">
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
                                        <span class="d-md-inline d-sm-block">{{item.product.title }}</span>
                                        <div class="text-success" v-if="item.coupon">
                                        已套用優惠券
                                        </div>
                                      </td>
                                      <td>
                                        <i @click="changeQty(item.id, item.product.id, item.qty, false)" class="fas fa-minus mx-1"></i>
                                        {{item.qty}}/{{item.product.unit}}
                                        <i @click="changeQty(item.id, item.product.id, item.qty, true)" class="fas fa-plus mx-1"></i>
                                      </td>
                                      <td>{{ item.final_total | currency}}</td>
                                      <td>
                                        <i class="fas fa-trash-alt" @click="delCart(item.id)"></i>
                                      </td>
                                  </tr>
                                </tbody>
                            </table>
                        </div>
                        <div v-if="cart.carts.length === 0" class="no-item-res text-white text-center pt-3 font-weight-bold">
                            <i class="fas fa-cart-arrow-down mr-2"></i>空無一物的購物車
                        </div>
                        <div class="price pt-3  d-flex justify-content-around font-weight-bold">
                            <p class="text-muted">總計 {{cart.total | currency}}</p>
                            <p v-if="cart.total !== cart.final_total" class="text-success">折扣價 {{cart.final_total | currency}}</p>
                        </div>
                        <div class="input-group mb-3 input-group-sm">
                            <input type="text" v-model="coupon_code" class="form-control" placeholder="請輸入優惠碼 ex:試試eee">
                            <div class="input-group-append">
                                <button  v-if="coupon_code === '' || cart.carts.length === 0" class="btn btn-outline-primary" type="button" disabled>
                                套用優惠碼
                                </button>
                                <button v-else class="btn btn-primary" type="button" @click="enterCoupon(coupon_code)">
                                套用優惠碼
                                </button>
                            </div>
                            <button type="button" data-dismiss="modal" class="btn btn-danger mt-3 mb-3 col-sm-12">返回</button>
                            <router-link v-if="cart.carts.length > 0" data-dismiss="modal" type="btn" class="btn btn-primary col-sm-12 text-white" :to="{name:'CustomerCart'}">前往結帳</router-link>
                            <router-link v-if="cart.carts.length <= 0" data-dismiss="modal" type="btn" class="btn btn-primary col-sm-12 text-white" :to="{name:'CustomerProduct'}">前往購物</router-link>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
      </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      coupon_code: ''
    }
  },
  methods: {
    ...mapActions(['getCartList', 'enterCoupon', 'delCart']),
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
  }
}
</script>
<style lang="scss" scoped>
    .cart-background{
        position: fixed;
        right: 3%;
        bottom: 3%;
        z-index: 1000;
        img{
            width: 70px;
        }
        .cart-mark{
            color: #fff;
            position: absolute;
            border-radius: 50%;
            border: 3px solid #fff;
            top: 0;
            right:10px;
            width: 35px;
            background: #DC3545;
            padding: 3px;
            display: flex;
            justify-content: center;
            @media (max-width:768px) {
                top:0;
                right: 5px;
            }
        }
    }
    .table-list{
        display: block;
        overflow-y: auto;
        height: 200px;
        table{
            width: 100%;
            tr {
                width: 100%;
                border: none;
            }
            td {
                white-space: nowrap;
                text-align: center;
                padding: 3px;
            }
            i{
                cursor: pointer;
                transition: color .3s ease;
                &:hover{
                    color: #8fc866;
                }
            }
        }
    }
    ::-webkit-scrollbar {
            width: 3px;
    }
    ::-webkit-scrollbar-thumb {
        background: #8fc866;
        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #8fc86693;
    }
    .header{
        position: relative;
        .header-text{
            position: absolute;
            top:20%;
            left:40%;
            color:#8fc866;
            font-weight: 1000;
            font-size: 20px;
            @media (max-width:420px) {
                font-size: 16px;
            }
        }
    }
    .modal-content{
        background: rgba(0,0,0,0.8);
        input{
            border-radius: 5px;
            outline:none;
            border:2px solid #8fc866;
            background: rgba(0, 0, 0, 0);
            color:#fff;
        }
        .no-item-res{
            font-size:20px;
            padding: 10px 0;
            border-radius: 10px;
        }
    }
    .wavy{
        position: relative;
        -webkit-box-reflect: below -12px linear-gradient(transparent, rgba(0, 0, 0, 0.2));
        span{
            position: relative;
            display: inline-block;
            animation: animate 1s ease-in-out infinite;
            animation-delay: calc(.1s*var(--i))
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
    }
</style>
