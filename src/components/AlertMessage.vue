<template>
  <div class="message-alert">
    <div class="alert"
      :class="'alert-' + item.status"
      v-for="(item, i) in messages" :key="i">
      <img class="pr-1" src="../assets/image/Alert.gif">
      <span>{{ item.message }}</span>
      <button type="button" class="close pl-2" @click="removeMessage(i)" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Alert',
  data () {
    return {
      messages: []
    }
  },
  methods: {
    updateMessage (message, status) {
      const timestamp = Math.floor(new Date() / 1000)
      this.messages.push({
        message,
        status,
        timestamp
      })
      this.removeMessageWithTiming(timestamp)
    },
    removeMessage (num) {
      this.messages.splice(num, 1)
    },
    removeMessageWithTiming (timestamp) {
      const vm = this
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1)
          }
        })
      }, 3000)
    }
  },
  created () {
    const vm = this
    // 自定義名稱 'messsage:push'
    // message: 傳入參數
    // status: 樣式，預設值為 warning
    vm.$bus.$on('message:push', (message, status = 'warning') => {
      vm.updateMessage(message, status)
    })
  }
}
</script>
<style scoped>
.message-alert {
  position: fixed;
  max-width: 60%;
  top: 30%;
  right: 20px;
  z-index: 1100;
}
</style>
