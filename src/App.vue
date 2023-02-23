<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/register">Register</router-link> |
      <router-link to="/login">Login</router-link> |
      <button @click="userStore.logOut">Log out</button>
    </nav>
    <h1>hola</h1>
    <router-view></router-view>
  </div>
</template>

<script setup>

import { useUserStore } from './stores/user';
const userStore = useUserStore()
</script>

<style lang="scss" scoped>

</style>
