<template>
  <div class="space-y-6">
    <!-- Filters -->
    <div v-if="filteredItems.length > 0" class="flex justify-between items-center">
      <DropdownDialog :options="filterOptions" v-model="filter" icon />
      <SyncButton />
    </div>

    <!-- Empty State Placeholder -->
    <Card
      v-else
      class="flex flex-col items-center justify-center text-center space-y-4 py-16 cursor-pointer border border-dashed border-muted hover:border-primary transition"
      @click="triggerFileInput"
    >
      <FileIcon class="h-12 w-12 text-muted-foreground" />
      <div class="space-y-1">
        <p class="text-base font-semibold text-foreground">Nothing here yet</p>
        <p class="text-sm text-muted-foreground">
          Tap to scan a document
        </p>
      </div>
    </Card>

    <!-- File list -->
    <div v-if="filteredItems.length > 0" class="space-y-4">
      <Card
        v-for="item in filteredItems"
        :key="item.id"
        class="flex justify-between items-center"
      >
        <div class="space-y-1">
          <p class="font-medium">{{ item.fileName }}</p>
          <p class="text-xs text-muted-foreground">
            {{ t('added') }}: {{ formatDate(item.createdAt) }}
          </p>
          <p class="text-xs text-muted-foreground">
            {{ t('status') }}: {{ capitalize(item.status) }}
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

    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      capture="environment"
      class="hidden"
      @change="handleFileChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQueueStore } from '@/stores/useQueueStore'
import { useI18n } from 'vue-i18n'
import { capitalize, formatDate } from '@/lib/utils'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import DropdownDialog from '@/components/ui/DropdownDialog.vue'
import SyncButton from '@/components/ui/SyncButton.vue'
import { FileIcon } from 'lucide-vue-next'

const { t } = useI18n()
const queue = useQueueStore()
const filter = ref<'all' | 'pending' | 'syncing' | 'synced' | 'failed'>('all')

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

const fileInput = ref<HTMLInputElement | null>(null)

function triggerFileInput() {
  fileInput.value?.click()
}

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file || !file.type.startsWith('image/')) return

  const reader = new FileReader()
  reader.onload = () => {
    const base64 = reader.result as string
    queue.addFile({
      fileName: file.name,
      base64
    })
  }
  reader.readAsDataURL(file)
}

function retryItem(id: string) {
  queue.retryItem(id)
}

function removeItem(id: string) {
  queue.remove(id)
}
</script>