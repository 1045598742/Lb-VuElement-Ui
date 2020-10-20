import { createStore } from 'vuex'

const Store = createStore({
  state: {
    message: [1,2,3,4,5]
  },
  getters: {
    message(state) {
      return state.message 
    }
  },
  mutations: {
    addSync(state, payload) {
      state.message = payload
    }
  },
  actions: {
    add( {commit}, payload) {
      setTimeout(() => {
        commit('addSync', payload)
      }, 2000)
    }
  }
})

// Store.subscribe((a, b) => {
//   console.log(a, b)
// })

export default Store
