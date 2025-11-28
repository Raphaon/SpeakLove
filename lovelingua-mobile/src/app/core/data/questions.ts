import { TestResult } from '../models/test-result.model';

export interface QuizQuestion {
  id: string;
  text: string;
  languageId: string;
}

export const SAMPLE_QUESTIONS: QuizQuestion[] = [
  { id: 'q1', text: "J'apprécie recevoir des mots encourageants", languageId: 'words' },
  { id: 'q2', text: 'Les cadeaux me font sentir aimé(e)', languageId: 'gifts' },
  { id: 'q3', text: 'Passer du temps de qualité est ma priorité', languageId: 'time' },
  { id: 'q4', text: 'Un service rendu compte beaucoup pour moi', languageId: 'service' },
  { id: 'q5', text: 'Les gestes tendres me rassurent', languageId: 'touch' }
];

export function computeResult(answers: Record<string, number>): TestResult {
  const entries = Object.entries(answers);
  const scores = entries.reduce<Record<string, number>>((acc, [languageId, score]) => {
    acc[languageId] = (acc[languageId] ?? 0) + score;
    return acc;
  }, {});
  const primary = entries.sort(([, a], [, b]) => b - a)[0];
  return {
    id: crypto.randomUUID(),
    userId: '',
    date: new Date().toISOString(),
    scores,
    primaryLanguageId: primary?.[0] ?? 'unknown',
    primaryLanguage: primary?.[0] ?? 'unknown'
  };
}
