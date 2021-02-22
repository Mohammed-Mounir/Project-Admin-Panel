import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/_model/order';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders:Order[]=[];
  constructor(
    private orderService:OrderService,
  ) { }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(
      (res:any)=>{
        this.orders = res ;
        console.log(res);
      },
      (err)=>{console.error(err)},
      ()=>{}
    )
  }

}
