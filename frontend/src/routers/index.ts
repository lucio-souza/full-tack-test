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

router.beforeEach((to, from, next) => {
  console.log(from.name);
  const isAuth = localStorage.getItem('token')
  if (to.name !== 'login' && !isAuth) next({ name: 'login' })
  else next()
})

export default router
