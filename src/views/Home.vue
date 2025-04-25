Document Scanner App
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
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
<template>
  <div class="home">
    <h1>📄 Dodaj dokument</h1>
    <div class="preview-box" @click="triggerCamera" v-if="!imageData">
      <span>📷 Dodaj dokument</span>
    </div>
    <img v-if="imageData" :src="imageData" class="preview-img" />

    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      capture="environment"
      class="hidden-input"
      @change="onFileChange"
    />

    <div class="actions" v-if="imageData">
      <button @click="triggerCamera">🔁 Powtórz</button>
      <button @click="clear">❌ Usuń</button>
      <button @click="upload">📤 Wyślij</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const fileInput = ref<HTMLInputElement | null>(null);
const imageData = ref<string | null>(null);

const API_URL = 'https://script.google.com/macros/s/AKfycbxNI_qyVD1FiyyKFnGPnWjmO9bieG2RNoMoJsC2-KDoznqY_kKUmg47Eq3j8JrqYiiL/exec';

function triggerCamera() {
  fileInput.value?.click();
}

function onFileChange(event: Event) {
  const file = (event.target as HTMLInputElement)?.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    imageData.value = e.target?.result as string;
  };
  reader.readAsDataURL(file);
}

function clear() {
  imageData.value = null;
  if (fileInput.value) fileInput.value.value = '';
}

async function upload() {
  if (!imageData.value) return;
  try {
    const base64 = imageData.value.split(',')[1];
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        type: 'image/jpeg',
        contents: base64,
      })
    });
    const text = await res.text();
    alert(text.includes('✅') ? '✅ Wysłano dokument!' : '❌ Błąd przy wysyłce');
    clear();
  } catch (err) {
    alert('❌ Błąd: ' + err);
  }
}
</script>

<style scoped>
.home {
  padding: 1rem;
  text-align: left;
}
.preview-box {
  width: 80%;
  max-width: 500px;
  aspect-ratio: 4/3;
  border: 2px dashed #888;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem auto;
  color: #aaa;
  cursor: pointer;
}
.preview-img {
  width: 80%;
  max-width: 500px;
  margin: 1rem auto;
  display: block;
  border: 2px solid #ccc;
}
.actions {
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
}
.hidden-input {
  display: none;
}
</style>

