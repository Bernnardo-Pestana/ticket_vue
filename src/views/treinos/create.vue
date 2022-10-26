<template>
  <div>
    <div class="my-6">
    <h3 class="font-bold">Criar um novo Treino  </h3>
    <span class="text-sm text-gray-500"
      >Preencha as informações abaixo e clique no botão <b>criar</b> para salvar
      as alterações.
    </span>
  </div>

    <div class="flex justify-center">
        <input type="text" v-model="treino.nome" placeholder="Nome do treino"  class="border rounded-lg py-4 focus:outline-white form-input mt-1 pl-6 block w-96 mx-2">
        <input type="text" v-model="treino.serie" placeholder="Valor da Serie"  class="border rounded-lg py-4 focus:outline-white form-input mt-1 pl-6 block w-96">
    </div>

    <div class="flex justify-end mt-5">
        <Button text="Criar" :color="'blue-900'" @click="criar" />
    </div>
    <div class="card shadow-sm border p-8 bg-white flex" v-if="listaExercicio">
        <div class="mx-10">
            <h2>Lista de Exercicios Disponiveis</h2>
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
                <tr v-for="(exericio) in listaExercicio" v-bind:key="exericio.id" class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 "> 
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> {{ exericio.id }} </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> {{ exericio.nome }} </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> {{ exericio.type }} </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> <Button text="Add" @click="add(exericio.id)" /> </td>
                </tr>
            </tbody>
        </table>
        </div>

        <div>
            <h2>Lista de Exercicios Do Treino: <b> {{ treino.nome }}</b></h2>
            <table class="w-96"> 
                <thead class="bg-white border-b">
                    <tr>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">ID</th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Nome</th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Repetições </th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Series</th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Descanço</th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Observação</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(exericio_treino) in listaTreino" v-bind:key="exericio_treino.id" class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 "> 
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> {{ exericio_treino.id }} </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> {{ exericio_treino.nome }} </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> 
                            <input type="text" v-model="exericio_treino.repeticao" placeholder="Repetições">
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> 
                            <input type="text" v-model="exericio_treino.serie" placeholder="Series">
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> 
                            <input type="text" v-model="exericio_treino.descanco" placeholder="Descanso">
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> 
                            <input type="text" v-model="exericio_treino.observacao" placeholder="Observação?">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  </div>
</template>

<script>
import { inject, ref, onMounted, watch } from "vue";
import {useRouter,useRoute} from 'vue-router'
import Button from "../../components/Button.vue";
import {GET,DELETE} from '../../utils/api'

export default {
  name: "treino_Cria",
  components: {
    Button,
  },

  setup() {
    const treino = ref({})
    const listaExercicio = ref([])
    const listaTreino = ref([])

    onMounted(async () => {
        listaExercicio.value = [... await GET('/exercice')]

    })


    const add = (item) =>{

        listaTreino.value.push(listaExercicio.value[item])

        
    }

    const criar = async ()=>{

        console.log(listaTreino.value)
        console.log(treino.value)
    }



    return {
        treino,
        listaExercicio,
        add,
        listaTreino,
        criar
    };
  },
};
</script>

<style>
</style>