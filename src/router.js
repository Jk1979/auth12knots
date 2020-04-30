import Vue from 'vue'
import Router from 'vue-router'
import store from './store'



Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {layout: 'main', auth: true},
      component: () => import( './views/Home.vue'),
      beforeEnter: (to, from, next) => {
        guard(to, from, next);
      }
    },
    {
      path: '/login',
      name: 'login',
      meta: {layout: 'empty'},
      component: () => import( './views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: {layout: 'empty', auth: true},
      component: () => import( './views/Register.vue')
    },
    {
      path: '/categories',
      name: 'categories',
      meta: {layout: 'main', auth: true},
      component: () => import( './views/Categories.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      meta: {layout: 'main', auth: true},
      component: () => import( './views/Profile.vue')
    },
    {
      path: '/history',
      name: 'history',
      meta: {layout: 'main', auth: true},
      component: () => import( './views/History.vue')
    },
    {
      path: '/addbooking',
      name: 'addbooking',
      meta: {layout: 'main', auth: true},
      component: () => import( './views/Addbooking.vue')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      meta: {layout: 'main', auth: true},
      component: () => import( './views/Detail.vue')
    },
    {
      path: '/statistic',
      name: 'statistic',
      meta: {layout: 'main', auth: true},
      component: () => import( './views/Statistic.vue')
    }
  ]
})

const guard = function(to, from, next) {
  // check for valid auth token
  const user = store.state.auth.user;
  if(user && user.id) {
    console.log(user)
    next();
  }
  else {
    store.dispatch('getUser').then((res)=> {
      console.log(res);
      next();
    }).catch((err)=> {
      next('/login?message=login');
    })
  }
  
};

// router.beforeEach((to, from, next)=>{
  
//   const currentUser = localStorage.getItem('user');
//   console.log(currentUser.id);
//   // const needAuth = false
//   // if(needAuth && !currentUser) {
//   //     next('/login?message=login');
//   // } else {
//   // console.log(store.getters.user);
//   //   next();
//   // }
//     next();

// })

export default router;
