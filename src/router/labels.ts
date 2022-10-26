const List = [
  //Padrao a ser seguido das views:
  {
    label: "Dashboard",
    name: "Dashboard",
    path: "/",
    component: () => import("../views/HomeView.vue"),
  },

  //usuarios 
  {
    label: "Usuario",
    name: "usuario/cria",
    path: "/usuario/create",
    component: () => import("../views/usuarios/create.vue"),
  },
  {
    label: "index_usuario",
    name: "index_usuario",
    path: "/usuario",
    component: () => import("../views/usuarios/index.vue"),
  },
  {
    label: "Usuario",
    name: "usuario/editar",
    path: "/usuario/editar/:id",
    component: () => import("../views/usuarios/edit.vue"),
  },

  //exercicios
  {
    label: "Exercico",
    name: "exercicio",
    path: "/exercicios",
    component: () => import("../views/exercicios/index.vue"),
  },
  
  {
    label: "Exercico",
    name: "exercicio/editar",
    path: "/exercicio/editar/:id",
    component: () => import("../views/exercicios/edit.vue"),
  },
  {
    label: "Exercico",
    name: "exercicio/criar",
    path: "/exercicio/criar",
    component: () => import("../views/exercicios/create.vue"),
  },

  //treinos
  {
    label: "Treino",
    name: "treino",
    path: "/treinos",
    component: () => import("../views/treinos/index.vue"),
  },
  {
    label: "Treino Criar",
    name: "treino_Cria",
    path: "/treinos/criar",
    component: () => import("../views/treinos/create.vue"),
  },
  {
    label: "Treino Editar",
    name: "treino Editar",
    path: "/treinos/editar/:id",
    component: () => import("../views/treinos/edit.vue"),
  },

];
export default List;
