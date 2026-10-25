import { defineStore } from "pinia"
import { ref, watch, computed } from 'vue'
import {useTaskStore} from './useTaskStore'

const taskStore = useTaskStore()

function loadProject() {
  try {
    const saved = localStorage.getItem('sprint-board-projects')
    if (saved === null) {
      return []
    }
    const parsed = JSON.parse(saved)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error('project load error: ', error)
    return []
  }
}

function saveProject(projects) {
  try {
    localStorage.setItem('sprint-board-projects', JSON.stringify(projects))
  } catch (error) {
    console.error('project save error: ', error)
  }
}

export const useProjectStore = defineStore('projects', () => {
  const projects = ref(loadProject())
  
  watch(projects, (newProjects) => saveProject(newProjects), {deep: true})

  function addProject(name, description, beginDate, endDate) {
    projects.value.push({
      id: projects.value.reduce((max, p) => Math.max(max, p.id), 0) + 1,
      name,
      description,
      beginDate,
      endDate
    })
  }
  function removeProject(id) {
    projects.value = projects.value.filter(p => p.id !== id)
    taskStore.removeTasks(id)
  }
  function editProjectName(id, name) {
    const project = projects.value.find(p => p.id === id)
    project.name = name
  }
  function editProjectDescription(id, description) {
    const project = projects.value.find(p => p.id === id)
    project.description = description
  }
  function clearProject() {
    projects.value.length = 0
    taskStore.clearTask()
  }

  return {
    projects,
    addProject,
    removeProject,
    editProjectDescription,
    editProjectName,
    clearProject
  }
})