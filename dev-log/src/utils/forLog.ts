import type { Log } from "@/types/log"


function loadLog(): Log[] {
  try {
    const saved = localStorage.getItem('dev-log-logs')
    if (!saved) {
      return []
    }
    const parsed = JSON.parse(saved)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error('load error: ', error)
    return []
  }
}

function saveLog(logs: Log[]) {
  try {
    localStorage.setItem('dev-log-logs', JSON.stringify(logs))
  } catch (error) {
    console.error('save error: ', error)
  }
}

export {
  saveLog,
  loadLog
}