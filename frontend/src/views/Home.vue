<script lang="ts">
import Button from '../components/Button.vue';
import Input from '../components/Input.vue';
import CardCourt from '../components/CardCourt.vue';
import PopUpEditCourt from '../components/PopUpEditCourt.vue';
import PopUpCreateCourt from '../components/PopUpCreateCourt.vue';
import axios from 'axios';

export default{
    name:'Home',
    data(){
        return{
            courts: [] as { id: string; name: string; available: boolean }[],
            hideCourts:false,
            isModalEditOpen: false,
            isModalCreateOpen: false,
            courtToEdit: null as null | { id: string; name: string; location: string; available: boolean }
        }
    },
    components:{
        Button,
        Input,
        CardCourt,
        PopUpEditCourt,
        PopUpCreateCourt
    },
    mounted(){
        this.fetchData();
    },
    computed:{
        filteredCourts(){
            return this.hideCourts ? this.courts.filter((court)=>court.available === true) : this.courts;
        }
    },
    methods:{
        deslogar(){
            localStorage.removeItem('token')
            this.$router.push('/')
        },
        async fetchData(){
            try{
                const response= await axios.get('http://localhost:8080/courts')
                this.courts=response.data;
            }catch(error){
                console.error('Erro ao buscar quadras:', error)
            }
        },
        refresh() {
            this.fetchData()
        },
        abrirModalEditar(court: any) {
            this.courtToEdit = { ...court };
            this.isModalEditOpen = true;
        },
        abrirModalcreateCourt() {
            this.isModalCreateOpen = true;
        },
        fecharModal() {
            this.isModalEditOpen = false;
            this.isModalCreateOpen = false;
            this.fetchData()
        }
    }
}
</script>

<template>

    <header class="cabecalho">
        <img src="../assets/logo.png" alt="" class="logo">
        <Button type="button" @click="deslogar" msg="Logout"  cor="#c92c2c"/>
    </header>

    <main>
        <section class="top-bar">
            <div class="checkbox-filter">
                <p>Mostrar apenas quadras disponiveis</p>
                <input type="checkbox" @click="hideCourts = !hideCourts"/>
            </div>
            <Button type="button" @click="abrirModalcreateCourt" msg="Criar Nova Quadra" class="btn" cor="#10744c"/>
        </section>

        <section class="card-list">
            <CardCourt v-for="court in filteredCourts" :key="court.id" :quadra="court" @editar-quadra="abrirModalEditar" @refresh="refresh"/>
        </section>
        <PopUpEditCourt v-if="isModalEditOpen && courtToEdit" :court="courtToEdit" @close="fecharModal" />
        <PopUpCreateCourt v-if="isModalCreateOpen "  @close="fecharModal"/>

    </main>
</template>

<style scoped>
.cabecalho{
    height: 10vh;
    background-color: #37ab98;
    display:flex;
    justify-content: space-between;
    align-items: center;
}
.logo{
    height: 150px;
}
.btn{
    background-color: #13bb78;
    width: 10vw;
    color: white;
}
.checkbox-filter{
    display: flex;
    margin: 0 0 20px 20px;
    font-size: 25px;
    color: #041E31;
}
.checkbox-filter > input{
    margin-left: 10px;
    width: 1.5vw;
}
.top-bar{
    display: flex;
    height: 8vh;
    align-items: center;
    margin: 0 20px 0 20px;
    font-size: 25px;
    justify-content: space-between;
}
.card-list{
    display: flex;
    flex-wrap: wrap;
}
</style>