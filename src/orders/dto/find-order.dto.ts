export class FindOrderDto {
  id: string;
  paymentType: string;
  quantity: number;
  delivery: boolean;
  observations: string;
  isPaid: boolean;
  orderState: string;
  date: Date;
  userId: string;
  menuId: string;
}
