export type Client = {
  id: number;
  name: string;
  phone: string;
  email: string;
  birthday: Date;
  address: string;
}

export type TableSelection<T> = {
  rows: Array<T>;
  totalElements: number;
}
