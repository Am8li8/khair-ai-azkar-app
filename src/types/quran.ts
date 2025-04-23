
export interface Verse {
  number: number;
  text: string;
  tafsir?: string;
}

export interface Surah {
  id: number;
  name: string;
  verses: Verse[];
}
