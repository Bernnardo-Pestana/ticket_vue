const List = [
  //estacao 
  {
    label: "estacao",
    name: "estacao/cria",
    path: "/estacao/create",
    component: () => import("../views/usuarios/create.vue"),
  },
  {
    label: "index_estacao",
    name: "index_estacao",
    path: "/estacao",
    component: () => import("../views/usuarios/index.vue"),
  },
  {
    label: "estacao",
    name: "estacao/editar",
    path: "/estacao/editar/:id",
    component: () => import("../views/usuarios/edit.vue"),
  },

  {
    label: "Ticket",
    name: "Ticket",
    path: "/",
    component: () => import("../views/ticket/index.vue"),
  },


 

];
export default List;
