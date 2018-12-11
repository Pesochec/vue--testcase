import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import SignIn from './views/auth/SignIn.vue'
import SignUp from './views/auth/SignUp.vue'
import NewRegistering from './views/registering/NewRegistering.vue'
import * as fb from 'firebase'
Vue.use(Router)

 let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignIn,
      meta: {
        auth: false,
        layout: 'auth'
      }
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUp,
      meta: {
        auth: false,
        layout: 'auth'
      }
    },
    {
      path: '/',
      name: 'registering',
      component: Home,
      meta: {
        auth: true,
      }
    },
    {
      path: '/addproduct',
      name: 'registering-new',
      component: NewRegistering,
      meta: {
        auth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth === true)) {
    fb.auth().onAuthStateChanged(function(user) {
      if (!user) {
        next('/sign-in');
      } else {
        next();
      }
    });
  } else {
    next();
  }
  if (to.matched.some(record => record.meta.auth === false)) {
    fb.auth().onAuthStateChanged(function(user) {
      if (user) {
        next('/');
      } else {
        next(false);
      }
    });
  } else {
    next(false);
  }
});

export default router;
