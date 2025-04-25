<template>
  <div :class="'theme-' + theme">
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const theme = ref(localStorage.getItem('theme') || 
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

onMounted(() => {
  document.documentElement.className = theme.value === 'dark' ? 'dark' : 'light';
});
</script>
