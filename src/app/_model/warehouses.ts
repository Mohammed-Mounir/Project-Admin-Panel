export interface Warehouse {
  _id?: string;
  name: string;
  location: string;
  totalOrders: number;
  totalProducts: number;
  isFull: boolean;
}
