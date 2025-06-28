<template>
  <div>
    <h2>Expense List</h2>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Memo</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="expense in expenses" :key="expense.id">
          <td>{{ expense.date }}</td>
          <td>{{ expense.category }}</td>
          <td>{{ expense.amount }}</td>
          <td>{{ expense.memo }}</td>
          <td><button @click="handleDelete(expense.id!)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { Expense } from '../interfaces/expense';

defineProps<{
  expenses: Expense[];
}>();

const emit = defineEmits<{
  (e: 'delete-expense', id: number): void;
}>();

const handleDelete = (id: number) => {
  emit('delete-expense', id);
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
}
</style>
