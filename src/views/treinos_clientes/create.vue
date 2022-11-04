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
    <button @click="criar()">Criar</button>
  </div>
</template>

<script>
import {ref} from 'vue'

import { useRoute, useRouter } from "vue-router";
import {POST} from '../../utils/api'
export default {
  name: "createUser",

  setup(){
    const data = ref({})
    const router = useRouter()

    


    const criar = async () =>{
      try {
        const response = await POST('client',data.value)


        if(response){
          data.value = ""
          router.push('/usuario')
        }

        router.push(`/usuario`)

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
