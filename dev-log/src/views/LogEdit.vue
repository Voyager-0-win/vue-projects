<script setup lang="ts">
import Layout from '@/layouts/Layout.vue';
import type { LogCategory } from '@/types/log';
import { ref, computed } from 'vue';
import type { InputLog } from '@/types/log';
import { useLogStore } from '@/stores/useLogStore';
import { useRoute } from 'vue-router';

const logStore = useLogStore()
const route = useRoute()
const id = Number(route.params.id)

const log = computed(() => logStore.logs.find(l => l.id === id))

const title = ref(log.value!.title)
const content = ref(log.value!.content)
const category = ref<LogCategory>(log.value!.category)
const tags = ref(log.value!.tags.join(' '))
const categorys = ['learning', 'bugfix', 'project']

function edit() {
  const t = title.value.trim()
  const c = content.value.trim()
  const ta = tags.value.split(' ')

  if (t && c && ta) {
    const input: InputLog = {
      title: t,
      content: c,
      category: category.value,
      tags: ta
    }
    logStore.editLog(id, input)
  }
}

</script>

<template>
  <Layout title="EDIT">
    <h2 v-if="!log">Not found the {{ id }}</h2>
    <form v-else @submit.prevent="edit">
      <label for="title">TITLE: </label>
      <input type="text" v-model="title" id="title"><br>
      <label for="content">CONTNET: </label>
      <input type="text" v-model="content" id="content"><br>
      <label for="tags">TAGS: </label>
      <input type="text" v-model="tags" id="tags" placeholder="如有多个空格隔开"><br>
      <label for="category">CATEGORY:
        <select id="category" v-model="category">
          <option v-for="i in categorys" :value="i">{{ i }}</option>
        </select>
      </label><br>
      <button type="submit">Edit</button>
    </form>
    <button @click="logStore.removeLog(id)">Del</button>
  </Layout>
</template>

<style scoped></style>
