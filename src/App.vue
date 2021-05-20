<template>
  <div id="app">
    <Loading :isLoading="isLoading" />
    <router-view/>
  </div>
</template>
<script>
import Loading from '@/components/Loading.vue'
export default {
  components: {
    Loading
  },
  computed: {
    isLoading () {
      const vm = this
      return vm.$store.state.isLoading
    }
  }
}
</script>
<style lang="scss">
@import './assets/all.scss';
@import "./common/font/font.css";
*{
  list-style: none;
  padding:0;
}
</style>
