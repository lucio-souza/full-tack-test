<script lang="ts">
export default{
    name:'Button',
    props:{
        msg:''
    }
}
</script>

<template>
    <button>{{ msg }}</button>
</template>

<style scoped>
button{
    width: 7vw;
    font-size: 1.3rem;
    height: 5vh;
    border-radius: 10px;
    border: 1px solid #041E31;
    background-color: transparent;
    color: #041E31;
    margin: 10px;
}
button:hover{
    background-color: #041E31;
    color: aliceblue;
    border: none;
    cursor: pointer;
}</style>