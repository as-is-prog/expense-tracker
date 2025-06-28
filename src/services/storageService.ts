import type { Expense } from '../interfaces/expense';

export interface StorageService {
  addExpense(expense: Expense): Promise<void>;
  getAllExpenses(): Promise<Expense[]>;
  deleteExpense(id: number): Promise<void>;
}
