<template>
  <div>
    <div class="my-6">
    <h3 class="font-bold">Criar uma nova Estaçãos De Metro </h3>
    <span class="text-sm text-gray-500"
        >Preencha as informações abaixo e clique no botão <b>criar</b> para salvar
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
      <Button text="Criar" @click="criar()" />
      <router-link to="/estacao">
                <Button color="red" :text="`Pagina Index`" />
        </router-link>
    </div>
  </div>


</template>

<script>
import {ref,onMounted} from 'vue'
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

    const linhas = ref([])

    onMounted(async () =>{

      linhas.value = [{label:"V",value:"V"},{label:"A",value:"A"},{label:"I",value:"I"}]

    })

    


    const criar = async () =>{
      try {
        const response = await POST("station",data.value)

        router.push('/estacao')
      } catch (error) {
        console.log(error)
      }
    }

    return {
      data,
      criar,
      linhas
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
