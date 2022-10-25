<template>
  <div>
    <div>
        <h3>Nesta pagina é onde se adiciona um aluno</h3>
    </div>

    <div class="campos">
      <label for="nome">Nome </label>
      <input type="text" id="nome" v-model="data.nome">

      <label for="nome">CPF </label>
      <input type="text" id="cpf" v-model="data.cpf">

      <label for="nome">Telefone </label>
      <input type="text" id="telefone" v-model="data.telefone">

      
    </div>
    <div class="campos">
      <label for="nome">Endereço </label>
      <input type="text" id="endereco" v-model="data.endereco">

      <label for="nome">Email </label>
      <input type="text" id="email" v-model="data.email">
    </div>
    <button @click="editar()">Editar</button>
  </div>
</template>

<script>
import {onMounted, ref} from 'vue'

import { useRoute, useRouter } from "vue-router";
import {PUT,GET} from '../../utils/api'
export default {
  name: "editarUser",

  setup(){
    const data = ref({})
    const router = useRouter()
    const route = useRoute()

    onMounted(async () =>{
        data.value = {... await GET(`client/${route.params.id}`)}

        console.log(data.value)
    })


    const editar = async () =>{
      try {
        const response = await PUT(`client/${route.params.id}`,data.value)


        if(response){
          data.value = ""
          router.push('/usuario')
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
