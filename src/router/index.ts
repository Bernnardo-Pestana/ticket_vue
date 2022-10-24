import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Labels from "./labels";

const routes: Array<any> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    children: Labels,
  },
  { path: "/:catchAll(.*)", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
