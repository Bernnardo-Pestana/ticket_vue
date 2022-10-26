<template>
  <div>
    
    <div>
      <h2>Aqui tem a Lista de treinos</h2>
      <router-link to="/treinos">
        <button type="button" class="bg-gray-400"> Treinos</button>
      </router-link>
    </div>

    <div>
      <h2>Aqui tem a Lista de Exercicios</h2>
      <router-link to="/exercicios">
       <button type="button" class="bg-gray-400" >Exercicios</button>
      </router-link>
    </div>


    <div>

      <h2>Veja todos os Alunos</h2>
      <router-link to="/usuario">
       <button type="button" class="bg-gray-400" >Alunos</button>
      </router-link>
    </div>

    <div>
      <h2>Aqui voce add Treino a Alunos</h2>
     <button type="button" class="bg-gray-400">Adicionar Treino a Alunos</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  name: "App",

  data() {
    return {
      isMobile: false,
    };
  },
});
</script>
