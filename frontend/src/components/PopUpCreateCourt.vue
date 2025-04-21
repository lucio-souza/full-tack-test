<script lang="ts">
import Input from './Input.vue';
import Button from './Button.vue';
import axios from 'axios';
import type { PropType } from 'vue';
import Swal from 'sweetalert2';

type CourtType = {
  id: string;
  name: string;
  location: string;
  available: boolean;
};

export default {
  name: 'PopCreateCourt',
  components:{
    Input,
    Button
  },
  data() {
      return{
        court:{
            type:Object as PropType<CourtType>
        },
        name:'',
        location:''
      }
  },
  methods: {
    async criarCourt() {
    const data={
        name:this.name,
        location:this.location
    }
    try{
    const token=localStorage.getItem('token')
    await axios.post('http://localhost:8080/courts/',
        data,
        {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    });
    Swal.fire({
            toast:true,
            icon:'success',
            position:'top',
            title: 'Quadra criada com sucesso',
            timer: 5000,
            confirmButtonColor: '#06d6a0',
            timerProgressBar:true,
            customClass:{
                timerProgressBar: 'custom-progress-bar-sucess'
            }
          })
    this.$emit('close')
    }catch(error){
        Swal.fire({
            toast:true,
            icon:'error',
            position:'top',
            title: 'Não foi possivel criar a quadra',
            timer: 5000,
            confirmButtonColor: '#06d6a0',
            timerProgressBar:true,
            customClass:{
                timerProgressBar: 'custom-progress-bar-error'
            }
          })
    }
  }}
};
</script>

<template>
    <div class="modal-overlay">
      <div class="modal">
        <h2>Editar Quadra</h2>
        <Input v-model="name" placeholder="Nome da quadra" />
        <Input v-model="location" placeholder="Localização" />
        <div class="botoes">
          <Button @click="criarCourt" msg="Salvar" cor="#13bb78"/>
          <Button @click="$emit('close')" msg="Cancelar" cor="#c92c2c"/>
        </div>
      </div>
    </div>
</template>
  
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(6px);
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 400px;
  text-align: center;
}

.modal input {
  display: block;
  width: 100%;
  margin: 1rem 0;
  padding: 0.5rem;
  font-size: 16px;
}

.botoes {
  display: flex;
  justify-content: space-around;
}

button {
  padding: 0.5rem 1rem;
  font-weight: bold;
  cursor: pointer;
}
</style>
  