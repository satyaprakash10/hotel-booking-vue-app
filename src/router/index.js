import { createRouter, createWebHistory } from "vue-router";
import HomeSearch from "../views/HomeSearch.vue";
import RoomView from "../views/RoomView.vue";
import Rooms from "../views/Rooms.vue";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ContactInfo from "../views/ContactInfo.vue";
import { useAuthStore } from "../store/auth";
import { createPinia } from "pinia";

const routes = [
  { path: "/", component: HomeSearch },
  { path: "/rooms", component: Rooms },
  {
    path: "/room/:id",
    name: "RoomView",
    component: RoomView,
    meta: { requiresAuth: true },
  },
  {
    path: "/confirmation",
    component: () => import("../views/Confirmation.vue"),

    meta: { requiresAuth: true },
  },
  { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/contact", component: ContactInfo, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
const pinia = createPinia();

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
});
export default router;
