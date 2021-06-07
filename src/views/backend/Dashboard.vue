<template>
  <div class="wrap">
    <Navbar class="fixed-top"/>
    <Alert/>
    <main>
      <router-view/>
    </main>
  </div>
</template>
<script>
import Navbar from './Navbar.vue'
import Alert from '@/components/AlertMessage.vue'
export default {
  components: {
    Navbar,
    Alert
  },
  created () {
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = myCookie
  }
}
</script>
<style scoped>
.wrap{
    padding-top: 100px;
}
</style>
