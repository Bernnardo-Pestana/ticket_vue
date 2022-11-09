<template>
    <div>
        <div  class="flex justify-center">
            <input type="text" id="nome" v-model="data.nome" placeholder="Nome / Id"  class="border rounded-lg py-4 focus:outline-white form-input mt-1 pl-6 block w-96 mx-2">
            <Button text="Procurar"  @click="procurar" /> 
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
    const treinos = ref([])
    const router = useRouter()
    

    const procurar = async () =>{
        console.log(data.value)
    }

    return{
        data,
        procurar
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