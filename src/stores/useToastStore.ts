import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const message = ref('')

  function show(text: string) {
    message.value = text
    setTimeout(() => {
      message.value = ''
    }, 4000) // auto-hide after 4 seconds
  }

  return { message, show }
})
