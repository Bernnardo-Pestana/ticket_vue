<template>
    <div>
         <div class="my-6">
            <h3 class="font-bold">Lista de {{ route.name }}</h3>
            <span class="text-sm text-gray-500"
            >Aqui você pode observar todos os itens relacionados aos {{ route.name.toLowerCase() }} como
            suas respectivas ações.
            </span>
        </div>
        <div class="flex mb-6 justify-center">
            <router-link to="/treinos/criar">
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
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">ID</th>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Nome</th>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Tipo </th>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Ação</th>
                </tr>
            </thead>
             <tbody>
                <tr v-for="(treino) in data" v-bind:key="treino.id" class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 "> 
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> {{ treino.id }} </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> {{ treino.name }} </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> {{ treino.serie }} </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> <Button text="Editar" @click="editar(treino.id)" /> </td>
                </tr>
            </tbody>
        </table>
        </div>
         <div v-else class="index">
            <h2>Não Há Treinos nessa academia :/</h2>
        </div>
    </div>
</template>

<script>
import { inject, ref, onMounted, watch } from "vue";
import {useRouter,useRoute} from 'vue-router'
import Button from "../../components/Button.vue";
import {GET,DELETE} from '../../utils/api'
export default {
name:"index_treino",
components:{
Button,
},

setup(){
    
    const data = ref([])
    const router = useRouter()
    const route = useRoute()
   
    onMounted( async ()=>{
      data.value = await GET('/workout')
      console.log(data.value)
    })


    const deletar  =   async (item) =>{
        
        try {

            const response = await DELETE(`/workout/${item}`)


            data.value = data.value.filter( Element => Element.id != item);
            
        } catch (error) {
            console.log(error)
        }
    }

     const editar  =  (item) =>{
        router.push(`treinos/editar/${item}`)
    }


    return{
        data,
        deletar,
        editar,
        route
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