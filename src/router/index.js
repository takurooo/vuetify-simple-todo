import Vue from 'vue';
import VueRouter from 'vue-router';
import Todo from '@/views/Todo.vue';
import goTo from 'vuetify/es5/services/goto';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'All',
    component: Todo,
  },
  {
    path: '/today',
    name: 'Today',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/Today.vue'),
  },
  {
    path: '/week',
    name: 'Week',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Week.vue'),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${process.env.VUE_APP_TITLE} - ${to.name}`;
  next();
});

router.afterEach(() => {
  goTo(0, { duration: 0 });
});

export default router;
