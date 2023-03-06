<template>
    <div>

        <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="ingresa una URL" v-model="url">
            <button type="submit">Agregar</button>
        </form>
<p>Hola {{ user.userData?.email }} Bienvenido a la pagina principal home </p>
<ul>
    <li v-for="doc in database.documents" :key="doc.id">
       <p>estos son tus documentos</p>
       {{ doc.name }}- {{ doc.id }}
        <button @click="database.deleteUrl(doc.id)">Eliminar</button>
        <button @click="router.push(`/editar/${doc.id}`)">Editar</button>
    </li>
</ul>
    </div>
</template>

<script setup>
import {useUserStore} from '../stores/user'
import {useUserdatabaseStore} from '../stores/database'
import { ref } from 'vue';
import {useRouter} from 'vue-router'


const user= useUserStore()
const router = useRouter()
const database = useUserdatabaseStore()
const url= ref('')
database.getUrls()
const handleSubmit= () => {

database.addUrls(url.value)
}
</script>

<style lang="scss" scoped>

</style>