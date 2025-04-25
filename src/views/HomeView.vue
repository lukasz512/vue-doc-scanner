<template>
  <div class="p-6 space-y-6">
    <h1 class="text-2xl font-bold">{{ t('title') }}</h1>
    <p class="text-muted-foreground">{{ t('description') }}</p>

    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      capture="environment"
      class="hidden"
      @change="handleFileChange"
    />

    <Button @click="triggerFileInput">{{ t('scan') }}</Button>

    <RouterLink to="/sync" class="block text-sm underline text-primary mt-6">
      {{ t('syncQueue') }} →
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQueueStore } from '@/stores/useQueueStore'
import Button from '@/components/ui/Button.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const fileInput = ref<HTMLInputElement | null>(null)
const queue = useQueueStore()

function triggerFileInput() {
  fileInput.value?.click()
}

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file || !file.type.startsWith('image/')) return

  const reader = new FileReader()

  reader.onload = () => {
    const image = new Image()
    image.src = reader.result as string

    image.onload = () => {
      const MAX_WIDTH = 1200
      const scaleFactor = MAX_WIDTH / image.width
      const newWidth = Math.min(MAX_WIDTH, image.width)
      const newHeight = image.height * scaleFactor

      const canvas = document.createElement('canvas')
      canvas.width = newWidth
      canvas.height = newHeight

      const ctx = canvas.getContext('2d')
      ctx?.drawImage(image, 0, 0, newWidth, newHeight)

      const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8)

      queue.addFile({
        fileName: file.name,
        base64: compressedBase64
      })
    }
  }

  reader.readAsDataURL(file)
}
</script>