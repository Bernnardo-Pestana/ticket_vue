<template>
  <div>
    <div class="my-6">
      <h3 class="font-bold">Criar um novo Exercicio  </h3>
      <span class="text-sm text-gray-500"
        >Preencha as informações abaixo e clique no botão <b>criar</b> para salvar
        as alterações.
      </span>
    </div>

    <div class="flex justify-center">
          <input type="text" id="nome" v-model="data.nome" placeholder="Nome Exercicio"  class="border rounded-lg py-4 focus:outline-white form-input mt-1 pl-6 block w-96 mx-2">
          <input type="text" id="type" v-model="data.type" placeholder="Tipo de Exercicio"  class="border rounded-lg py-4 focus:outline-white form-input mt-1 pl-6 block w-96">
    </div>
    <div class="flex justify-end mt-5">
          <Button text="Criar" :color="'blue-900'" @click="criar" /> 
          <router-link to="/exercicios">
                <Button color="red" :text="`Pagina Exercicios`" />
          </router-link>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'

import { useRoute, useRouter } from "vue-router";
import {POST} from '../../utils/api'
import Button from "../../components/Button.vue";
export default {
  name: "criarExercicio",
    components: {
    Button,
  },

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

        router.push(`/exercicios`)

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
