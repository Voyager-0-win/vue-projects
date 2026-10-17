<script setup>
defineProps({
  title: String,
  subject: String,
  duration: Number,
  done: Boolean
})
const emit = defineEmits(['toggle-task', 'remove-task'])
</script>

<template>
  <div class="box">
    <div class="title" :class="{completed : done}">
      {{title}}
    </div>
    <div class="subject">
      {{ subject }}
    </div>
    <div class="duration">
      {{ duration }}
    </div>
    <button @click="emit('toggle-task')">{{ done ? 'Uncomplete' : 'Complete' }}</button>
    <button @click="emit('remove-task')">Del</button>
  </div>
</template>

<style scoped>
.box {
  display: flex;
  max-width: 50%;
  justify-content: space-around;
}
button {
  padding: 5px 10px;
  border: 1px #999 solid;
}
button:hover {
  background-color: #999;
}
.completed {
  color: #999;
  text-decoration: line-through;
}
</style>
