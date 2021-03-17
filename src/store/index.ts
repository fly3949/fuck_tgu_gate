import { createStore } from 'vuex'
import storage from '@/utils/storage'

export default createStore({
  state: {
    info: {
      photo: '',
      name: '',
      faculty: '',
      stuNum: '',
      leaveTime: '',
      backTime: ''
    }
  },
  mutations: {
    SET_INFO (state, info) {
      state.info = info
      storage.set('INFO', info)
    }
  },
  actions: {
  },
  modules: {
  }
})
