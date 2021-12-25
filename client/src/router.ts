import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from './store/auth';
import Todos from '@/pages/todos/Todos.vue';
import Auth from '@/pages/auth/Auth.vue';
import Overview from '@/pages/todos/Overview.vue';
import List from '@/pages/todos/List.vue';
import Login from '@/pages/auth/Login.vue';
import Signup from '@/pages/auth/Signup.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Todos,
      meta: { isAuth: true },
      children: [
        { path: 'overview', alias: '', component: Overview, meta: { isAuth: true } },
        { path: ':list', component: List, meta: { isAuth: true } },
      ],
    },
    {
      path: '/',
      component: Auth,
      children: [
        { path: 'login', component: Login, meta: { isAuth: false } },
        { path: 'signup', component: Signup, meta: { isAuth: false } },
      ],
    },
  ],
});

router.beforeEach((to, _, next) => {
  const authStore = useAuthStore();
  if (to.meta.isAuth && !authStore.isAuth) {
    next('/login');
  } else {
    next();
  }
});

export default router;
