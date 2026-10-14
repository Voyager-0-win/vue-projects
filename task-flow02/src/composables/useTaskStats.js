import { computed } from "vue";

export function useTaskStats(tasks) {
  const total = computed(() => tasks.value.length)
  const completed = computed(() => tasks.value.filter(task => task.done).length)
  const remaining = computed(() => total.value - completed.value)

  return { total, completed, remaining }
}