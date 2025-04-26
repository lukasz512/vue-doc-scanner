<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-xl font-semibold">Sync Queue</h1>
      <div class="relative">
        <Button size="icon" variant="outline" @click="toggleFilters">
          <SlidersHorizontal class="h-5 w-5" />
        </Button>
        <DropdownDialog v-if="showFilters" @close="toggleFilters">
          <div class="flex flex-col gap-2">
            <Button v-for="option in filterOptions" :key="option.value" size="sm" @click="selectFilter(option.value)">
              {{ option.label }}
            </Button>
          </div>
        </DropdownDialog>
      </div>
    </div>

    <div v-if="filteredItems.length === 0" class="text-muted-foreground text-center mt-12">
      No documents pending sync.
    </div>

    <div v-else class="space-y-4">
      <Card v-for="item in filteredItems" :key="item.id">
        <div class="flex justify-between items-center">
          <div>
            <p class="font-medium text-foreground">{{ item.fileName }}</p>
            <p class="text-xs text-muted-foreground">Added: {{ formatDate(item.createdAt) }}</p>
            <p class="text-xs text-muted-foreground">Status: {{ capitalize(item.status) }}</p>
          </div>
          <div class="flex flex-col items-end gap-2">
            <Button v-if="item.status === 'failed'" @click="retryItem(item.id)" variant="link">
              Retry
            </Button>
            <Button @click="removeItem(item.id)" variant="destructive-link">
              Delete
            </Button>
          </div>
        </div>
      </Card>
    </div>

    <div class="flex justify-center gap-4 mt-8">
      <Button @click="syncAll" :disabled="queue.items.length === 0">
        Sync All
      </Button>
      <RouterLink to="/" class="text-sm underline text-primary">
        Back
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQueueStore } from '@/stores/useQueueStore'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import DropdownDialog from '@/components/ui/DropdownDialog.vue'
import { SlidersHorizontal } from 'lucide-vue-next'

const queue = useQueueStore()
const showFilters = ref(false)
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

function toggleFilters() {
  showFilters.value = !showFilters.value
}

function selectFilter(val: typeof filter.value) {
  filter.value = val
  toggleFilters()
}

function retryItem(id: string) {
  queue.retryItem(id)
}

function removeItem(id: string) {
  queue.remove(id)
}

function syncAll() {
  queue.autoSync()
}

function formatDate(ts: number) {
  return new Date(ts).toLocaleString()
}

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}
</script>