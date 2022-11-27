<template>
    <div>
        <div v-if="!show">
        <div class="my-6">
            <h3 class="font-bold">Lista de Estações</h3>
            <span class="text-sm text-gray-500"
            >Todas as estações cadastradas estão aqui
            </span>
        </div>
       <div class="flex mb-6 justify-center">
         <router-link to="/estacao/create">
            <Button color="red" :text="`Criar`" />
        </router-link>
        <router-link to="/">
                <Button color="red" :text="`Pagina Inicial`" />
        </router-link>
       </div>
        <div v-if="data.length >0" class="index">
            <table class="w-96"> 
            <thead class="bg-white border-b">
                <tr>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left"><center>ID</center></th>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left"><center>Nome</center></th>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left"><center>Linha</center></th> 
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left"><center>Ação</center></th>
                </tr>

                </thead>
                <tbody>
                    <tr  v-for="(item,index) in data" :key="index" class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 ">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> {{ item.id }} </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> {{ item.nome }} </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> {{ item.linha }} </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex"> <Button text="Editar" @click="editar(item.id)" /> </td>
                    </tr>

                </tbody>
            </table>
        </div>
         <div v-else class="index">
            <h2>Não Há estações cadastradas</h2>
        </div>

        
        </div>
        <div v-else>
            <Loader  :show="show"/>
        </div>

    </div>
    
</template>

<script>
import { inject, ref, onMounted, watch } from "vue";
import Button from "../../components/Button.vue";
import Loader from '../../components/Loader.vue'
import {useRouter} from 'vue-router'
import {GET,DELETE} from '../../utils/api'
export default {
name:"index_usuario",
components:{
Button,
Loader
},

setup(){
    
    const data = ref([])
    const router = useRouter()
    const show = ref(false)
   
    onMounted( async ()=>{
      show.value = true;

      data.value = await GET('/station')

      show.value = false;
    })


    const editar  =  (item) =>{
        router.push(`estacao/editar/${item}`)
    }


    return{
        data,
        editar,
        show
    }
}


}
</script>

<style>
.index{
  display: flex;
  justify-content: center;
  align-content: space-between;
  margin:5px;
  margin-top:12px;
}
</style>