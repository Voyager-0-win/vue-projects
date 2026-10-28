<script setup lang="ts">

</script>

<template>
  <header>

  </header>
  <nav>
    <router-link to="/">HOME</router-link>
    <router-link to="/new">NEW</router-link>
  </nav>
  <main>
    <router-view />
  </main>
  <footer>

  </footer>
</template>

<style scoped>
nav * {
  margin: 0 10px;
}
</style>
