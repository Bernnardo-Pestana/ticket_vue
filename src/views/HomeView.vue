<template>
  <div class="my-6">
    
    
    <div class="2-column with sign-up">
      
      
      <img src="../assets/treino.png" height="190" width="190" class="posicao1">
      <router-link to="/treinos">
        <Button color="red" :text="`Adicionas Treinos`" class="posicao2"/>
      </router-link>
      
    </div>
    

    <div>
      
      <img src="../assets/exercicios.png" height="190" width="190" class="posicao3">
      <router-link to="/exercicios">
       <Button color="red" :text="`Adicionas Exercicios`" class="posicao4"/>
      </router-link>
    </div>


    <div>

      
      <img src="../assets/Alunos.png" height="190" width="190" class="posicao5">
      <router-link to="/usuario">
       <Button color="red" :text="`Lista Alunos`" class="posicao6"/>
      </router-link>
    </div>

    <div>
      
      <img src="../assets/alunotre.png" height="190" width="190" class="posicao7">
       <router-link to="/treino_usuario">
       <Button color="red" :text="`Adicionar Treino ao Alunos`" class="posicao8"/>
      </router-link>
    </div>
  </div>
  
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import Button from "../components/Button.vue";
import "./index.css";

export default defineComponent({
  name: "App",
components:{
Button,
},
  data() {
    return {
      isMobile: false,
    };
  },
});
</script>
