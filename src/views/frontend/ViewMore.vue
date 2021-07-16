<template>
  <div>
    <div class="wrap">
      <div class="container">
        <div class="product-container">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><router-link :to="{name:'CustomerHome'}">首頁</router-link></li>
              <li class="breadcrumb-item"><router-link :to="{name:'CustomerProduct'}">所有商品</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">{{product.title}}</li>
            </ol>
          </nav>
          <div class="row justify-content-around px-3">
            <div class="col-lg-6 col-md-12 p-3 d-flex flex-column align-items-center border">
              <div class="product-image">
                <img width="150" :src="product.imageUrl" :alt="product.title">
              </div>
              <div class="product-content w-100 mt-5 mb-3">
                <h6 class="font-weight-bold">商品介紹</h6>
                <p class="product-text">{{product.description}}</p>
              </div>
              <div class="product-demo d-md-block d-sm-none w-100">
                <h6 class="font-weight-bold">商品示範</h6>
                <div v-for="(item, index) in demo" :key="index">
                    <div v-if="item.url !== ''">
                      <img v-if="product.title === item.title" :src="item.url">
                    </div>
                    <div v-if="item.url === ''">
                      <p style="font-size: 25px;" class="p-3 text-light d-flex justify-content-center" v-if="product.title === item.title">暫不提供</p>
                    </div>
                </div>
              </div>
            </div>
            <div class="col-lg-5 col-sm-12 d-flex flex-column border mt-lg-0 mt-sm-3">
              <h5 class="font-weight-bold py-3 border-bottom">{{product.title}}<span class="title-span align-self-center d-sm-inline-block ml-2">{{product.category}}</span></h5>
              <div class="price-group pt-3">
                <del class="origin-price text-secondary" v-if="product.origin_price !== product.price"> 原價 {{product.origin_price | currency}}</del>
                <p class="price" v-if="product.origin_price !== product.price">售價 {{product.price | currency}}</p>
                <p class="price" v-if="product.origin_price === product.price">售價 {{product.price | currency}}</p>
              </div>
              <select  class="form-select" v-model="product.num">
                <option value="0" selected disabled>--請選擇數量--</option>
                <option :value="num" v-for="num in 5" :key="num">選購{{num}}{{product.unit}}</option>
              </select>
              <button type="button" v-if="product.num > 0" @click="addToCart(product, product.num)" class=" btn btn-primary mt-3 text-light font-weight-bold">加入購物車</button>
              <button type="button" v-else disabled class=" btn btn-primary mt-3 text-light font-weight-bold">加入購物車</button>
              <span class="total py-3 border-bottom">小計: {{product.num * product.price | currency}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      product: [],
      demo: [
        {
          title: '彩虹貓之刃',
          url: require('@/assets/image/view-gif/Meowmere_demo.gif')
        },
        {
          title: '史萊姆法仗',
          url: require('@/assets/image/view-gif/Slime_Staff.gif')
        },
        {
          title: '烏鴉法仗',
          url: require('@/assets/image/view-gif/Raven_demo.gif')
        },
        {
          title: '海盜法仗',
          url: require('@/assets/image/view-gif/Pirate_Staff.gif')
        },
        {
          title: '矮人法仗',
          url: require('@/assets/image/view-gif/Pygmy_demo.gif')
        },
        {
          title: '泰拉溜溜球',
          url: require('@/assets/image/view-gif/Terrariayoyo_demo.gif')
        },
        {
          title: '泰拉魔刃',
          url: require('@/assets/image/view-gif/Terragrim_demo.gif')
        },
        {
          title: '泰拉刃',
          url: require('@/assets/image/view-gif/Terra_Blade_demo.gif')
        },
        {
          title: '芽酒投擲器',
          url: require('@/assets/image/view-gif/Ale_Tosser_demo.gif')
        },
        {
          title: '彩虹魔杖',
          url: require('@/assets/image/view-gif/Rainbow_Rod_demo.gif')
        },
        {
          title: '寒霜飛魚',
          url: require('@/assets/image/view-gif/Frost_Daggerfish_demo.gif')
        },
        {
          title: '雞尾酒',
          url: require('@/assets/image/view-gif/Molotov_Cocktail_demo.gif')
        },
        {
          title: '聖誕樹劍',
          url: require('@/assets/image/view-gif/Christmas_Tree_Sword_demo.gif')
        },
        {
          title: '月耀魔法書',
          url: require('@/assets/image/view-gif/Lunar_Flare_demo.gif')
        },
        {
          title: '機器人套裝',
          url: ''
        },
        {
          title: 'Toro套裝',
          url: ''
        },
        {
          title: '苦力怕套裝',
          url: ''
        },
        {
          title: '蘑菇套裝',
          url: ''
        }
      ]
    }
  },
  methods: {
    getSingleItem () {
      const vm = this
      const id = vm.$route.params.id
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      vm.$store.dispatch('updateLoading', true)
      vm.$http.get(api).then((res) => {
        vm.product = res.data.product
        vm.$set(vm.product, 'num', 0)
        vm.$store.dispatch('updateLoading', false)
      })
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
    },
    getCartList () {
      const vm = this
      vm.dispatch('getCartList')
    }
  },
  computed: {
    cart () {
      return this.$store.state.cart
    }
  },
  created () {
    const vm = this
    vm.getSingleItem()
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  background-image: url('~@/assets/image/tree-bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  padding: 100px 0;
  .breadcrumb {
    background: none;
    a {
      transition: all .3s ease;
      &:hover {
      text-decoration: none;
      }
    }
  }
  .container {
    .product-container {
      background: rgba(0, 0, 0, 0.7);
      box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
      border-radius: 20px;
      padding: 16px;
    }
    .product-content {
      border-top: 1px solid #fff;
      padding-top: 20px;
      p {
        font-size: 16px;
        color:#fff;
      }
    }
    .product-demo {
      img{
        width: 100%;
        height: 180px;
        border-radius: 10px;
      }
      .no-provide {
        color:#fff;
        font-size: 30px;
        text-align: center;
        padding: 40px;
      }
    }
    .price-group {
      .origin-price {
        font-size: 22px;
        font-weight: 700;
      }
      .price {
        color: #1abc9c;
        font-size: 25px;
        font-weight: 800;
        animation: color-animate 6s infinite linear;
      }
    }
    .form-select {
      font-size: 20px;
      padding: 10px;
      border-radius: 5px;
      outline:none;
      cursor: pointer;
      border:3px solid #8fc866;
      background: #313131;
      color:#fff;
    }
    .total {
      font-size: 25px;
      font-weight: 600;
      color: #8fc866;
    }
    .title-span {
      font-size:15px;
      background: #FF5151;
      border-radius: 5px;
      padding: 5px;
      color:#fff;
    }
  }
  h5 {
    font-size: 35px;
    color: #8fc866;
    @media (max-width:400px) {
      font-size: 23px;
    }
  }
  h6{
    font-size: 25px;
    color: #8fc866;
    margin-bottom: 10px;
  }
}
</style>
