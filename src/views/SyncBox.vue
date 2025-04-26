<template>
  <div class="space-y-6">
    <Card :title="t('syncQueue')">
      <div class="flex justify-end gap-2 mb-4">
        <SyncButton v-if="filteredItems.length > 0" />
        <div class="flex gap-1">
          <Button
            v-for="option in filterOptions"
            :key="option.value"
            @click="filter = option.value"
            :class="{ 'bg-primary text-background': filter === option.value }"
            class="text-xs px-3 py-1 rounded-md hover:opacity-80 transition-opacity duration-200"
          >
            {{ option.label }}
          </Button>
        </div>
      </div>

      <div v-if="filteredItems.length === 0" class="text-muted-foreground text-center">
        {{ t('noFiles') }}
      </div>

      <div v-else class="space-y-4">
        <Card v-for="item in filteredItems" :key="item.id" class="flex items-center gap-4 p-4 hover:shadow-md transition-shadow duration-200">
          <img
            v-if="item.base64"
            :src="item.base64"
            alt="Preview"
            class="w-16 h-16 rounded-lg object-cover border shadow-sm"
          />
          <div class="flex-1">
            <p class="font-medium">{{ item.fileName }}</p>
            <p class="text-xs text-muted-foreground">{{ t('added') }}: {{ formatDate(item.createdAt) }}</p>
            <p class="text-xs text-muted-foreground flex items-center gap-1">
              {{ t('status') }}:
              <span v-if="item.status === 'syncing'" class="flex items-center gap-1">
                <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                {{ t('syncing') }}
              </span>
              <span v-else class="capitalize">{{ item.status }}</span>
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
        </Card>
      </div>

      <div class="pt-6">
        <RouterLink to="/" class="text-sm underline text-primary hover:opacity-80">
          ← {{ t('back') }}
        </RouterLink>
      </div>
    </Card>

    <Toast v-if="toastMessage" :message="toastMessage" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQueueStore } from '@/stores/useQueueStore'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import SyncButton from '@/components/ui/SyncButton.vue'
import Toast from '@/components/ui/Toast.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const queue = useQueueStore()
const filter = ref<'all' | 'pending' | 'syncing' | 'synced' | 'failed'>('all')
const toastMessage = ref('')

const filterOptions = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'syncing', label: 'Syncing' },
  { value: 'synced', label: 'Synced' },
  { value: 'failed', label: 'Failed' }
]

const filteredItems = computed(() => {
  if (filter.value === 'all') return queue.items
  return queue.items.filter(item => item.status === filter.value)
})

function formatDate(ts: number) {
  return new Date(ts).toLocaleString()
}

function retryItem(id: string) {
  queue.retryItem(id)
}

function removeItem(id: string) {
  queue.remove(id)
}
</script>
