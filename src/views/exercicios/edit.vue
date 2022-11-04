<template>
  <div>
    <div class="my-6">
      <h3 class="font-bold">Editar Exercicio  </h3>
      <span class="text-sm text-gray-500"
        >Preencha as informações abaixo e clique no botão <b>Salvar</b> para salvar
        as alterações.
      </span>
    </div>

    <div class="flex justify-center">
        <input type="text" id="nome" v-model="data.nome" placeholder="Nome do Exercicio"  class="border rounded-lg py-4 focus:outline-white form-input mt-1 pl-6 block w-96 mx-2">
        <input type="text" id="type" v-model="data.type" placeholder="Tipo de Exercicio"  class="border rounded-lg py-4 focus:outline-white form-input mt-1 pl-6 block w-96">
    </div>
    <div class="flex justify-end mt-5">
        <Button text="Salvar" :color="'blue-900'" @click="editar()" />
    </div>
  </div>
</template>

<script>
import {ref,onMounted} from 'vue'

import { useRoute, useRouter } from "vue-router";
import Button from "../../components/Button.vue";
import {GET, PUT} from '../../utils/api'
export default {
  name: "editarExercicio",
    components: {
    Button,
  },

  setup(){
    const data = ref({})
    const router = useRouter()
    const route = useRoute()

    onMounted(async ()=>{
        data.value = {... await GET(`exercice/${route.params.id}`)}
    })


    const editar = async () =>{
      try {
        const response = await PUT(`exercice/${route.params.id}`,data.value)


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
      editar
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
