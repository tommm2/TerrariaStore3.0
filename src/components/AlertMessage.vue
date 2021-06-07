<template>
  <div class="message-alert">
    <div class="alert"
      :class="'alert-' + item.status"
      v-for="(item, i) in messages" :key="i">
      <img class="pr-1" src="@/assets/image/Alert.gif" alt="Alert">
      <span>{{ item.msg }}</span>
      <button type="button" class="close pl-2" @click="REMOVEMSG(i)" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'Alert',
  data () {
    return {}
  },
  methods: {
    ...mapMutations(['REMOVEMSG'])
  },
  computed: {
    ...mapGetters(['messages'])
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
