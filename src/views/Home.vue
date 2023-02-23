<template>
    <div>
<p>Hola {{ user.userData?.email }} Bienvenido a la pagina principal home </p>


    </div>
</template>

<script setup>
import {useUserStore} from '../stores/user'
const user= useUserStore()
</script>

<style lang="scss" scoped>

</style>