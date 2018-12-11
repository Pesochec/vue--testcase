import Vue from 'vue'
import Vuex from 'vuex'
import product from '@/store/product'
import user from '@/store/user'
import common from '@/store/common'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    product,
    user,
    common
  }
})
