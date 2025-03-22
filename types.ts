export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface SearchResponse {
  next?: string;
  prev?: string;
  total: number;
  resultIds: string[];
}
