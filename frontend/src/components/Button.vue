<script lang="ts">
export default{
    name:'Button',
    props:{
        msg:'',
        cor:{
            type:String
        }
    }
}
</script>

<template>
    <button :style="{ '--cor': cor }">{{ msg }}</button>
</template>

<style scoped>
button{
    width: 7vw;
    font-size: 1.3rem;
    height: 5vh;
    border-radius: 10px;
    border: 1px solid var(--cor);
    background-color: transparent;
    color: var(--cor);
    margin: 10px;
}
button:hover{
    background-color: var(--cor);
    color: white;
    border: none;
    cursor: pointer;
}</style>