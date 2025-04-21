<script lang="ts">
import Input from '../components/Input.vue';
import Button from '../components/Button.vue';
import axios from 'axios';
import { validateForm } from '../utils/validation';
import Swal from 'sweetalert2';

export default{
    name:'Cadastro',
    components:{
        Input,
        Button
    },
    data() {
    return {
      email: '',
      senha: '',
      emailError: '',
      senhaError:'',
    };
  },methods: {
    async Cadastrar() {
        const errors = validateForm(this.email, this.senha);
        
        this.emailError = errors.emailError;
        this.senhaError = errors.senhaError;
        
        if(!this.emailError && !this.senhaError){
        const dados = {
          email: this.email,
          senha: this.senha,
        };
    
        try {
          const response = await axios.post('http://localhost:8080/user/', dados);
          console.log('cadastro realizado com sucesso', response.data);
          this.$router.push({name:'login',query:{isAlert:'true'}})
        } catch (error) {
            Swal.fire({
            toast: true,
            icon: 'error',
            position: 'top',
            title: 'Cadastro Falhou',
            text: 'Usuário já existente',
            timer: 5000,
            confirmButtonColor: '#e63946',
            timerProgressBar:true,
            customClass:{
                timerProgressBar: 'custom-progress-bar-error'
            }
        });

            console.log('Erro na requisição:', error);
        }
    }
    },
    redirect(){
        this.$router.push('/')
    }
}
}
</script>
<template>
     <main class="view">
        <section >
        <img src="../assets/view-tennis-racket-hitting-ball.png" alt="" id="img-view">
      </section>
      <section >
        <img src="../assets/logo.png" alt="" class="logo">
        <p class="text-login">Faça seu Cadastro</p>
        <form @submit.prevent="Cadastrar" class="form">
          <Input type="text" placeholder="Email" v-model="email" />
          <p class="erro" v-if="emailError">{{ emailError }}</p>
          
          <Input type="password" placeholder="Senha" v-model="senha" />
          <p class="erro" v-if="senhaError">{{ senhaError }}</p>
          <div class="btns">
            <Button type="submit" msg="Enviar" cor="#041E31"/>
            <Button @click="redirect" msg="Voltar" cor="#041E31"/>
        </div>
          
        </form>
      </section>

    </main>
</template>
<style scoped>
.view{
    display: flex;
    height: 100vh;
    width: 100vw;
}
.btns{
    display: flex;

}
a{
    text-decoration: none;
    color: #1a0dab;
}
.text-login{
    font-size: 40px;
    margin: 30px;
}
.view > section {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.form{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.logo{
    margin-top: -50px;
    margin-bottom: -50px;
}
#img-view {
  width: 100%;
  height: 100%;
}
.erro {
  color: red;
  margin-top: 5px;
  font-size: 0.9rem;
  height: 20px; 
}
</style>