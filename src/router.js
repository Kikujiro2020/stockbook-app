import { createRouter, createWebHistory } from "vue-router";
import Userdata from './components/Userdata.vue'
import Stockitems from './components/Stockitems.vue'
import Register from './components/Register.vue'
import Login from './components/Login.vue'
import Update from './components/Update.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";

const routes = [
  {
    path: '/',
    name: 'userdata',
    component: Userdata,
    props: {
      msg: 'ハロー',
    },
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    name: 'stockitems',
    component: Stockitems,
    meta: { requiresAuth: true }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: { requiresAuth: false }

  },

  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { requiresAuth: false }
  },

  {
    path: '/update',
    name:'update',
    component: Update,
    meta: { requiresAuth: true}

  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})


// router.beforeEach(async (to, from) => {

//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
//   const auth = getAuth()
//   let isLogin
//   await onAuthStateChanged(auth, (user) => {
//     if (user) {
//       isLogin = true;
//     } else {
//       isLogin = false;
//     }
//   });
 
//   if (requiresAuth && !isLogin) return '/login'
// })

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  let isLogin
  const auth = getAuth()
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      isLogin = true;
    } else {
      isLogin = false;
    }
  });

  if (requiresAuth && !isLogin) {
    next('/login')
  } else {
    next();
  }
})

export default router


