<script lang="ts">
import Input from './Input.vue';
import Button from './Button.vue';
import axios from 'axios';
import type { PropType } from 'vue';

type CourtType = {
  id: string;
  name: string;
  location: string;
  available: boolean;
};

export default {
  name: 'PopUpEditCourt',
  components:{
    Input,
    Button
  },
  props: {
    court: {
      type: Object as PropType<CourtType>,
      required: true
    }
  },
  data() {
    return {
      courtData: { ...this.court }
    };
  },
  methods: {
    async salvarEdicao() {
    console.log('Salvar', this.courtData);
    const id=this.court.id;
    const data={
        name:this.courtData.name,
        location:this.courtData.location
    }
    const token=localStorage.getItem('token')
    console.log(token);
    
    await axios.put(`http://localhost:8080/courts/${id}`,
        data,
        {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    });
    this.$emit('close')
    }
  }
};
</script>

<template>
    <div class="modal-overlay">
      <div class="modal">
        <h2>Editar Quadra</h2>
        <Input v-model="courtData.name" placeholder="Nome da quadra" />
        <Input v-model="courtData.location" placeholder="Localização" />
        <div class="botoes">
          <Button @click="salvarEdicao" msg="Salvar" cor="#13bb78"/>
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
  