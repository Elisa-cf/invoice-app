import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/invoicesboard',
      name: 'invoicesboard',
      component: () => import('../views/InvoicesBoard.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue'),
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/SignIn.vue'),
    },
  ],
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user)
      },
      reject
    )
  });

}

//check which routes/pages requires authentication
router.beforeEach( async (to, from, next) => {
  if(to.matched.some((record) => record.meta.requiresAuth)){
    if (await getCurrentUser()) {
      next();
    } else {
      alert('please sign in to access your invoices!');
      next('/signin');
    }
  }else{
    next()
  }

});

export default router;
