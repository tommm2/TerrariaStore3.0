<template>
    <div class="bg-light">
        <div class="banner d-flex justify-content-center align-items-end">
            <div class="typing-text mb-5">
                Hope you enjoy your shopping.
            </div>
        </div>
        <div class="product container">
            <nav class="pt-3" aria-label="breadcrumb">
                 <ol class="breadcrumb bg-light">
                    <li class="breadcrumb-item">
                        <router-link :to="{name:'CustomerHome'}">首頁</router-link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">{{focus}}</li>
                </ol>
            </nav>
            <div class="row justify-content-center">
                <section class="col-sm-12 col-lg-3 pb-lg-0 pb-sm-3">
                    <ul class="product-menu d-sm-flex justify-content-center  flex-wrap">
                        <li class="col-lg-12 col-sm-4" @click.prevent="getCategory('所有商品')" :class="{'active':focus === '所有商品'}">
                            <img src="@/assets/image/menu-1.png" alt="all-product">
                            <span class="ml-2 d-lg-inline d-sm-block">所有商品</span>
                        </li>
                        <li class="col-lg-12 col-sm-4" @click.prevent="getCategory('熱門商品')" :class="{'active':focus === '熱門商品'}">
                            <img src="@/assets/image/menu-2.png" alt="hot-product">
                            <span class="ml-2 d-lg-inline d-sm-block">熱門商品</span>
                        </li>
                        <li class="col-lg-12 col-sm-4" @click.prevent="getCategory('時尚套裝')" :class="{'active':focus === '時尚套裝'}">
                            <img src="@/assets/image/menu-3.png" alt="fashion-suit">
                            <span  class="ml-2 d-lg-inline d-sm-block">時尚套裝</span>
                        </li>
                        <li class="col-lg-12 col-sm-4" @click.prevent="getCategory('泰拉系列')" :class="{'active':focus === '泰拉系列'}">
                            <img src="@/assets/image/menu-4.png" alt="terraria-series">
                            <span class="ml-2 d-lg-inline d-sm-block">泰拉系列</span>
                        </li>
                        <li class="col-lg-12 col-sm-4" @click.prevent="getCategory('召喚系列')" :class="{'active':focus === '召喚系列'}">
                            <img src="@/assets/image/menu-5.png" alt="summon-series">
                            <span class="ml-2 d-lg-inline d-sm-block">召喚系列</span>
                        </li>
                    </ul>
                </section>
                <section class="col-sm-12 col-lg-9 text-center mb-3">
                    <h5 class="menu-title font-weight-bold">{{focus}}</h5>
                    <div class="row justify-conter-sm-center">
                        <div class="col-md-6 col-lg-4 mt-2 mb-2" v-for="item in filters" :key="item.id">
                            <div class="product-grid">
                                <span class="badge">{{item.category}}</span>
                                <div class="product-image">
                                    <img class="pic-1 p-5" :src="item.imageUrl" :alt="item.title" @click="getSingleItem(item)">
                                    <ul class="product-links">
                                        <li>
                                            <a href="#" @click.prevent="addToCart(item)">
                                            <i class="fa fa-shopping-bag"></i>
                                            加入購物車
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" @click.prevent="getSingleItem(item)">
                                            <i class="fa fa-search"></i>
                                            查看更多
                                            </a>
                                         </li>
                                    </ul>
                                </div>
                                <div class="product-content">
                                    <h3 class="title">{{item.title}}</h3>
                                    <div class="price-group d-flex justify-content-center">
                                        <del class="text-muted mr-2" v-if="item.origin_price !== item.price">{{item.origin_price | currency}}</del>
                                        <div class="price" v-if="item.origin_price !== item.price">{{item.price | currency}}</div>
                                        <div class="price" v-if="item.origin_price === item.price">{{item.origin_price | currency}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
               <Pagination class="mt-3 " v-if="focus === '所有商品'"  :pages="pagination" @handle="getCart"/>
            </div>
        </div>
    </div>
</template>
<script>

import Pagination from '@/components/Pagination.vue'
export default {
  data () {
    return {
      products: [],
      allProduct: [],
      pagination: {},
      filterProduct: [],
      focus: '所有商品'
    }
  },
  components: {
    Pagination
  },
  computed: {
    filters () {
      const vm = this
      vm.filterProduct = vm.allProduct.filter(item => item.category === vm.focus)
      if (vm.focus === '所有商品') {
        return vm.products
      }
      return vm.filterProduct
    },
    cart () {
      return this.$store.state.cart
    }
  },
  methods: {
    getCart (page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`
      const vm = this
      vm.$store.dispatch('updateLoading', true)
      vm.$http.get(api).then((res) => {
        vm.products = res.data.products
        vm.pagination = res.data.pagination
        vm.$store.dispatch('updateLoading', false)
      })
    },
    getCategory (item) {
      const vm = this
      vm.focus = item
    },
    getAllItem () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      const temCategory = vm.$route.params.category
      if (temCategory) {
        vm.focus = temCategory
      }
      vm.$store.dispatch('updateLoading', true)
      vm.$http.get(api).then((res) => {
        vm.allProduct = res.data.products
        vm.$store.dispatch('updateLoading', false)
      })
    },
    getSingleItem (item) {
      const vm = this
      vm.$router.push(`/viewMore/${item.id}`)
    },
    addToCart (item, qty = 1) {
      const vm = this
      const target = vm.cart.carts.filter((data) => data.product_id === item.id)
      if (target.length > 0) {
        const sameCartItem = target[0]
        const originQty = sameCartItem.qty
        const originCartId = sameCartItem.id
        const originProductId = sameCartItem.product.id
        const newQty = originQty + qty
        vm.$store.dispatch('updateQty', { originCartId, originProductId, newQty })
      } else {
        vm.$store.dispatch('addToCart', { item, qty })
      }
    }
  },
  created () {
    const vm = this
    vm.$bus.$emit('getRoute', vm.$route.path)
    vm.getCart()
    vm.getAllItem()
  }
}
</script>
<style lang="scss" scoped>
    .banner{
        background-image: url('../../assets/image/banner-2.png');
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        height: 50vh;
        @media (min-width: 992px) {
            height: 60vh;
        }
        .typing-text{
            font-family: pixel;
            text-transform: uppercase;
            color: #fff;
            font-weight: 700;
            width: 33ch;
            white-space: nowrap;
            overflow: hidden;
            border-right: 3px solid #fff;
            font-size: 40px;
            animation: typing 2s steps(20),blink .5s step-end infinite alternate;
            @media (max-width:768px) {
                font-size: 20px;
            }
        }
        @keyframes typing {
            from{width: 0;}
        }
        @keyframes blink {
            50%{
                border-color: transparent;
            }
        }
    }
    .product{
        nav{
            font-size: 20px;
            a{
                color:#8fc866;
                &:hover{
                    text-decoration: none;
                }
            }
        }
        .product-menu{
            .active{
                border:2px solid #8fc866;
            }
            li{
                border: 2px solid #e7e7e7;
                border-radius: 5px;
                margin: 6px;
                text-align: center;
                cursor: pointer;
                padding:15px 0;
                font-size: 20px;
                font-weight: bold;
                transition: all .3s ease;
                box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
                img{
                    width: 30px;
                }
                &:hover{
                    border:2px solid #8fc866;
                }
            }
            @media (min-width: 992px) {
                position: sticky;
                top: 93px;
            }
        }
    }
    .product-grid{
        position: relative;
        border-radius: 10px;
        border: 1px solid #e7e7e7;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
        .badge{
            position: absolute;
            padding: 8px;
            font-size: 15px;
            background: #DC3545;
            color: #fff;
            left: 5px;
            top:5px
        }
        &:hover .product-links{ opacity: 1;}
        &:hover .product-links li{
            opacity: 1;
            transform: translateX(0);
        }
        .product-image{
            position: relative;
            cursor: pointer;
            a .image{
                display: block;
            }
            img{
                width: 230px;
                height: 260px;
                transition: all 0.3s ease 0s;
            }
            &:hover img{
                transform: translate(10px,-10px);
            }
        }
        .product-sale-label{
            color: #fff;
            background: #1abc9c;
            font-size: 13px;
            text-transform: capitalize;
            line-height: 35px;
            width: 55px;
            height: 35px;
            position: absolute;
            top: 0;
            right: 0;
            animation: bg-animate 5s infinite linear;
        }
        .product-links{
            padding: 0;
            margin: 0;
            list-style: none;
            opacity: 0;
            overflow: hidden;
            position: absolute;
            bottom: 15px;
            left: 20px;
            transition: all 0.3s ease 0s;
            li{
                margin: 0 0 5px;
                opacity: 0;
                transform: translateX(-100%);
                transition: all 0.3s ease 0s;
                &:nth-child(2){ transition: all 0.3s ease 0.15s;};
                a{
                    color: #fff;
                    background-color: #00b894;
                    font-size: 14px;
                    text-shadow: 0 0 3px rgba(0,0,0,0.7);
                    padding: 8px 10px;
                    display: block;
                    opacity: 0.9;
                    transition: all 0.3s ease 0s;
                    animation: bg-animate 5s infinite linear;
                    &:hover{
                        color: #fff;
                        box-shadow: 0 0 0 3px #fff inset;
                        opacity: 1;
                        text-decoration: none;
                    }
                    i{ margin: 0 5px 0 0; }
                }
            }
        }
        .product-content{ padding: 15px 0 5px; }
        .title{
            font-size: 20px;
            font-weight: 600;
            text-transform: capitalize;
            padding: 0 10px 14px;
            margin: 0 0 7px;
            border-bottom: 1px solid #dfe5e9;
            a{
                color: #000;
                transition: all 0.3s ease 0s;
                 &:hover{ animation: color-animate 5s infinite linear; }
            }
        }
        .price-group{
            padding: 10px 0;
            .price{
                color: #1abc9c;
                font-size: 20px;
                font-weight: 400;
                animation: color-animate 5s infinite linear;
            }
        }
    }
@keyframes color-animate{
    0%{ color: #00b894; }
    20%{ color: #00cec9; }
    40%{ color: #0984e3; }
    60%{ color: #6c5ce7; }
    80%{ color: #e84393; }
    100%{ color: #00b894; }
}
@keyframes bg-animate{
    0%{ background-color: #00b894; }
    20%{ background-color: #00cec9; }
    40%{ background-color: #0984e3; }
    60%{ background-color: #6c5ce7; }
    80%{ background-color: #e84393; }
    100%{ background-color: #00b894; }
}
</style>
