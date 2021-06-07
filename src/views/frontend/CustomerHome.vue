<template>
  <div class="bg-light">
    <div class="banner d-flex justify-content-center align-items-end">
      <div class="typing-text mb-5">Welcome to terraria Store.</div>
    </div>
    <div class="about-us container text-center d-flex align-items-center">
      <img src="@/assets/image/about.jpg" alt="about-img">
      <div>
        <h2>關於我們</h2>
        <p class="p-3">在Terraria Store，你有無窮選擇，販賣各式魔法、遠程、近戰、和召喚武器，以及盔甲，藉助它們與數百種不同的敵怪戰鬥，你有無窮選擇。每個人都能找到自己想要的。</p>
      </div>
    </div>
    <div class="hot-product container text-center">
      <div class="customer-box">
        <h2>熱門商品</h2>
        <swiper class="swiper" :options="swiperOption" v-if="products.length > 0">
          <swiper-slide class="mb-5" v-for="item in products" :key="item.id">
            <div class="product-grid mr-2 ml-2" @click="getSingleItem(item)">
              <span class="badge">{{item.category}}</span>
              <div class="product-image">
                <img class="pic-1 p-5" :src="item.imageUrl" :alt="item.title">
                <ul class="product-links">
                  <li>
                    <a href="#" @click.prevent="addToCart(item)"><i class="fa fa-shopping-bag"></i>加入購物車</a>
                  </li>
                  <li>
                    <a href="#" @click.prevent="getSingleItem(item)"><i class="fa fa-search"></i>查看更多</a>
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
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>
    <div class="news container p-sm-5 text-center">
      <h2>最新消息</h2>
      <div class="news-box p-lg-5 p-sm-2 row justify-content-center">
        <div class="news-first col-lg-4 col-sm-12 mt-3">
          <img src="@/assets/image/news-1.png" alt="Mushroom-suit">
          <p>新推出與瑪里歐合作的蘑菇套裝，穿上它一起去踩蘑菇，重返兒時玩馬力歐兄弟的時光吧!</p>
        </div>
        <div class="news-first col-lg-4 col-sm-12 mt-3">
          <img src="@/assets/image/news-2.png" alt="Creeper-suit">
          <p>新推出與Minecraft合作的苦力怕套裝，穿上它大家會害怕你爆炸而逃跑，是嚇人的好選擇!</p>
        </div>
        <div class="news-first col-lg-4 col-sm-12 mt-3">
          <img src="@/assets/image/news-3.png" alt="Toro-suit">
          <p>新推出與Sony合作的Toro時裝，可謂日本吉祥物的代名詞，穿上它包準你當上本月最佳吉祥物!</p>
        </div>
        <button @click="goBuySuit('時尚套裝')" class="mt-3"><i class="fas fa-long-arrow-alt-right mr-2"></i>前往購買</button>
      </div>
    </div>
    <div class="other-info container p-5 text-lg-center text-center">
      <h2>冒險資訊</h2>
      <div class="other-box row mb-4">
        <img class="col-lg-5 col-sm-12" src="@/assets/image/advanture-1.jpg" alt="advanture-suit">
        <div class="p-lg-5 p-sm-3 col-lg-7 col-sm-12">
          <h5>與盔甲共舞</h5>
          <p class="text-left">Terraria Store的盔甲絕對是你的好選擇，不只能增加防禦率，穿著整件套裝還能獲取特殊效果。</p>
          <p class="text-left">
            <a href="#"><i class="fas fa-long-arrow-alt-right"></i>瞭解更多</a>
          </p>
        </div>
      </div>
      <div class="other-box row mb-4">
        <img class="d-lg-none col-lg-5 col-sm-12" src="@/assets/image/advanture-2.jpg" alt="advanture-boss">
        <div class="p-lg-5 p-sm-3 col-lg-7 col-sm-12">
          <h5>知己知彼，百戰百勝</h5>
          <p class="text-left"> 當你有了裝備還有武器，你可能會覺得能成為專家了，那你就大錯特錯了!!要成為專家就須了解BOSS的打法。</p>
          <p class="text-left">
            <a href="#"><i class="fas fa-long-arrow-alt-right"></i>瞭解更多</a>
          </p>
        </div>
        <img class="hideImg col-lg-5  col-sm-12" src="@/assets/image/advanture-2.jpg" alt="advanture-boss">
      </div>
      <div class="other-box row">
        <img class="col-lg-5 col-sm-12" src="@/assets/image/adverture-3.jpg" alt="advanture-npc">
        <div class="p-lg-5 p-sm-3 col-lg-7 col-sm-12">
          <h5>NPC是你的好夥伴</h5>
          <p class="text-left">NPC就是你必須要交的朋友，他們能教你相關知識，或者是告訴你如何在Terraria世界生存。</p>
          <p class="text-left">
            <a href="#"><i class="fas fa-long-arrow-alt-right"></i>瞭解更多</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          type: 'bullets'
        },
        initialSlide: 0,
        direction: 'horizontal',
        speed: 800,
        loop: true,
        observer: true,
        observeParents: true,
        autoplay: {
          delay: 3000
        },
        breakpoints: {
          1200: {
            slidesPerView: 4
          },
          991: {
            slidesPerView: 3
          },
          768: {
            slidesPerView: 2
          },
          580: {
            slidesPerView: 1
          }
        }
      },
      products: []
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  methods: {
    getHotProduct () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      vm.$store.dispatch('updateLoading', true)
      vm.$http.get(api).then((res) => {
        vm.products = res.data.products.filter((item) => {
          return item.category === '熱門商品'
        })
        vm.$store.dispatch('updateLoading', false)
      })
    },
    goBuySuit (item) {
      const vm = this
      vm.$router.push({
        name: 'CustomerProduct',
        params: { category: item }
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
    getSingleItem (item) {
      const vm = this
      vm.$router.push(`/viewMore/${item.id}`)
    }
  },
  computed: {
    ...mapGetters(['cart'])
  },
  created () {
    const vm = this
    vm.$bus.$emit('getRoute', vm.$route.path)
    vm.getHotProduct()
  }
}
</script>
<style lang="scss" scoped>
    a:hover{
        text-decoration: none;
    }
    h2{
        padding: 20px 0;
        font-size: 35px;
        color: #252525;
        font-weight: bolder;
        text-align: center;
    }
    h5{
        white-space: nowrap;
        margin-bottom: 20px;
        font-size: 25px;
        font-weight: bold;
        color:#8fc866;
        text-align: left;
    }
    p{
        color: #5B5B5B;
        font-size: 16px;
        line-height: 2;
        letter-spacing: 2px;
    }
    .banner{
        background-image: url('~@/assets/image/banner1.png');
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
            width: 30ch;
            white-space: nowrap;
            overflow: hidden;
            border-right: 3px solid #fff;
            font-size: 40px;
            animation: typing 2s steps(26),blink .5s step-end infinite alternate;
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
    .about-us{
        border-radius: 10px;
        padding: 50px;
        img{
            border: 10px solid #ffffff;
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        }
        @media (max-width: 991px) {
            display: flex;
            flex-direction: column;
        }
    }
   .hot-product{
        .customer-box{
            .card{
                border-radius: 10px;
                height: 400px;
                position: relative;
                box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
                &::before{
                    content: '';
                    background: #c0c0c0;
                    width: 60%;
                    height: 5px;
                    margin-top: 10px;
                    position: absolute;
                    border-radius: 20px;
                    top:50%;
                    left:18%
                }
                .card-img{
                    height: 55%;
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: 150px 150px;
                }
                .price{
                    font-size: 30px;
                    .card-text{
                        margin-right: 5px;
                        color: #1abc9c;
                        animation: color-animate 6s infinite linear;
                        font-size: 20px;
                    }
                    .del-card{
                        font-size: 20px;
                        text-decoration:line-through;
                        color: gray !important;
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
                span{
                    position: absolute;
                    top:3%;
                    left:4%;
                    background: #DC3545;
                    padding: 3px;
                    border-radius: 5px;
                    color: #fff;
                }
            }
        }
    }
    .news{
        .news-box{
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
            border-radius: 10px;
            .news-first{
                img{
                    width: 100px;
                    height: 180px;
                }
            }
            p{
                margin-top: 16px;
                text-align: left;
            }
        }
        button{
            border-radius: 5px;
            font-size: 16px;
            color: #fff;
            border: 3px solid #8fc866;
            padding: 10px;
            background-image: linear-gradient(30deg, #8fc866 50%, transparent 50%);
            background-size: 500px;
            background-repeat: no-repeat;
            background-position: 0%;
            transition: background 300ms ease-in-out;
            &:hover {
            background-position: 100%;
            color: #8fc866;
            }
        }
    }
    .other-info{
        .other-box{
            img{
                width: 400px;
                height: 300px;
                border: 10px solid #fff;
                box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
                padding: 0;
                @media (min-width: 773px) and (max-width: 992px) {
                    height: 400px;
                }
            }
            @media (min-width: 300px) and (max-width: 992px){
                    .hideImg{
                        display: none;
                    }
                }
        }
    }
    .product-grid{
        cursor: pointer;
        position: relative;
        border-radius: 10px;
        border: 1px solid #e7e7e7;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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
</style>
