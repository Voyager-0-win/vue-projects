<script setup>
import {useRouter, useRoute} from 'vue-router'

const router = useRouter()
const route = useRoute()

function login() {
    localStorage.setItem('sprint-board-login', 'true')
    router.push(route.query.redirect || '/')
}
</script>

<template>
    <div>
        <h1>Login</h1>
        <button @click="login">Login</button>
    </div>
</template>