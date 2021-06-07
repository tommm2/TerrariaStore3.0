<template>
  <div>
    <loading :active.sync="isLoading">
      <template slot="default">
        <img width="200" src="@/assets/image/loading-img.gif" alt="Loading">
      </template>
      <template slot="after">
        <div class="wavy d-inline font-weight-bold">
          <span style="--i:1">加</span>
          <span style="--i:2">載</span>
          <span style="--i:3">中</span>
          <span style="--i:4">.</span>
          <span style="--i:5">.</span>
          <span style="--i:6">.</span>
        </div>
      </template>
    </loading>
  </div>
</template>
<script>
export default {
  props: ['isLoading']
}
</script>
<style lang="scss" scoped>
.wavy{
    position: relative;
    span{
        font-family: pixel;
        letter-spacing: 8px;
        position: relative;
        display: inline-block;
        animation: animate 1s ease-in-out infinite;
        animation-delay: calc(.1s*var(--i))
    }
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
</style>
