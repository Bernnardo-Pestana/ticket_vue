<template>
  <div class="card shadow-sm border p-8 bg-white">
    <div class="my-6">
    <h3 class="font-bold">Criar um novo Cliente  </h3>
    <span class="text-sm text-gray-500"
        >Preencha as informações abaixo e clique no botão <b>Salvar</b> para salvar
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
      <Button text="Salvar" @click="editarUsuario()" />
      <router-link to="/usuario">
                <Button color="red" :text="`Pagina Usuarios`" />
        </router-link>
    </div>

    <hr>
    <div>
      <div class="my-6">
        <h3 class="font-bold">Treinos da Academia  </h3>
        <span class="text-sm text-gray-500"
            >Selecione um treino para vincular ao Usuario.
          </span>
          
     </div>
     <div class="flex justify-end my-2">
      <router-link to="/treinos">
      <Button text="Editar Treinos" />
      </router-link >
     </div>

      <div v-if="treinos" class="card shadow-sm border p-8 bg-white flex justify-center">
           <table class="w-96"> 
            <thead class="bg-white border-b">
                <tr>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">ID</th>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Nome</th>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Ação</th>
                </tr>
            </thead>
             <tbody>
                <tr v-for="(key, value,index) in treinos" v-bind:key="value.id" class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 "> 
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> {{ index }} </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> {{ value }} </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> <Button text="Adicionar" @click="editar(value)" /> </td>
                </tr>
            </tbody>
        </table>
        </div>
         <div v-else class="flex justify-center">
            <h2>Não Há Treinos nessa academia :/</h2>
        </div>
    </div>
  </div>


</template>

<script>
import {onMounted, ref} from 'vue'
import Button from "../../components/Button.vue";

import { useRoute, useRouter } from "vue-router";
import {PUT,GET,POST} from '../../utils/api'
export default {
  name: "editarUser",
  components:{
  Button,
  },

  setup(){
    const data = ref({})
    const router = useRouter()
    const route = useRoute()
    const treinos = ref()

    onMounted(async () =>{
        data.value = {... await GET(`client/${route.params.id}`)}

        console.log(data.value)

        const list = [... await GET('/workout')]


        treinos.value = list.reduce((groups, item) => {
          const group = (groups[item.name] || []);
            group.push(item);
            groups[item.name] = group;
            return groups;
        }, {});

    })


    const editar = async (item) =>{
      try {
        const treinos_add = {
          user_id : data.value.id,
          treino : [... treinos.value[item]]
        }

      

        await POST(`/register-workout`,treinos_add)
        
      
      } catch (error) {
        console.log(error)
      }
    }

    const editarUsuario = async ()=>{
      try {
        await PUT(`client/${route.params.id}`, data.value)
      } catch (error) {
        
      }
    }

    return {
      data,
      editar,
      treinos,
      editarUsuario
    }
  }
};
</script>

<style>

</style>
