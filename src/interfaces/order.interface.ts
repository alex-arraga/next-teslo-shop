export interface Order {
  id: string;
  subTotal: number;
  total: number;
  tax: number;
  itemsInOrder: number;
  isPaid: boolean;
  paidAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}