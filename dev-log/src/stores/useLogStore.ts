import type { InputLog, Log } from "@/types/log"
import { defineStore } from "pinia"
import {ref, watch, computed} from 'vue'
import { loadLog, saveLog } from "@/utils/forLog"
import dayjs from "dayjs"


export const useLogStore = defineStore('logs', () => {
  const logs = ref(loadLog())

  watch(logs, (newLogs: Log[]) => saveLog(newLogs), {deep: true})

  const total = computed(() => logs.value.length)

  function addLog(input: InputLog) {
    const log:Log = {
      id: logs.value.reduce((max, log) => Math.max(max, log.id), 0) + 1,
      createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      ...input
    }
    logs.value.push(log)
    console.log(logs.value)
  }
  function removeLog(id: number) {
    logs.value = logs.value.filter(l => l.id !== id)
  }
  function editLog(id: number, input: InputLog) {
    const log = logs.value.find(l => l.id === id)
    if (log) {
      log.title = input.title,
      log.content = input.content,
      log.category = input.category,
      log.tags = input.tags
    }
  }
  function clearLogs() {
    logs.value.length = 0
  }

  return {
    logs,
    total,
    addLog,
    removeLog,
    editLog,
    clearLogs
  }
})
