<script setup lang="ts"></script>

<template>
  <nav>
    <router-link :to="{name: 'home'}">HOME</router-link>
    <router-link :to="{name: 'logs'}">LOGS</router-link>
    <router-link :to="{name: 'settings'}">SETTINGS</router-link>
  </nav>
  <router-view></router-view>
</template>

<style scoped>
nav * {
  margin: 0 10px;
}
</style>
