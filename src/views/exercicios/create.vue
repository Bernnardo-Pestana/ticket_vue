<template>
  <div>
    <div>
        <h3>Nesta pagina é onde se adiciona um aluno</h3>
    </div>

    <div class="campos">
      <label for="nome">Nome </label>
      <input type="text" id="nome" v-model="data.nome">

      <label for="nome">Tipo de Exercicio </label>
      <input type="text" id="type" v-model="data.type">
    </div>
    <button @click="criar()">Criar</button>
  </div>
</template>

<script>
import {ref} from 'vue'

import { useRoute, useRouter } from "vue-router";
import {POST} from '../../utils/api'
export default {
  name: "criarExercicio",

  setup(){
    const data = ref({})
    const router = useRouter()

    


    const criar = async () =>{
      try {
        const response = await POST('exercice',data.value)


        if(response){
          data.value = ""
          router.push('/exercicios')
        }
      } catch (error) {
        console.log(error)
      }
    }

    return {
      data,
      criar
    }
  }
};
</script>

<style>
.campos{
  display: flex;
  justify-content: center;
  align-content: space-between;
  margin:5px;
  margin-top:12px;
}
</style>
