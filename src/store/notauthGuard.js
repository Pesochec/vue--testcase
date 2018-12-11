import store from '@/store'

export default function (to, from, next) {
  if (store.getters.isUserNotLoggedIn) {
    next()
  } else {
    next('/')
  }
}
