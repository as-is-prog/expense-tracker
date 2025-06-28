import type { Expense } from '../interfaces/expense';

const OLLAMA_API_URL = 'http://localhost:11434/api/generate';
const MODEL_NAME = 'gemma3n:e2b';

export class AdviceService {
  async generateAdvice(expenses: Expense[]): Promise<string> {
    if (expenses.length === 0) {
      return 'アドバイスを生成するための支出データがありません。まずは支出を記録してください。';
    }

    const formattedExpenses = expenses.map(e =>
      `- 日付: ${e.date}, カテゴリ: ${e.category}, 金額: ${e.amount}円, メモ: ${e.memo}`
    ).join('\n');

    const prompt = `
あなたは優秀なファイナンシャルアドバイザーです。
以下の支出データに基づいて、家計を改善するための具体的で実践的なアドバイスを日本語で生成してください。
支出の傾向を分析し、どのカテゴリに使いすぎているか、節約のポイントなどを指摘してください。

支出データ:
${formattedExpenses}

アドバイス:
`;

    try {
      const response = await fetch(OLLAMA_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: MODEL_NAME,
          prompt: prompt,
          stream: false,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ollama API request failed: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      return data.response || 'アドバイスを取得できませんでした。';

    } catch (error) {
      console.error('Error generating advice:', error);
      if (error instanceof Error && error.message.includes('Failed to fetch')) {
         return 'Ollama APIへの接続に失敗しました。Ollamaが起動しているか、ポートが正しいか確認してください。 (http://localhost:11434)';
      }
      return 'アドバイスの生成中にエラーが発生しました。';
    }
  }
}
