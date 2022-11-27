<template>
  
  <div >
    <div class="my-6">
    <h3 class="font-bold">Editar Estação  </h3>
    <span class="text-sm text-gray-500"
        >Preencha as informações abaixo e clique no botão <b>Salvar</b> para salvar
        as alterações.
      </span>
     </div>

     <div class="flex justify-center">
       <div class="align-center">
        <input type="text" id="nome" v-model="data.nome"  class="border rounded-lg py-4 focus:outline-white form-input mt-1 pl-6 block w-96 mx-2" placeholder="Nome da Estação">
       </div>
        
       <div>
      
        <select id="nome" class="border rounded-lg bg-white py-4 w-32 focus:outline-white form-input mt-1 pl-6 block w-72 px-4 form-select" v-model="data.linha">
          <option disabled value="">Please select one</option>
          <option :value="item.value" v-for="item in linhas" :key="item.label">{{ item.label }}</option>
        </select>    
      </div>  
    </div>

    <div class="flex justify-center mt-5">
      <Button text="Salvar" @click="editarUsuario()" />
      <router-link to="/estacao">
                <Button color="red" :text="`Pagina Das Estaçoes`" />
        </router-link>
    </div>


    <div class="card shadow-lg border rounded-lg p-8 bg-white mt-10">
      <div class="my-6">
      <h3 class="font-bold">Tabela da Quantidade de Clientes como Origem</h3>
      <span class="text-sm text-gray-500"
          >Nessas duas tabelas, temos a quantidade de clientes passando por essa estação
        </span>
     </div>

    <div class="card flex justify-center"> 
      <table class="w-96"> 
            <thead class="bg-white border-b">
                <tr>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left"><center>Dia</center></th>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left"><center>Quantidade</center></th>

                </tr>

                </thead>
                <tbody>
                    <tr  v-for="(item,index) in origem" :key="index" class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 ">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> {{ item.dia }} </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> {{ item.qtd }} </td>
                    </tr>
                </tbody>
            </table>
    </div>

 <hr class="my-9" />  

      <div class="my-6">
      <h3 class="font-bold">Tabela da Quantidade de Clientes como Destino</h3>
      <span class="text-sm text-gray-500"
          >Nessas duas tabelas, temos a quantidade de clientes passando por essa estação
        </span>
     </div>

    <div class="card flex justify-center"> 
      <table class="w-96"> 
            <thead class="bg-white border-b">
                <tr>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left"><center>Dia</center></th>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left"><center>Quantidade</center></th>

                </tr>

                </thead>
                <tbody>
                    <tr  v-for="(item,index) in destino" :key="index" class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 ">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> {{ item.dia }} </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> {{ item.qtd }} </td>
                    </tr>
                </tbody>
            </table>
    </div>
    </div>

  </div>

</template>

<script>
import {onMounted, ref} from 'vue'
import Button from "../../components/Button.vue";

import { useRoute, useRouter } from "vue-router";
import {PUT,GET,POST,DELETE} from '../../utils/api'
export default {
  name: "editarUser",
  components:{
  Button,
  },

  setup(){
    const data = ref({})
    const router = useRouter()
    const route = useRoute()
    const linhas = ref([])

    const destino = ref([])
    const origem = ref([])

    onMounted(async () =>{
        data.value = {... await GET(`station/${route.params.id}`)}
        
        linhas.value = [{label:"V",value:"V"},{label:"A",value:"A"},{label:"I",value:"I"}]


        destino.value = [... await GET(`ticket/${route.params.id}/destino`)]
        origem.value = [... await GET(`ticket/${route.params.id}/origem`)]

        console.log(destino.value)
        console.log(origem.value)

    })


    const editarUsuario = async ()=>{
      try {
        await PUT(`client/${route.params.id}`, data.value)
      } catch (error) {
        
      }
    }

    return {
      data,
      editarUsuario,
      linhas,
      origem,
      destino
    }
  }
};
</script>

<style>

</style>
