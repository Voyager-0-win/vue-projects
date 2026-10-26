<script setup lang="ts"></script>

<template>
  <h1>Task Flow</h1>
  <nav>
    <router-link :to="{ name: 'home' }">HOME</router-link>
    <router-link :to="{ name: 'list' }">LIST</router-link>
    <router-link :to="{ name: 'manage' }">MANAGE</router-link>
  </nav>

  <router-view />
</template>

<style scoped>
nav * {
  margin: 0 10px;
}
</style>
