export type Language = 'ru' | 'en';
export type Theme = 'dark' | 'light';

export interface Version {
  id: string;
  version: string;     // Номер версии
  releaseDate: string; // Дата
  type: 'stable' | 'beta'; // Тип
  downloadUrl: string; // Ссылка
}

export interface FaqItem {
  id: string;
  question: {
    ru: string;
    en: string;
  };
  answer: {
    ru: string;
    en: string;
  };
}

export interface Translations {
  [key: string]: {
    ru: string;
    en: string;
  };
}