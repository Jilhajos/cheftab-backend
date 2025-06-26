import { Controller, Post, Body, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './create-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
createOrder(@Body() body: any) {
  const { tableNumber, items, subtotal, tax, total } = body;
  return this.orderService.createOrder({ tableNumber, items, subtotal, tax, total });
}


  @Get()
  getOrders() {
    return this.orderService.getAllOrders();
  }
}
