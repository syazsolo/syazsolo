'use server';

import fs from 'fs/promises';
import path from 'path';

const HISTORY_FILE_PATH = path.join(process.cwd(), 'data', 'cover-letter-history.json');

export interface HistoryItem {
  id: string;
  date: string;
  templateId: string;
  fields: Record<string, string>;
}

export async function saveCoverLetterHistory(item: HistoryItem) {
  try {
    const fileContent = await fs.readFile(HISTORY_FILE_PATH, 'utf-8');
    const history = JSON.parse(fileContent) as HistoryItem[];
    
    history.push(item);
    
    await fs.writeFile(HISTORY_FILE_PATH, JSON.stringify(history, null, 2));
    return { success: true };
  } catch (error) {
    console.error('Failed to save history:', error);
    return { success: false, error: 'Failed to save history' };
  }
}
