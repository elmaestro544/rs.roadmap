
export enum Language {
  EN = 'en',
  AR = 'ar'
}

export enum MessageRole {
  USER = 'user',
  MODEL = 'model'
}

export interface Message {
  role: MessageRole;
  text: string;
  relatedPapers?: Paper[];
  sources?: Source[];
}

export interface Paper {
  title: string;
  authors: string;
  year: string;
  summary: string;
  url: string;
}

export interface Source {
  uri: string;
  title: string;
}

export interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}
