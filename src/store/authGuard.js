import * as fb from 'firebase'

export default function (to, from, next) {
  if (to.matched.some(record => record.meta.auth)) {
    fb.auth().onAuthStateChanged(function(user) {
      if (!user) {
        next('/auth');
      } else {
        next();
      }
    });
  } else {
    next();
  }
}
