import { computed } from "vue"

export function useTaskStates(tasks) {
  const total = computed(() => tasks.value.length)
  const completed = computed(() => tasks.value.filter(task => task.done).length)
  const remaining = computed(() => total.value - completed.value)
  const totalDuration = computed(() => tasks.value.filter(task => !task.done).reduce((sum, task) => sum + task.duration, 0))

  return { total, completed, remaining, totalDuration }
}