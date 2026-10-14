<script setup>

</script>

<template>
  <div class="box">
    <slot />
  </div>
</template>

<style scoped>
.box {
  width: 400px;
  height: 500px;
  background-color: #eee;
  border-radius: 16px;
  box-shadow: 2px 4px 4px 0 rgba(0, 0, 0, 0.2);
  padding: 15px 25px;
  margin: 40px;
}
</style>
