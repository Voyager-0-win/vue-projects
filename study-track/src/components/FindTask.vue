<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  subjects: Object,
  tasks: Array
})

const subject = ref(props.subjects[0])
const filterTasks = computed(() => props.tasks.filter(task => task.subject === subject.value))

</script>

<template>
  <div class="box">
    <h3>Find Task</h3>
    <select name="subject" v-model="subject">
      <option v-for="sub in subjects" :value="sub">{{ sub }}</option>
    </select>
    <p v-if="filterTasks.length === 0">Nothing</p>
    <ul v-else>
      <li v-for="task in filterTasks">
        <div class="item">
          <p>{{ task.title }} {{ task.duration }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
