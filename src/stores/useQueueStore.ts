import { defineStore } from 'pinia'
import { uploadFile } from '@/lib/api'

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
      if (this.items.some(item => item.status === 'pending' || item.status === 'failed')) {
        alert('📡 Synchronization will start in 10 seconds...')
      }

      setTimeout(async () => {
        for (const item of this.items) {
          if (item.status === 'pending' || item.status === 'failed') {
            item.status = 'syncing'
            const success = await uploadFile(item.base64, item.fileName)
            item.status = success ? 'synced' : 'failed'
          }
        }
      }, 10000)
    }
  }
})