import { openDB } from 'idb';
import type { Expense } from '../interfaces/expense';
import type { StorageService } from './storageService';

const DB_NAME = 'expense-tracker-db';
const STORE_NAME = 'expenses';
const DB_VERSION = 1;

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
    }
  },
});

export class IndexedDbService implements StorageService {
  async addExpense(expense: Expense): Promise<void> {
    const db = await dbPromise;
    await db.add(STORE_NAME, expense);
  }

  async getAllExpenses(): Promise<Expense[]> {
    const db = await dbPromise;
    return await db.getAll(STORE_NAME);
  }

  async deleteExpense(id: number): Promise<void> {
    const db = await dbPromise;
    await db.delete(STORE_NAME, id);
  }
}
