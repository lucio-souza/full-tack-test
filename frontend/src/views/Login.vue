<script lang="ts">
import { validateForm } from '../utils/validation'; // Importando a função de validação
import axios from 'axios';
import Input from '../components/Input.vue';
import Button from '../components/Button.vue';
import Swal from 'sweetalert2';

export default {
  name: 'Login',
  components: {
    Input,
    Button,
  },
  data() {
    return {
      email: '',
      senha: '',
      emailError: '',
      senhaError:'',
    };
  },
  mounted() {
    this.showAlert()
  },
  methods: {
    showAlert(){
      if(this.$route.query.isAlert === 'true'){
        Swal.fire({
            toast:true,
            icon:'success',
            position:'top',
            title: 'Cadastro realizado com sucesso',
            timer: 5000,
            confirmButtonColor: '#06d6a0',
            timerProgressBar:true,
            customClass:{
                timerProgressBar: 'custom-progress-bar-sucess'
            }
          })
      }
    },
    async logar() {
        const errors = validateForm(this.email, this.senha);
        
        this.emailError = errors.emailError;
        this.senhaError = errors.senhaError;
        
        if(!this.emailError && !this.senhaError){
        const dados = {
          email: this.email,
          senha: this.senha,
        };
    
        try {
          const response = await axios.post('http://localhost:8080/user/login', dados);
          console.log('Login realizado com sucesso', response.data);
        } catch (error) {
            Swal.fire({
            toast: true,
            icon: 'error',
            position: 'top',
            title: 'Login falhou',
            text: 'Email ou senha incorretos!',
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
        this.$router.push('/Cadastro')
    }
  }};
</script>

<template>
    <main class="view">
      <section >
        <img src="../assets/logo.png" alt="" class="logo">
        <p class="text-login">Faça seu Login</p>
        <form @submit.prevent="logar" class="form">
          <Input type="text" placeholder="Email" v-model="email" />
          <p class="erro" v-if="emailError">{{ emailError }}</p>
          
          <Input type="password" placeholder="Senha" v-model="senha" />
          <p class="erro" v-if="senhaError">{{ senhaError }}</p>
          
          <Button type="submit" msg="Enviar"/>
          
        </form>
        <p>faça seu <a href="#" @click.prevent="redirect"  rel="noopener noreferrer">cadastro aqui</a></p>
      </section>
      <section >
        <img src="../assets/view-tennis-racket-hitting-ball.png" alt="" id="img-view">
      </section>
    </main>
  </template>

<style scoped>
.view{
    display: flex;
    height: 100vh;
    width: 100vw;
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
