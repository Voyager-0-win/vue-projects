<script setup>
</script>

<template>
  <div class="app-box">
    <nav class="sidebar">
      <div class="logo">Book Nest</div>
      <div class="nav-links">
        <RouterLink :to="{name: 'home'}">HOME</RouterLink>
        <RouterLink :to="{name: 'books'}">BOOKS</RouterLink>
        <RouterLink :to="{name: 'manage'}">MANAGE</RouterLink>
      </div>
    </nav>
    <main class="main-content">
      <h1>Book Nest</h1>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-box {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  width: 240px;
  background-color: #f8f9fa;
  border-right: 1px solid #eaecef;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.logo {
  font-size: 1.25rem;
  font-weight: 700;
  color: #2c3e50;
  padding-left: 0.5rem;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-links a {
  display: block;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  color: #2c3e50;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s, color 0.2s;
}

.nav-links a:hover {
  background-color: #eaecef;
}

.nav-links a.router-link-active {
  color: #42b883;
  background-color: #e6f7ec;
}

.main-content {
  flex: 1;
  padding: 2rem 3rem;
  overflow-y: auto;
  background-color: #ffffff;
}

.main-content h1 {
  margin-bottom: 1.5rem;
}
</style>