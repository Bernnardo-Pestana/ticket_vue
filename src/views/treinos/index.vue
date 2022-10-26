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
            </div>
        
        <div v-if="data.length >0" class="index">
            <table>
                <t-head>
                    <td>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Serie</th>
                        <th>Ações</th>
                    </td>
                </t-head>
                <tbody v-for="(item,index) in data" :key="index">
                    <td>
                        <th>{{item.id}}</th>
                        <th>{{item.nome}}</th>
                        <th>{{item.email}}</th>
                        <th>{{item.cpf}}</th>
                        <th>
                            <button @click="editar(item.id)">Editar</button>
                            <button @click="deletar(item.id)">Excluir</button>
                        </th>
                    </td>

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
        router.push(`workout/editar/${item}`)
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