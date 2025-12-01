export type Filters = {
  campiAggregazione: string[];
};

export type AggregationResult = {
  projectName?: string;
  employeeName?: string;
  date?: string;
  totaleOre: number;
};

export type WorkRecord = {
  project: { id: number; name: string };
  employee: { id: number; name: string };
  date: string;
  hours: number;
};