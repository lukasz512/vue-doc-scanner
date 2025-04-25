<template>
  <div class="relative">
    <Button @click="syncAllFiles" :disabled="loading" class="bg-green-600 hover:bg-green-700">
      <span v-if="!loading">🔄 {{ t('sync') }}</span>
      <span v-else>⏳</span>
    </Button>
    <Toast v-if="toastMessage" :message="toastMessage" />
  </div>
</template>

<script setup lang="ts">
import { useQueueStore } from '@/stores/useQueueStore'
import Button from '@/components/ui/Button.vue'
import Toast from '@/components/ui/Toast.vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const queue = useQueueStore()
const { t } = useI18n()

const loading = ref(false)
const toastMessage = ref('')

async function syncAllFiles() {
  if (loading.value) return
  loading.value = true
  toastMessage.value = t('syncStarted')
  await queue.syncAll()
  toastMessage.value = t('syncFinished')
  loading.value = false
  setTimeout(() => (toastMessage.value = ''), 3000)
}
</script>