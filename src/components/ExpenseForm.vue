<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="date">Date:</label>
      <input type="date" id="date" v-model="form.date" required>
    </div>
    <div>
      <label for="category">Category:</label>
      <input type="text" id="category" v-model="form.category" required>
    </div>
    <div>
      <label for="amount">Amount:</label>
      <input type="number" id="amount" v-model.number="form.amount" required>
    </div>
    <div>
      <label for="memo">Memo:</label>
      <input type="text" id="memo" v-model="form.memo">
    </div>
    <button type="submit">Add Expense</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Expense } from '../interfaces/expense';

const emit = defineEmits<{
  (e: 'add-expense', expense: Omit<Expense, 'id'>): void;
}>();

const form = ref<Omit<Expense, 'id'>>({
  date: new Date().toISOString().split('T')[0],
  category: '',
  amount: 0,
  memo: ''
});

const handleSubmit = () => {
  emit('add-expense', { ...form.value });
  form.value.category = '';
  form.value.amount = 0;
  form.value.memo = '';
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}
</style>
