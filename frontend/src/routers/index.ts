import { createRouter, createWebHistory } from 'vue-router'

import Login from "../views/Login.vue";
import Cadastro from '../views/Cadastro.vue';
import Home from '../views/Home.vue';

const routes = [
    {
        path:"/",
        name:"login",
        component:Login
    },
    {
      path:"/cadastro",
      name:"cadastro",
      component:Cadastro
    },
    {
      path:"/home",
      name:"home",
      component:Home
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

const publicPages = ['login', 'cadastro'];

router.beforeEach((to, from, next) => {
  console.log(from.name);
  
  const isAuth = localStorage.getItem('token');
  const isPublic = publicPages.includes((to.name ?? '') as string);

  if (!isPublic && !isAuth) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router
