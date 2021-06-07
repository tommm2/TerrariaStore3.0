<template>
  <div>
    <div class="wrap">
      <div class="container pt-3 px-4">
        <div class="row justify-content-center text-white">
          <div class="col-lg-8 mb-sm-5 mb-lg-0 pb-4">
            <StepBar class="pt-5" :status="status"/>
            <h5 v-if="!order.is_paid" class="text-center font-weight-bold">資料確認</h5>
            <h5 v-if="order.is_paid" class="price-focus text-center font-weight-bold">付款成功，感謝購買</h5>
            <img v-if="order.is_paid" class="col-sm-12" src="@/assets/image/checkout-img.gif" alt="checkout-img">
            <form @submit.prevent="payOrder">
              <table v-if="!order.is_paid" class="table-hidden table text-white">
                <thead class="bg-primary">
                  <tr>
                    <th>品名</th>
                    <th>數量</th>
                    <th>價錢</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in order.products" :key="item.id">
                    <td width="340">
                      <img width="30" :src="item.product.imageUrl" :alt="item.product.title">
                      <span>{{item.product.title }}</span>
                    </td>
                    <td width="200" class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                    <td class="align-middle ">{{ item.final_total | currency}}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td class="price-focus text-center pt-4"><span class="mr-5">總計</span> {{ order.total | currency}}</td>
                  </tr>
                </tfoot>
              </table>
              <h5 v-if="!order.is_paid" class="text-center font-weight-bold pb-4 pt-4">買家資訊</h5>
              <table class="customer-info table text-white">
                <tbody>
                  <tr>
                    <th>Email</th><td>{{ order.user.email }}</td>
                  </tr>
                  <tr>
                    <th>收件人姓名</th><td>{{ order.user.name }}</td>
                   </tr>
                  <tr>
                    <th>收件人電話</th><td>{{ order.user.tel }}</td>
                  </tr>
                  <tr>
                    <th>收件人地址</th><td>{{ order.user.address }}</td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <span class="text-danger" v-if="!order.is_paid">尚未付款</span>
                      <span v-else class="text-success">付款完成</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="text-right" v-if="order.is_paid === false">
                <button data-toggle="modal" data-target="#confirmModal" type="button" class="btn btn-danger">付款確認</button>
              </div>
              <div class="text-right" v-if="order.is_paid === true">
                <router-link class="btn btn-primary text-white" :to="{name:'CustomerProduct'}">繼續購物</router-link>
              </div>
              <div class="modal fade p-3" id="confirmModal" tabindex="-1" role="dialog" aria-labelledby="confirmModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="header mt-3">
                      <img class="col-sm-12" src="@/assets/image/confirmPayForm.gif" alt="confirmPayForm">
                      <div class="header-text">付款確認</div>
                    </div>
                    <div class="body text-center p-3">
                      資料送出將無法變更，確定要送出嗎?
                      <div class="row justify-content-center">
                        <button type="button" data-dismiss="modal" class="btn btn-danger col-sm-4 mt-3 mx-1">返回</button>
                        <button @click="confirmModal" type="submit" class="btn btn-primary mt-3 mx-1 col-sm-4">確認</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import StepBar from '@/components/StepBar.vue'
export default {
  components: {
    StepBar
  },
  data () {
    return {
      orderId: '',
      order: {
        user: {}
      },
      status: 2
    }
  },
  methods: {
    getOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`
      vm.$http.get(api).then((res) => {
        vm.order = res.data.order
        vm.getCartList()
      })
    },
    getCartList () {
      const vm = this
      vm.$store.dispatch('getCartList')
    },
    confirmModal () {
      $('#confirmModal').modal('hide')
    },
    payOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`
      vm.$store.dispatch('updateLoading', true)
      vm.$http.post(api).then((res) => {
        if (res.data.success) {
          vm.status = 3
          vm.getOrder()
          window.scroll({
            top: 0,
            left: 0
          })
          vm.$store.dispatch('updateLoading', false)
        }
      })
    }
  },
  created () {
    const vm = this
    vm.orderId = vm.$route.params.orderId
    vm.getOrder()
  }
}
</script>
<style lang="scss" scoped>
    h5{
        font-size: 30px;
        color: #8fc866;
        white-space: nowrap;
    }
    .wrap{
        background-image: url('~@/assets/image/tree-bg.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        padding: 100px 0;
       .container{
           .row{
                border-radius: 10px;
                background:rgba(0,0,0,0.8);
                box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
           }
            .table-hidden {
                tbody{
                    overflow-y: auto;/*設定卷軸 auto 是有超過我的高度的時候才會出現卷軸*/
                    height: 300px;/*自己設定*/
                    display: block;
                    border: none;
                }
                tr {
                    width: 100%;
                    display: inline-table;
                }
                tfoot{
                    font-weight: bold;
                    font-size: 25px;
                    .price-focus{
                        color: #1abc9c;
                        animation: color-animate 5s infinite linear;
                    }
                    @keyframes color-animate{
                        0%{ color: #00b894; }
                        20%{ color: #00cec9; }
                        40%{ color: #0984e3; }
                        60%{ color: #6c5ce7; }
                        80%{ color: #e84393; }
                        100%{ color: #00b894; }
                        }
                }
            }
            .customer-info{
                tbody th{
                    font-size: 20px;
                    color: gray;
                }
            }
       }
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
        button{
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
