Home View Redesign
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
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
        v-if="previewBase64"
        class="aspect-video bg-muted rounded-xl overflow-hidden flex items-center justify-center shadow-md"
      >
        <img :src="previewBase64" alt="Preview" class="object-cover w-full h-full" />
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

    <!-- Navigation -->
    <div class="flex justify-center gap-8 mt-4">
      <RouterLink to="/" class="text-sm text-muted-foreground hover:text-foreground">Home</RouterLink>
      <RouterLink to="/sync" class="text-sm text-muted-foreground hover:text-foreground">Sync</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQueueStore } from '@/stores/useQueueStore'

const fileInput = ref<HTMLInputElement | null>(null)
const previewBase64 = ref<string>('')
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

      previewBase64.value = compressedBase64
    }
  }

  reader.readAsDataURL(file)
}
</script>
