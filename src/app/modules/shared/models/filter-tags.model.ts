export interface FilterTags {
  id: number;
  name?: string;
  label: string;
  filter: string;
  operator: string;
  value: string;
  isParam?: boolean;
  isHttps?: boolean
}
