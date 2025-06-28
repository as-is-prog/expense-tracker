<template>
  <div v-if="show" class="dialog-overlay" @click.self="close">
    <div class="dialog-content" ref="dialogContent">
      <h3>財務アドバイス</h3>
      <p style="white-space: pre-wrap;">{{ advice }}</p>
      <button @click="close">閉じる</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  show: boolean;
  advice: string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const dialogContent = ref<HTMLElement | null>(null);

// Watch for changes in the advice prop
watch(() => props.advice, () => {
  const el = dialogContent.value;
  if (el) {
    const scrollHeight = el.scrollHeight;
    const clientHeight = el.clientHeight;
    // Only scroll if there is overflow
    if (scrollHeight > clientHeight) {
      // Scroll to the vertical center
      el.scrollTop = (scrollHeight - clientHeight) / 2;
    }
  }
}, {
  // flush: 'post' ensures the callback runs after DOM updates.
  // This is cleaner than using nextTick() inside the watcher.
  flush: 'post'
});

const close = () => {
  emit('close');
};
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-content {
  background: #fff;
  color: #333;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-height: 70vh; /* 画面の高さの70%を上限に */
  overflow-y: auto; /* 内容がはみ出たらスクロール */
}

/* Dark mode styles */
@media (prefers-color-scheme: dark) {
  .dialog-content {
    background: #333;
    color: #eee;
  }
}
</style>