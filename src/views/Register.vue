<template>
    <div>
        <h1>Formulario de Registro</h1>
        <form @submit.prevent="handleSubmit()" style="display: flex;flex-direction: column;">
            <input type="email" placeholder="ingrese su usuario" v-model.trim="email">
            <input type="password" v-model.trim="password" placeholder="ingrese su contraseña" id="">
            
            <button v-if="email && password" type="submit">Registrar usuario</button>
            <button v-else disabled type="submit">Registrar usuario</button>

        </form>
    </div>
</template>

<script setup>
import {ref} from 'vue';
import {useUserStore} from '../stores/user';
import {useRouter} from 'vue-router'
const route = useRouter()
const userStore = useUserStore()
const email = ref('')
const password = ref('')
const handleSubmit = async () => {
    if(!email.value || password.value.length < 5){
       return console.log('contraseña demasiado corta')
    }
    await userStore.registerUser(email.value, password.value)
    route.push('/login')
}

</script>

<style lang="scss" scoped>
</style>