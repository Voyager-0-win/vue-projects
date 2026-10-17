<script setup>
import {ref} from 'vue'

const props = defineProps({
  subjects: Object
})
const emit = defineEmits(['add-task'])

const title = ref('learn Vue')
const subject = ref(props.subjects[0])
const duration = ref(2)

function addTask() {
  const ttitle = title.value.trim()
  if (ttitle && duration.value) {
    emit('add-task', ttitle, subject.value, duration.value)
  } else {
    alert('input error!')
  }
}

</script>

<template>
  <form @submit.prevent="addTask">
    <h3>Add your task</h3>
    <input type="text" v-model="title">
    <select name="subject" v-model="subject">
      <option v-for="subject in subjects" :value="subject">{{ subject }}</option>
    </select>
    <input type="number" v-model="duration">
    <button type="submit">Add</button>
  </form>
</template>

<style scoped></style>
