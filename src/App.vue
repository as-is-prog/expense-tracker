<template>
  <div id="app">
    <h1>Expense Tracker</h1>
    <ExpenseForm @add-expense="addExpense" />
    <ExpenseList :expenses="expenses" @delete-expense="deleteExpense" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ExpenseForm from './components/ExpenseForm.vue';
import ExpenseList from './components/ExpenseList.vue';
import { IndexedDbService } from './services/indexedDbService';
import type { StorageService } from './services/storageService';
import type { Expense } from './interfaces/expense';

const storageService: StorageService = new IndexedDbService();

const expenses = ref<Expense[]>([]);

const fetchExpenses = async () => {
  expenses.value = await storageService.getAllExpenses();
};

const addExpense = async (expense: Omit<Expense, 'id'>) => {
  await storageService.addExpense(expense);
  await fetchExpenses();
};

const deleteExpense = async (id: number) => {
  await storageService.deleteExpense(id);
  await fetchExpenses();
};

onMounted(fetchExpenses);
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
