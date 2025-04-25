import { defineStore } from 'pinia'
import { uploadFile } from '@/lib/api'

async function syncAll() {
  for (const item of this.items) {
    if (item.status === 'pending') {
      item.status = 'syncing'
      const success = await uploadFile(item.base64, item.fileName)
      item.status = success ? 'synced' : 'failed'
    }
  }
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
        items: [] as QueuedItem[]
    }),

    actions: {
        addFile(file: Omit<QueuedItem, 'id' | 'createdAt' | 'status'>) {
            const newItem: QueuedItem = {
                id: crypto.randomUUID(),
                fileName: file.fileName,
                base64: file.base64,
                createdAt: Date.now(),
                status: 'pending'
            }

            this.items.push(newItem)
        },

        markAsSynced(id: string) {
            const item = this.items.find(i => i.id === id)
            if (item) item.status = 'synced'
        },

        markAsFailed(id: string) {
            const item = this.items.find(i => i.id === id)
            if (item) item.status = 'failed'
        },

        remove(id: string) {
            this.items = this.items.filter(i => i.id !== id)
        },

        clearQueue() {
            this.items = []
        },

        syncAll() {
            this.items.forEach(item => {
                if (item.status === 'pending') {
                    item.status = 'syncing'
                    setTimeout(() => {
                        item.status = 'synced'
                    }, 1000) // symulacja 1 sekundy
                }
            })
        }
    }
})