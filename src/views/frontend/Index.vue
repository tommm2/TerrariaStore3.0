<template>
  <div>
      <header>
        <CustomerNavbar class="fixed-top"/>
      </header>
      <main>
        <router-view/>
      </main>
      <footer>
        <CustomerFooter/>
      </footer>
      <Cart v-if="route !== '/customerCart'"/>
      <Alert/>
  </div>
</template>
<script>
import CustomerNavbar from './CustomerNavbar.vue'
import CustomerFooter from './CustomerFooter.vue'
import Cart from './Cart.vue'
import Alert from '@/components/AlertMessage.vue'
export default {
  data () {
    return {
      route: ''
    }
  },
  components: {
    CustomerNavbar,
    CustomerFooter,
    Alert,
    Cart
  },
  created () {
    this.$bus.$on('getRoute', (route) => {
      this.route = route
    })
  }
}
</script>
<style lang="scss" scoped>
footer {
  background: #313131;
}
</style>
