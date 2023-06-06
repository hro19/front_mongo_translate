export type Translate = {
  _id: string;
  enContent: string;
  jaContent: string;
  created_at: string;
};

export type TranslateObj = {
  translate: Translate;
};

export type TranslateIterateObj = {
  data: Translate[];
};