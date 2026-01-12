
export interface LessonCard {
  id: string;
  title: string;
  image: string;
  color: string;
  path: string;
}

export interface VocabularyItem {
  word: string;
  translation: string;
  image: string;
  pronunciation: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface QuizQuestion {
  id: number;
  image: string;
  correctWord: string;
  options: string[];
}
