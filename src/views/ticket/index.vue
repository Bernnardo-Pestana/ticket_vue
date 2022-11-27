<template>
  <div>
   <div v-if="comprou">
     <div class="my-6">
    <h3 class="font-bold">Comprar Ticket  </h3>
    <span class="text-sm text-gray-500"
        >Preencha as informações abaixo e clique no botão <b>Comprar</b> para comprar
       o Ticket.
      </span>
     </div>

     <div class="justify-center" v-if="selecinando">
        <div class="flex justify-center">
                
        <input type="date" class="border rounded-lg py-4 appearance-none focus:outline-white form-input mt-1 pl-6 pr-4 block w-48" v-model="data.data">

        <select id="nome" class="border rounded-lg bg-white py-4 w-32 focus:outline-white form-input mt-1 pl-6 block w-72 px-4 form-select mx-2" v-model="data.origem">
          <option disabled value="">Seleciono estação de Origem</option>
          <option :value="item" v-for="item in estacoes" :key="item.id">{{ item.nome }} - {{ item.linha}}</option>
        </select> 

        <select id="nome" class="border rounded-lg bg-white py-4 w-32 focus:outline-white form-input mt-1 pl-6 block w-72 px-4 form-select mx-2" v-model="data.destino">
          <option disabled value="">Seleciono estação de Destino</option>
          <option :value="item" v-for="item in estacoes" :key="item.id">{{ item.nome }} - {{ item.linha}}</option>
        </select>    
            </div>
        
        <div class="flex justify-center my-2">
            <Button text="Comprar" @click="comprar()" /> 
        </div>
    </div>

    <div v-else>
        <div class="flex justify-center">
            <input type="radio" id="one" value="Pix" v-model="formaPagamento" class="border rounded-lg bg-white py-4 w-32 focus:outline-white form-input mt-1 pl-6 block w-12 px-4 form-select mx-2">
            <label for="one">Pix</label>  
            <input type="radio" id="two" value="Cartao" v-model="formaPagamento" class="border rounded-lg bg-white w-32  form-input mt-1 pl-6 block w-12 px-4 form-select mx-2">
            <label for="two">Cartao</label>   
        </div>

        <div class="card" v-if="formaPagamento == 'Pix'">
            <h3 class="font-bold my-5">Valor: {{data.price}} </h3>

            <div class="flex justify-center">
                <img src="../../assets/qrcode.jpeg" alt="" class="w-96">
            </div>
            <div class="flex justify-center my-5">
                <Button text="Pago" @click="pagar()"  class="mx-10"/>
            </div>
        </div>

        <div class="card" v-if="formaPagamento == 'Cartao'">
            <h3 class="font-bold my-5">Valor: {{data.price}} </h3>

            <div class="flex justify-center">
                <input type="text" name="" id="" class="border rounded-lg py-4 focus:outline-white form-input mt-1 pl-6 block w-96 mx-2" placeholder="Numero do Cartão">
                <input type="password" name="" id="" class="border rounded-lg py-4 focus:outline-white form-input mt-1 pl-6 block w-96 mx-2" placeholder="senha">
            </div>
            <div class="flex justify-center my-5">
                <Button text="Pagar" @click="pagar()"  class="mx-10"/>
                <Button text="Voltar" @click="voltar()" class="mx-10"/>
            </div>
        </div>

    </div>

   </div>
    <div v-else>
        <div class="my-6">
        <h3 class="font-bold">Ticket Comprado </h3>
        <span class="text-sm text-gray-500"
            >Para utilizar leve o ticket aos terminais para que se possa entrar e sair das estações.
            Tenha um bom dia. :)
        </span>
     </div>
        <div class="flex justify-center">
            <canvas id="canvas"></canvas>
        </div>

        <div class="flex justify-center" >
           <div class="flex-col my-2 ">
             <div>
                <h2>Entrada</h2>
             </div>
            <select id="nome" class="border rounded-lg bg-white py-4 w-32 focus:outline-white form-input mt-1 pl-6 block w-72 px-4 form-select mx-2" v-model="entrada">
                <option disabled value="">Seleciono estação de Origem</option>
                <option :value="item" v-for="item in estacoes" :key="item.id">{{ item.nome }} - {{ item.linha}}</option>
            </select> 
              <Button text="Entrar" @click="entrar()" /> 
           </div>
           
        </div>

         <div class="flex justify-center" >
           <div class="flex-col my-2 ">
             <div>
                <h2>Saida</h2>
             </div>
            <select id="nome" class="border rounded-lg bg-white py-4 w-32 focus:outline-white form-input mt-1 pl-6 block w-72 px-4 form-select mx-2" v-model="saida">
                <option disabled value="">Seleciono estação de Saida</option>
                <option :value="item" v-for="item in estacoes" :key="item.id">{{ item.nome }} - {{ item.linha}}</option>
            </select> 
              <Button text="Sair" @click="sair()" /> 
           </div>
           
        </div>

        
    </div>
  </div>

</template>

<script>
import {onMounted, ref} from 'vue'
import Button from "../../components/Button.vue";
import QRCode from 'qrcode'

import { useRoute, useRouter } from "vue-router";
import {PUT,GET,POST,DELETE} from '../../utils/api'
export default {
  name: "ticket",
  components:{
  Button,
  },

  setup(){
    const data = ref({
        origem: "",
        destino: "",
        data: "",
        price: "",
        origemId: "",
        destinoId:""
    })
    const formaPagamento = ref("")
    const router = useRouter()
    const route = useRoute()
    const estacoes = ref([])
    const selecinando = ref(true)
    const saida = ref("")
    const entrada = ref("")
    const linha_origem = ref("")
    const linha_destino = ref("")
    const tickets_saida = ref([])
    const tickets_entrada = ref([])
    const ticketComprado = ref({})
    const comprou = ref(true)

    onMounted(async () =>{
        try {
            estacoes.value = await GET("station")

            tickets_saida.value = await GET("ticket")
            tickets_entrada.value = await GET("ticket")

            console.log(tickets_saida.value)
        } catch (error) {
            console.log(error)
        }

    })


    const comprar = async ()=>{
        selecinando.value = false
         linha_origem.value = data.value.origem.linha
         linha_destino.value = data.value.destino.linha

        if(linha_origem.value == "V" || linha_destino.value == "V"){

            data.value.price = 12


        }else if(linha_origem.value == "A" || linha_destino.value == "A"){
            data.value.price = 8
        }else{
            data.value.price = 5
        }

    }


    const desenhaQrCode = (data) =>{
        
        var canvas = document.getElementById('canvas')

        console.log(data)

        QRCode.toCanvas(canvas, JSON.stringify(data), function (error) {
        if (error) console.error(error)
        console.log('success!');
        })
    }

    const pagar = async ()=>{

        data.value.origemId = data.value.origem.id
        data.value.destinoId = data.value.destino.id

       
        POST('ticket',data.value).then( res =>{
            ticketComprado.value = res;
            comprou.value= false
            
        }).then(() =>{
            desenhaQrCode(ticketComprado.value )
        })
        

        
    }

    const voltar = async ()=>{
     selecinando.value = true
    }

    const entrar = async()=>{

        const find = tickets_entrada.value.find( el => el.id == ticketComprado.value.id)

        if(find)
        {
            alert("Ticket Passado")
        }else{

        linha_origem.value ="I"
    
        const EE = entrada.value.linha;

        if(linha_origem.value == "V"){
            alert("Pode entrar")
            tickets_entrada.value.push(ticketComprado.value)
        }else if(linha_origem.value == "A" && ( EE == "A" || EE == "I" )){
            alert("Pode entrar")
            tickets_entrada.value.push(ticketComprado.value)
        }else if(linha_origem.value == "I" &&  EE == "I")
        {
           alert("Pode entrar") 
           tickets_entrada.value.push(ticketComprado.value)
        }else{
            alert("Nao Pode entrar")
        }
        }
    }

    const sair = async()=>{
        linha_destino.value ="I"

        const SS = saida.value.linha;

        const find = tickets_saida.value.find( el => el.id == ticketComprado.value.id)

        if(find)
        {
            alert("Ticket Passado")
        }else{

        if(linha_destino.value == "V"){
            alert("Pode Sair")
            tickets_saida.value.push(ticketComprado.value)
        }else if(linha_destino.value == "A" && ( SS == "A" || SS == "I" )){
            alert("Pode Sair")
            tickets_saida.value.push(ticketComprado.value)
        }else if(linha_destino.value == "I" &&  SS == "I")
        {
           alert("Pode Sair") 
           tickets_saida.value.push(ticketComprado.value)
        }else{
            alert("Nao Pode Sair")
        }
        }
    }



    return {
      data,
      estacoes,
      comprar,
      selecinando,
      formaPagamento,
      voltar,
      pagar,
      entrada,
      saida,
      entrar,
      sair,
      comprou
    
    }
  }
};
</script>

<style>

</style>
