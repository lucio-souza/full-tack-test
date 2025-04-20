<script lang="ts">
export default{
    name:'Input'
}
</script>

<template>
    <input>
</template>

<style scoped>
input{
    font-size: 1.5rem;
    width: 20vw;
    height: 3vh;
    border:none;
    padding-left: 10px;
    margin-bottom: 20px;
    border-bottom: solid #041E31 1px;
}

input::placeholder{
    color:#041E31;
}
</style>