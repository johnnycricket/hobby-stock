export type Category = {
  id: number;
  name: string;
  description?: string;
};

export type CategoryInput = {
  name: string;
  description: string;
};
