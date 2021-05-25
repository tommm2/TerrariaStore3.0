<template>
    <div>
        <button @click="goTop" type="button" class="gotop bg-primary">
            <i class="fa fa-angle-up"></i>
        </button>
    </div>
</template>
<script>
import $ from 'jquery'
export default {
  methods: {
    goTop () {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  },
  created () {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 400) {
        $('.gotop').fadeIn()
      } else {
        $('.gotop').fadeOut()
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.gotop {
    outline: none;
    border:none;
    display: none;
    position:fixed;
    z-index:90;
    width:50px;
    height:50px;
    color:#fff;
    line-height:50px;
    border-radius:50%;
    text-align: center;
    right: 4%;
    bottom: 15%;
    @media (max-width:480px) {
        bottom:18%;
        right: 5%;
    }
}
</style>
