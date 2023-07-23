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

export type CreateTranslate = {
  enContent: string;
};

export type SortOrderProp = "asc" | "desc";
export type FilterOptionProp = "default" | "long" | "medium" | "short";