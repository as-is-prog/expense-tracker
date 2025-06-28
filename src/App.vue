<template>
  <div id="app">
    <h1>Expense Tracker</h1>
    <ExpenseForm @add-expense="addExpense" />
    <ExpenseList :expenses="expenses" @delete-expense="deleteExpense" />

    <div class="advice-section">
      <button @click="handleGenerateAdvice" :disabled="isLoading">
        {{ isLoading ? 'アドバイスを生成中...' : 'Generate Advice' }}
      </button>
    </div>

    <AdviceDialog
      :show="showAdviceDialog"
      :advice="adviceText"
      @close="showAdviceDialog = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ExpenseForm from './components/ExpenseForm.vue';
import ExpenseList from './components/ExpenseList.vue';
import AdviceDialog from './components/AdviceDialog.vue';
import { IndexedDbService } from './services/indexedDbService';
import { AdviceService } from './services/adviceService';
import type { StorageService } from './services/storageService';
import type { Expense } from './interfaces/expense';

const storageService: StorageService = new IndexedDbService();
const adviceService = new AdviceService();

const expenses = ref<Expense[]>([]);
const showAdviceDialog = ref(false);
const adviceText = ref('');
const isLoading = ref(false);

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

const handleGenerateAdvice = async () => {
  isLoading.value = true;
  adviceText.value = 'AIがアドバイスを考えています... 少々お待ちください。';
  showAdviceDialog.value = true;

  const advice = await adviceService.generateAdvice(expenses.value);
  adviceText.value = advice;
  isLoading.value = false;
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

.advice-section {
  margin-top: 2rem;
}
</style>