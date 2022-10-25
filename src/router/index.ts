import { createRouter, createWebHistory } from "vue-router";
import Base from "../views/Base.vue";
import Labels from "./labels";

const routes: Array<any> = [
  {
    path: "/",
    name: "Base",
    component: Base,
    children: Labels,
  },
  { path: "/:catchAll(.*)", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
