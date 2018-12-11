import Vue from 'vue'
import 'jquery'
import 'popper.js'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueCookie from 'vue-cookie'
import App from './App.vue'
import router from './router'
import store from './store'
import VeeValidate from 'vee-validate'
import * as fb from 'firebase'
import { mapActions } from 'vuex';
import VueExtendLayout from 'vue-extend-layout'
Vue.use(VueExtendLayout)
Vue.use(VueCookie)
Vue.use(VeeValidate)
library.add(faSignOutAlt, faUser)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  methods: {
    ...mapActions({
      alu: 'autoLoginUser',
      fetchproducr: 'fetchProducts'
    })
  },
  created() {
    var config = {
      apiKey: "AIzaSyCglq3W6XIvktb1nwke7GnyMkz67IeeCNA",
      authDomain: "finaltextcase.firebaseapp.com",
      databaseURL: "https://finaltextcase.firebaseio.com",
      projectId: "finaltextcase",
      storageBucket: "finaltextcase.appspot.com",
      messagingSenderId: "248813363746"
    };

    fb.initializeApp(config);
    let t = this
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        t.$cookie.get('profile')
        t.alu(user)
        t.fetchproducr('fetchProducts')
        t.$router.push('/')
      } else {
        t.$router.push('/sign-in')
      }
    })
  },
  render: h => h(App),
}).$mount('#app')
