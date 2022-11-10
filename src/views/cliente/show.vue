<template>
    <div>
        <div  class="flex justify-center">
            <input type="text" id="nome" v-model="data.nome" placeholder="Id do usuario"  class="border rounded-lg py-4 focus:outline-white form-input mt-1 pl-6 block w-96 mx-2">
            <Button text="Procurar"  @click="procurar" /> 
        </div>

        <hr>

        <div v-if="show">
            <div class="flex mb-6 justify-end">
                <Button  :text="`Imprimir`" />
            </div>
            <div  class="my-6">
            <h3 class="font-bold">Nome : {{ cliente.nome}}</h3>
        </div>
            <div class ="flex justify-center">
            <table class="w-96"> 
                <thead class="bg-white border-b">
                    <tr>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Nome</th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Serie</th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Repeticao</th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Descanço</th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Peso</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="exercicio in treinoSelected" v-bind:key="exercicio.id" class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 "> 
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> {{ exercicio.Exercicio }} </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ exercicio.serie }}  </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ exercicio.Repeticao }}  </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ exercicio.Descanço }} s </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ exercicio.Peso }} KG </td>
                    </tr>
                </tbody>
            </table>
            </div>
            <div  class="flex justify-center my-5 mx-3">
                <h3 class="font-bold  my-2">Treinos</h3>
                <div v-for="(value,index) in treinoSelector " :key="index">
                    <Button :text="value" class="mx-3" @click="troca(value)"/> 
                </div>   
            </div>

        </div>
        <div v-else class="my-6">
            <h3 class="font-bold">Não Há Treinos</h3>
            <span class="text-sm text-gray-500"
            >Por favor, insira seu numero de matricula acima ou chame um Instrutor.
            </span>
        </div>

    </div>
</template>

<script>
import { inject, ref, onMounted, watch } from "vue";
import {useRouter} from 'vue-router'
import {GET, POST,DELETE} from '../../utils/api'
import Button from "../../components/Button.vue";

export default {
name:"index_exercicio",
components:{
Button,
},

setup(){
    
    const data = ref({})
    const treinos = ref({})
    const router = useRouter()
    const treinoSelector = ref([]);
    const treinoSelected = ref([])
    const show = ref(false)
    const cliente = ref()    

    const procurar = async () =>{

        treinoSelector.value = []
       if(data.value.nome != undefined) {

        cliente.value = await GET(`client/${data.value.nome}`)
        treinos.value = await GET(`register-workout/${data.value.nome}/client`)

        if(JSON.stringify(treinos.value) === '{}')
        {
            show.value = false
        }else{
            show.value =true
        }

            for (const [key, value] of Object.entries(treinos.value)) {
                treinoSelector.value.push(key)
            }

        treinoSelected.value = treinos.value.A
        
       }
    console.log(cliente.value)
    }

    const troca = (id) =>{
        treinoSelected.value = treinos.value[id]

        console.log( treinoSelected.value)
    }

    return{
        data,
        procurar,
        treinoSelector,
        treinoSelected,
        troca,
        show,
        cliente
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