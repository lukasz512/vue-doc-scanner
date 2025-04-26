<template>
  <div class="space-y-6">
    <!-- Placeholder / Preview -->
    <div @click="triggerFileInput" class="relative cursor-pointer group">
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        capture="environment"
        class="hidden"
        @change="handleFileChange"
      />

      <div
        v-if="previewMode"
        class="aspect-video bg-muted rounded-xl overflow-hidden flex items-center justify-center shadow-md"
      >
        <img :src="previewImage" alt="Preview" class="object-cover w-full h-full" />
        <div class="absolute bottom-0 left-0 right-0">
          <ProgressBar :progress="previewProgress" />
        </div>
        <Button variant="destructive" class="absolute top-2 right-2" @click.stop="cancelCapture">Cancel</Button>
      </div>

      <div
        v-else
        class="aspect-video bg-muted rounded-xl flex flex-col items-center justify-center text-muted-foreground text-sm shadow-md hover:bg-accent transition"
      >
        <svg class="w-12 h-12 mb-2 opacity-70" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276a1 1 0 011.447.894v5.764a1 1 0 01-1.447.894L15 14m0-4v4m0-4L9 6m6 4L9 14m0-4l-4.553-2.276A1 1 0 003 9.618v5.764a1 1 0 001.447.894L9 14" />
        </svg>
        <p>Tap to Scan Document</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQueueStore } from '@/stores/useQueueStore'
import ProgressBar from '@/components/ui/ProgressBar.vue'
import Button from '@/components/ui/Button.vue'

const fileInput = ref<HTMLInputElement | null>(null)
const queue = useQueueStore()
const previewMode = ref(false)
const previewImage = ref('')
const previewProgress = ref(0)
let previewTimer: number

function triggerFileInput() {
  fileInput.value?.click()
}

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file || !file.type.startsWith('image/')) return

  const reader = new FileReader()
  reader.onload = () => {
    previewImage.value = reader.result as string
    previewMode.value = true
    startPreviewTimer(file)
  }
  reader.readAsDataURL(file)
}

function startPreviewTimer(file: File) {
  previewProgress.value = 0
  let elapsed = 0
  const interval = 100
  previewTimer = setInterval(() => {
    elapsed += interval
    previewProgress.value = (elapsed / 4000) * 100
    if (elapsed >= 4000) {
      clearInterval(previewTimer)
      saveFile(file)
    }
  }, interval)
}

function cancelCapture() {
  clearInterval(previewTimer)
  previewMode.value = false
  previewImage.value = ''
}

function saveFile(file: File) {
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

      previewMode.value = false
      previewImage.value = ''
    }
  }
  reader.readAsDataURL(file)
}
</script>
