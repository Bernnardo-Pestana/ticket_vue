const List = [
  //Padrao a ser seguido das views:
  {
    label: "Dashboard",
    name: "Dashboard",
    path: "/",
    component: () => import("../views/HomeView.vue"),
  },
  {
    label: "Usuario",
    name: "usuario/cria",
    path: "/usuario/create",
    component: () => import("../views/usuarios/create.vue"),
  },
];
export default List;
