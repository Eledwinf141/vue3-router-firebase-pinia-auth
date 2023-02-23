<template>
    <div>
        <h1>Iniciar sesión</h1>
        <form @submit.prevent="handleSubmit()" style="display: flex;flex-direction: column;">
            <input type="email" placeholder="Ingrese su usuario" v-model.trim="email">
            <input type="password" v-model.trim="password" placeholder="Ingrese su contraseña" id="">
            
            <button v-if="email && password" type="submit">Iniciar Sesión</button>
            <button v-else disabled type="submit">Iniciar Sesión</button>

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
    await userStore.loginUser(email.value, password.value)
    route.push('/')
}

</script>

<style lang="scss" scoped>
</style>