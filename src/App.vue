<template>
  <div id="app">
    <router-view />

    <div class="menu-overlay" :class="{ open: menuOpen }" @click.self="toggleMenu">
      <nav class="menu" :class="{ open: menuOpen }">
        <a @click="navigate('/')" class="menu-item">🏠 Home</a>
        <a @click="navigate('/sync')" class="menu-item">📤 Sync Queue</a>
      </nav>
    </div>

    <button class="menu-toggle" @click="toggleMenu">☰</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const menuOpen = ref(false);
const router = useRouter();

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const navigate = (path: string) => {
  router.push(path);
  menuOpen.value = false;
};
</script>

<style scoped>
.menu-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
  z-index: 10;
}
.menu-overlay.open {
  opacity: 1;
  pointer-events: auto;
}
.menu {
  position: absolute;
  bottom: 3.5rem;
  left: 1rem;
  background: var(--bg);
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transform: translateY(100%);
  transition: transform 0.3s;
}
.menu.open {
  transform: translateY(0);
}
.menu-item {
  display: block;
  padding: 0.5rem;
  text-decoration: none;
  color: var(--text);
}
.menu-item:hover {
  font-weight: bold;
}
.menu-toggle {
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  background: var(--bg);
  border: none;
  font-size: 1.5rem;
  padding: 0.75rem 1rem;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 11;
}
</style>