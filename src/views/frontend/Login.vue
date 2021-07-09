<template>
  <div>
    <Alert/>
    <div class="wrap">
      <div class="container">
        <div class="row justify-content-center mb-3">
          <div class="col-12 text-center">
              <img class="col-md-6 col-sm-12" src="@/assets/image/Logo.png" alt="Logo">
              <div class="ani-background mt-3 mb-3">
                <img class="ani-img col-md-6 col-sm-12" src="@/assets/image/login-bg.png" alt="Login-bg">
                <div class="ani-object">
                  <img src="@/assets/image/login-object.gif" alt="Login-object">
                </div>
              </div>
          </div>
          <form class="col-md-6 col-sm-12 text-center" @submit.prevent="signIn">
            <input class="mb-3 col-11" type="text" placeholder="xxx@xxx.xxx" v-model="user.username">
            <input class="col-11" type="password" placeholder="*******" v-model="user.password" autocomplete="password">
            <div class="btn-group mt-3 col-sm-12">
              <button type="submit" class="btn w-50 mr-3 btn-primary text-white">登入</button>
              <router-link class="btn w-50 btn-danger" :to="{ name:'CustomerHome' }">返回</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Alert from '@/components/AlertMessage.vue'
export default {
  components: {
    Alert
  },
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signIn () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`
      vm.$store.dispatch('updateLoading', true)
      vm.$http.post(api, vm.user).then((res) => {
        if (res.data.success) {
          const token = res.data.token
          const expired = res.data.expired
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
          vm.$router.push('/admin/products')
          vm.$bus.$emit('message:push', res.data.message, 'success')
        } else {
          vm.$bus.$emit('message:push', res.data.message, 'danger')
        }
        vm.$store.dispatch('updateLoading', false)
      })
    }
  },
  created () {
    const vm = this
    vm.$bus.$emit('getRoute', vm.$route.path)
    console.log(vm.$route.path)
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  background-image: url('../../assets/image/tree-bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  padding: 200px 0;
  height: 100vh;
  .ani-background {
    position: relative;
    .ani-object {
      position: absolute;
      left: 30%;
      bottom: 11%;
      @media (min-width:700px) {
        left:40%;
      }
    }
  }
  form {
    input {
      padding: 5px;
      border: 3px solid #8fc866;
      border-radius: 10px;
      outline: none;
      background: rgba(0, 0, 0, 0.4);
      color: #fff;
    }
  }
}

::placeholder {
  color:#313131;
}

.footer-text {
  font-size: 20px;
  font-weight: bold;
}
</style>
