<template>
  <div>
    <nav class="navbar navbar-expand-md">
      <router-link class="navbar-brand" :to="{name:'CustomerHome'}">
        <img src="@/assets/image/Logo.png" width="200">
      </router-link>
      <button @click="isToggle = !isToggle" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapse_target">
        <i :class="{'toggle':isToggle}" class="fas fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse" id="collapse_target">
        <ul class="navbar-nav ml-auto font-weight-bold">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'Order'}">
              <i class="far fa-file-alt"></i>
              <span class="ml-2">訂單列表</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'Products'}">
              <i class="fas fa-shopping-cart"></i>
              <span class="ml-2">產品列表</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'Coupon'}">
              <i class="fas fa-hand-holding-usd"></i>
              <span class="ml-2">優惠卷</span>
            </router-link>
          </li>
          <li class="nav-item">
            <a href="#" @click.prevent="signOut" class="nav-link">
              <i class="fas fa-sign-out-alt"></i>
              <span class="ml-2">登出</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  data () {
    return {
      isToggle: false
    }
  },
  methods: {
    signOut () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/logout`
      vm.$store.dispatch('updateLoading', true)
      vm.$http.post(api).then((res) => {
        if (res.data.success) {
          vm.$router.push('/login')
        }
        vm.$store.dispatch('updateLoading', false)
      })
    }
  },
  mounted () {
    $('.nav-link').on('click', () => {
      $('.navbar-toggler').click()
    })
  }
}
</script>
<style lang="scss" scoped>
  .navbar{
    background-color: #313131;
    border-bottom:5px solid #8fc866;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    display: flex;
    justify-content: space-around;
    .nav-item{
        text-decoration: none;
        @media (max-width : 758px){
          width: 120px;
          margin-left: 30px;
        }
        a{
          font-size: 20px;
          color: #fff;
          transition:color .3s ease;
          &:hover{
            color: #8fc866;
            text-decoration: none;
          }
        }
        .router-link-exact-active.active{
            pointer-events: none;
            color:#8fc866;
        }
    }
    .navbar-toggler{
      border: 2px solid #8fc866;
      color: #8fc866;
      transition: background .3s ease;
      &:hover{
        background: #8fc866;
        color:#313131;
      }
      i{
        padding: 5px;
        transition: transform .3s ease;
      }
    }
    .toggle{
      transform: rotate(90deg);
    }
  }
</style>
