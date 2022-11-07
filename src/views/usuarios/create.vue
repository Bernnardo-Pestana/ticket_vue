<template>
  <div>
    <div class="my-6">
    <h3 class="font-bold">Criar um novo Cliente  </h3>
    <span class="text-sm text-gray-500"
        >Preencha as informações abaixo e clique no botão <b>criar</b> para salvar
        as alterações.
      </span>
     </div>

    <div class="flex justify-center">
        <label for="nome">Nome </label>
        <input type="text" id="nome" v-model="data.nome"  class="border rounded-lg py-4 focus:outline-white form-input mt-1 pl-6 block w-96 mx-2">

        <label for="nome">CPF </label>
        <input type="text" id="cpf" v-model="data.cpf"  class="border rounded-lg py-4 focus:outline-white form-input mt-1 pl-6 block w-96 mx-2">

        <label for="nome">Telefone </label>
        <input type="text" id="telefone" v-model="data.telefone"  class="border rounded-lg py-4 focus:outline-white form-input mt-1 pl-6 block w-96 mx-2">

      
    </div>
    <div class="flex justify-center">
      <label for="nome">Endereço </label>
      <input type="text" id="endereco" v-model="data.endereco"  class="border rounded-lg py-4 focus:outline-white form-input mt-1 pl-6 block w-96 mx-2">

      <label for="nome">Email </label>
      <input type="text" id="email" v-model="data.email"  class="border rounded-lg py-4 focus:outline-white form-input mt-1 pl-6 block w-96 mx-2">
    </div>

    <div class="flex justify-end mt-5">
      <Button text="Criar" @click="criar()" />
      <router-link to="/usuario">
                <Button color="red" :text="`Pagina Usuarios`" />
        </router-link>
    </div>
    
  </div>


</template>

<script>
import {ref} from 'vue'
import Button from "../../components/Button.vue";

import { useRoute, useRouter } from "vue-router";
import {POST} from '../../utils/api'
export default {
  name: "createUser",
  components:{
    Button
  },

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
