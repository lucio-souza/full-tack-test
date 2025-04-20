<script lang="ts">
import axios from 'axios';
import Input from '../components/Input.vue';
import Button from '../components/Button.vue';

export default {
    name:'Login',
    components: {
    Input,
    Button
  },
    data() {
        return{
            email:'',
            senha:'',
            mensagem:''
        }   
    },
    methods:{
        logar (){
            //const dados={
            //    email:this.email,
            //    senha:this.senha
            //}
            axios.get('http://localhost:8080/user/')
            .then(()=>{this.mensagem ='deu certo',console.log("deu certo");
            })
            .catch(error=>{console.log('deu errado',error);
            })
        }
    }
}
</script>

<template>
    <main class="view">
    <section class="left">
        <img src="../assets/logo.png" alt="" class="logo">
        <p class="text-login">Faça seu Login</p>
        <form @submit.prevent="logar" class="form">
            <Input type="text" placeholder="Email" v-model="email" />
            <Input type="text" placeholder="Senha" v-model="senha" />
            <Button type="submit" msg="Enviar"/>
        </form>
        <p>faça seu <a href="#" target="_blank" rel="noopener noreferrer">cadastro aqui</a> </p>
    </section>
    <section class="right">
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
</style>
