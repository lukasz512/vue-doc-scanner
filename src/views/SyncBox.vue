<template>
  <div class="p-6 space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">{{ t('syncQueue') }}</h1>
    </div>

    <ProgressBar />

    <div class="flex justify-end">
      <SyncButton v-if="queue.items.length > 0" />
    </div>

    <div v-if="queue.items.length === 0" class="text-muted-foreground">
      {{ t('noFiles') }}
    </div>

    <div v-else class="space-y-4">
      <Card v-for="item in queue.items" :key="item.id">
        <div class="flex justify-between items-center">
          <div>
            <p class="font-medium">{{ item.fileName }}</p>
            <p class="text-xs text-muted-foreground">
              {{ t('added') }}: {{ formatDate(item.createdAt) }}
            </p>
            <p class="text-xs text-muted-foreground">
              {{ t('status') }}: <span class="capitalize">{{ item.status }}</span>
            </p>
          </div>

          <div class="flex flex-col items-end gap-2">
            <Button
              v-if="item.status === 'failed'"
              @click="retryItem(item.id)"
              class="bg-transparent text-primary underline hover:opacity-80 text-xs p-0"
            >
              {{ t('retry') }}
            </Button>
            <Button
              @click="removeItem(item.id)"
              class="bg-transparent text-red-500 underline hover:opacity-80 text-xs p-0"
            >
              {{ t('delete') }}
            </Button>
          </div>
        </div>
      </Card>
    </div>

    <RouterLink to="/" class="block text-sm underline text-primary mt-6">
      {{ t('back') }}
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { useQueueStore } from '@/stores/useQueueStore'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import SyncButton from '@/components/ui/SyncButton.vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'
import SettingsMenu from '@/components/SettingsMenu.vue'
import { useI18n } from 'vue-i18n'

const queue = useQueueStore()
const { t } = useI18n()

function formatDate(ts: number) {
  return new Date(ts).toLocaleString()
}

function retryItem(id: string) {
  console.log('[Retry] To be implemented:', id)
}

function removeItem(id: string) {
  queue.remove(id)
}
</script>