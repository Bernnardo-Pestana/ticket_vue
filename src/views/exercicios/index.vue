<template>
    <div>
        <div class="my-6">
            <h3 class="font-bold">Lista de Exercicio</h3>
            <span class="text-sm text-gray-500"
            >aqui jas os Exercicios da academia, ao clicar no Botao criar, voce sera redirecionado para criar um exericio Criar Exercicio
            </span>
            </div>
        <div class="flex mb-6 justify-center">
             <router-link to="/exercicio/criar">
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
                <tbody >
                    <tr v-for="(item,index) in data" :key="index" class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 "> 
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> {{ item.id }} </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> {{ item.nome }} </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> {{ item.type }} </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> <Button text="Editar" @click="editar(item.id)" /> </td>
                    </tr>
            </tbody>
            </table>
        </div>
        <div v-else class="index">
            <h2>Não Há Exercicios nessa academia :/</h2>
        </div>
    </div>
</template>

<script>
import { inject, ref, onMounted, watch } from "vue";
import {useRouter} from 'vue-router'
import {GET,DELETE} from '../../utils/api'
import Button from "../../components/Button.vue";

export default {
name:"index_exercicio",
components:{
Button,
},

setup(){
    
    const data = ref([])
    const router = useRouter()
   
    onMounted( async ()=>{
      data.value = await GET('/exercice')
    })


    const deletar  =   async (item) =>{
        
        try {

            const response = await DELETE(`/client/${item}`)


            data.value = data.value.filter( Element => Element.id != item);
            
        } catch (error) {
            console.log(error)
        }
    }

     const editar  =  (item) =>{
        console.log(item)
        router.push(`exercicio/editar/${item}`)
    }


    return{
        data,
        deletar,
        editar
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