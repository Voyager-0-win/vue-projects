<script setup>

</script>

<template>
  <div>
    <h2>Study Track</h2>
    <slot />
  </div>
</template>

<style scoped>
div {
  width: 700px;
  height: 500px;
  background-color: #333;
  margin: 10px 15px;
  padding: 15px 25px;
  color: white;
  box-shadow: 2px 4px 4px 2px rgba(0, 0, 0, 0.4);
  border-radius: 2px;
  overflow-y: auto;
}
</style>
