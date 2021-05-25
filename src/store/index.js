import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Alert from './alert'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    cart: []
  },
  actions: {
    updateLoading (context, status) {
      context.commit('LOADING', status)
    },
    getCartList (context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      context.commit('LOADING', true)
      axios.get(api).then((res) => {
        context.commit('LOADING', false)
        context.commit('CART', res.data.data)
      })
    },
    addToCart (context, { item, qty }) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const cart = {
        product_id: item.id,
        qty
      }
      context.commit('LOADING', true)
      axios.post(api, { data: cart }).then((res) => {
        if (res.data.success) {
          context.commit('LOADING', false)
          context.dispatch('updateMessage', { msg: res.data.message, status: 'success' }, { root: true })
          context.dispatch('getCartList')
        }
      })
    },
    updateQty (context, { originCartId, originProductId, newQty }) {
      const delAPI = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${originCartId}`
      const addAPI = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const changeCart = {
        product_id: originProductId,
        qty: newQty
      }
      context.commit('LOADING', true)
      axios.all([axios.delete(delAPI), axios.post(addAPI, { data: changeCart })]).then(axios.spread(() => {
        context.dispatch('getCartList')
        context.commit('LOADING', false)
      }))
    },
    changeQty (context, { id, productId, num }) {
      const delAPI = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      const addAPI = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      context.commit('LOADING', true)
      const newCart = {
        product_id: productId,
        qty: num
      }
      axios.all([axios.delete(delAPI), axios.post(addAPI, { data: newCart })]).then(axios.spread(() => {
        context.dispatch('getCartList')
        context.commit('LOADING', false)
      }))
    },
    enterCoupon (context, coupon) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const code = {
        code: coupon
      }
      context.commit('LOADING', true)
      axios.post(api, { data: code }).then((res) => {
        if (res.data.success) {
          context.dispatch('getCartList')
          context.dispatch('updateMessage', { msg: '輸入成功', status: 'success' }, { root: true })
        } else {
          context.dispatch('updateMessage', { msg: '優惠碼錯誤', status: 'danger' }, { root: true })
        }
        context.commit('LOADING', false)
      })
    },
    delCart (context, id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      context.commit('LOADING', true)
      axios.delete(api).then((res) => {
        context.dispatch('getCartList')
        context.dispatch('updateMessage', { msg: '已刪除商品', status: 'success' }, { root: true })
        context.commit('LOADING', false)
      })
    }
  },
  mutations: {
    LOADING (state, status) {
      state.isLoading = status
    },
    PRODUCTS (state, payload) {
      state.products = payload
    },
    CART (state, payload) {
      state.cart = payload
    }
  },
  getters: {
    isLoading: state => state.isLoading,
    products: state => state.products,
    cart: state => state.cart
  },
  modules: {
    Alert
  }
})
