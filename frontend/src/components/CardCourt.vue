<script lang="ts">
import Button from './Button.vue';
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
    name:'CardCourt',
    components:{
        Button,
    },
    props: {
        quadra: {
          type: Object,
          required: true
        }
    },
    methods:{
        async apagarCourt(){
            const id=this.quadra.id;
            const token=localStorage.getItem('token')
            await axios.delete(`http://localhost:8080/courts/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            Swal.fire({
            toast:true,
            icon:'success',
            position:'top',
            title: 'Quadra Apagada com sucesso',
            timer: 5000,
            confirmButtonColor: '#06d6a0',
            timerProgressBar:true,
            customClass:{
                timerProgressBar: 'custom-progress-bar-sucess'
            }
          })
            this.$emit('refresh');
        },
        async changeAvaibility(){
            const id = this.quadra.id;
            const token = localStorage.getItem('token')
            console.log(token);
            
            try {
                await axios.patch(`http://localhost:8080/courts/${id}/availability`,{},{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            
            this.$emit('refresh')
            } catch (error) {
                console.log(error);
                
            }

        }
    }
}
</script>

<template>
    <div class="quadra-card" >
        <p >{{ quadra.name }}</p>
        <p >{{ quadra.location }}</p>
        <p v-if="quadra.available" class="available">Disponível</p>
        <p v-else class="unavailable">Indisponível</p>
        <Button class="btn btn-change" type="button" msg="Alterar Disponibilidade" cor="" @click="changeAvaibility"/>
        <div class="container">
            <Button class="btn btn-edit" type="button" msg="Editar" cor="" @click="$emit('editar-quadra', quadra)"/>
            <Button class="btn btn-delete" type="button" msg="Apagar" cor="" @click="apagarCourt"/>
        </div>
    </div>
  </template>

<style scoped>
.quadra-card {
    width: 20vw;
    background-image: url('../assets/quadra-de-tenis.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 28vh;
    border: 1px solid #ccc;
    padding: 1rem;
    margin: 00px 27px 20px 30px;
    border-radius: 10px;
}
.available{
    color: #023517;
    text-shadow: none;
}
.unavailable{
    color: #d80f0f;
    text-shadow: none;
    text-decoration: line-through;
}
p{
    margin-top: 10px;
    font-size: 25px;
    text-align: center;
    color: #ffffff;
    text-shadow: 1px 1px 4px #000;
}
.btn{
    color: #041E31;
    width: 20vw;
    margin: 30px 0 15px 0;
}
.btn:hover{
    background-color: #37ab98;
}
.btn-change,.btn-edit{
    background-color: #67be9b;
} 
.btn-edit,.btn-delete{
    width:20vw;
}
.btn-delete{
    margin-left:25px;
    background-color: #c92c2c;
    color: aliceblue;
}
.btn-delete:hover{
    background-color: #b41c1c;
}
.container{
    display: flex;
}
</style>