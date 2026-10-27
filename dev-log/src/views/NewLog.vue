<script setup lang="ts">
import Layout from '@/layouts/Layout.vue';
import type { LogCategory } from '@/types/log';
import { ref } from 'vue';
import type { InputLog } from '@/types/log';
import { useLogStore } from '@/stores/useLogStore';

const logStore = useLogStore()

const title = ref('learn vue')
const content = ref('router')
const category = ref<LogCategory>('bugfix')
const tags = ref('game fun')
const categorys = ['learning', 'bugfix', 'project']

function add() {
  const t = title.value.trim()
  const c = content.value.trim()
  const ta = tags.value.trim().split(' ')

  if (t && c && ta) {
    const input: InputLog = {
      title: t,
      content: c,
      category: category.value,
      tags: ta
    }
    logStore.addLog(input)
  }
}

</script>

<template>
  <Layout title="NEW">
    <form @submit.prevent="add">
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
      <button type="submit">Add</button>
    </form>
  </Layout>
</template>

<style scoped></style>
