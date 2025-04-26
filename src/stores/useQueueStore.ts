import { defineStore } from 'pinia'
import { uploadFile } from '@/lib/api'
import { useToastStore } from '@/stores/useToastStore'

export async function autoSync() {
  for (const item of this.items) {
    if (item.status === 'pending' || item.status === 'failed') {
      item.status = 'syncing'
      const success = await uploadFile(item.base64, item.fileName)
      item.status = success ? 'synced' : 'failed'
    }
  }
}

async function syncAll() {
  for (const item of this.items) {
    if (item.status === 'pending') {
      item.status = 'syncing'
      const success = await uploadFile(item.base64, item.fileName)
      item.status = success ? 'synced' : 'failed'
    }
  }
}

async function retryItem(id: string) {
  const item = this.items.find(i => i.id === id)
  if (!item) return

  item.status = 'syncing'
  const success = await uploadFile(item.base64, item.fileName)
  item.status = success ? 'synced' : 'failed'
}

export type UploadStatus = 'pending' | 'syncing' | 'synced' | 'failed'

export interface QueuedItem {
    id: string
    fileName: string
    base64: string
    createdAt: number
    status: UploadStatus
}

export const useQueueStore = defineStore('queue', {
  state: () => ({
    items: [] as Array<{
      id: string
      fileName: string
      base64: string
      createdAt: number
      status: 'pending' | 'syncing' | 'synced' | 'failed'
    }>
  }),

  actions: {
    addFile(file: { fileName: string; base64: string }) {
      this.items.push({
        id: crypto.randomUUID(),
        fileName: file.fileName,
        base64: file.base64,
        createdAt: Date.now(),
        status: 'pending'
      })
    },

    async syncAll() {
      for (const item of this.items) {
        if (item.status === 'pending') {
          item.status = 'syncing'
          const success = await uploadFile(item.base64, item.fileName)
          item.status = success ? 'synced' : 'failed'
        }
      }
    },

    async retryItem(id: string) {
      const item = this.items.find(i => i.id === id)
      if (!item) return
      item.status = 'syncing'
      const success = await uploadFile(item.base64, item.fileName)
      item.status = success ? 'synced' : 'failed'
    },

    remove(id: string) {
      this.items = this.items.filter(item => item.id !== id)
    },

async autoSync() {
  const toastStore = useToastStore()

  if (this.items.some(item => item.status === 'pending' || item.status === 'failed')) {
    toastStore.show('📡 Synchronizacja rozpocznie się za 10 sekund...')
  }

  setTimeout(async () => {
    for (const item of this.items) {
      if (item.status === 'pending' || item.status === 'failed') {
        item.status = 'syncing'
        const success = await uploadFile(item.base64, item.fileName)
        item.status = success ? 'synced' : 'failed'
      }
    }
    toastStore.show('✅ Synchronizacja zakończona!')
  }, 10000)
}
  }
})