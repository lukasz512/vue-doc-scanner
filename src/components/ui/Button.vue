Button Ui
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
<template>
  <button
    :class="[
      'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
      variantClasses,
      sizeClasses
    ]"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'default'
  },
  size: {
    type: String,
    default: 'default'
  }
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'outline':
      return 'border border-primary text-primary hover:bg-primary/10'
    case 'ghost':
      return 'hover:bg-muted'
    case 'link':
      return 'text-primary underline-offset-4 hover:underline'
    default:
      return 'bg-primary text-background hover:opacity-80 transition-opacity duration-200'
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'h-8 px-3'
    case 'lg':
      return 'h-12 px-6'
    default:
      return 'h-10 px-4'
  }
})
</script>
