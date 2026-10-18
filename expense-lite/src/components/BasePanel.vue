<script setup>

</script>

<template>
  <div class="box">
    <h1>ExpenseLite</h1>
    <slot />
  </div>
</template>

<style scoped>
.box {
  background-color: var(--bg);
  width: 600px;
  height: 450px;
  margin: 20px;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 2px 4px 4px 2px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
}
</style>
