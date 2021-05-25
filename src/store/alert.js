export default {
  state: {
    messages: []
  },
  actions: {
    updateMessage (context, { msg, status }) {
      const timestamp = Math.floor(new Date() / 1000)
      context.commit('GETMSG', { msg, status, timestamp })
      context.dispatch('removeMessageWithTiming', timestamp)
    },
    removeMessageWithTiming (context, timestamp) {
      setTimeout(() => {
        context.commit('REMOVEMSGWITHTIME', timestamp)
      }, 3000)
    }
  },
  mutations: {
    GETMSG (state, { msg, status, timestamp }) {
      state.messages.push({
        msg,
        status,
        timestamp
      })
    },
    REMOVEMSGWITHTIME (state, payload) {
      state.messages.forEach((item, i) => {
        if (item.timestamp === payload) {
          state.messages.splice(i, 1)
        }
      })
    },
    REMOVEMSG (state, payload) {
      state.messages.splice(payload, 1)
    }
  },
  getters: {
    messages: state => state.messages
  }
}
