<script setup>

</script>

<template>
  <main>
    <header>
      <nav>
        <RouterLink :to="{ name: 'home' }">HOME</RouterLink>
        <RouterLink :to="{ name: 'tasks' }">TASKS</RouterLink>
        <RouterLink :to="{ name: 'stats' }">STATS</RouterLink>
      </nav>
    </header>
    <div class="text">
      <h1>
        THE TASK-FLOW 04
      </h1>
      <p>
        Not just <strong>task</strong><br> But <strong>life</strong>
      </p>
    </div>
    <div class="display">
      <RouterView />
    </div>
  </main>
</template>

<style scoped>
main {
  max-width: 800px;
  height: 500px;
  margin: 20px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.text {
  width: 80%;
  margin: 30px 0;
}

header {
  width: 100%;
  display: flex;
  justify-content: center;
}

a {
  margin: 0 10px;
  text-decoration: none;
  color: #000;
}

.display {
  width: 80%;
}
</style>