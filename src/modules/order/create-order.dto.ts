export class CreateOrderDto {
  tableNumber: number;
  items: {
    itemName: string;
    price: number;
    quantity: number;
    note?: string;
    totalPrice: number;
  }[];
  subtotal: number;
  tax: number;
  total: number;
}
