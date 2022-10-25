<template>
  <div>
    <div>
        <router-link to="/">
            <button> Index</button>
        </router-link>
        </div>
       <div>
         aqui jas os Exercicios da academia, ao clicar no Botao criar, voce sera redirecionado para criar um exericio
        <router-link to="/exercicio/criar">
            <button >Criar Exercicio</button>
        </router-link>
       </div>
       <div v-if="data.length >0" class="index">
            <table>
                <t-head>
                    <td>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>tipo</th>
                        <th>Ações</th>
                    </td>
                </t-head>
                <tbody v-for="(item,index) in data" :key="index">
                    <td>
                        <th>{{item.id}}</th>
                        <th>{{item.nome}}</th>
                        <th>{{item.type}}</th>
                        <th>
                            <button @click="editar(item.id)">Editar</button>
                            <button @click="deletar(item.id)">Excluir</button>
                        </th>
                    </td>

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


export default {
name:"index_exercicio",
setup(){
    
    const data = ref([])
    const router = useRouter()
   
    onMounted( async ()=>{
      data.value = await GET('/exercice')
      console.log(data.value)
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