<template>
  <div>
    <nav class="navbar navbar-expand-md">
      <router-link class="navbar-brand" :to="{ name:'CustomerHome' }">
        <img src="@/assets/image/Logo.png" width="200" alt="Logo">
      </router-link>
      <button @click="isToggle = !isToggle" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapse_target">
        <i :class="{ 'toggle':isToggle }" class="fas fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse" id="collapse_target">
        <ul class="navbar-nav ml-auto font-weight-bold">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name:'CustomerHome' }">
              <i class="fas fa-home"></i>
              <span class="ml-2">首頁</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name:'CustomerProduct' }">
              <i class="fas fa-shopping-basket"></i>
              <span class="ml-2">所有商品</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name:'CustomerCart' }">
              <i class="fas fa-shopping-cart"></i>
              <span class="ml-2">購物車</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name:'Login' }">
              <i class="fas fa-users-cog"></i>
              <span class="ml-2">管理</span>
            </router-link>
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
  mounted () {
    $('.nav-link').on('click', () => {
      $('.navbar-toggler').click()
    })
  }
}
</script>
<style lang="scss" scoped>
.navbar {
  background-color: #313131;
  border-bottom:5px solid #8fc866;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  display: flex;
  justify-content: space-around;
  .nav-item {
    text-decoration: none;
    @media (max-width : 758px) {
      width: 120px;
      margin-left: 30px;
    }
    a {
      font-size: 20px;
      color: #fff;
      transition:color .3s ease;
      &:hover {
        color: #8fc866;
        text-decoration: none;
      }
    }
    .router-link-exact-active.active {
      pointer-events: none;
      color:#8fc866;
    }
  }
  .navbar-toggler {
    border: 2px solid #8fc866;
    color: #8fc866;
    transition: background .3s ease;
    &:hover {
      background: #8fc866;
      color:#313131;
    }
    i {
      padding: 5px;
      transition: transform .3s ease;
    }
  }
  .toggle {
    transform: rotate(90deg);
  }
}
</style>
