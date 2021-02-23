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
  allOrders:Order[]=[];
  constructor(
    private orderService:OrderService,
  ) { }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(
      (res:any)=>{
        this.orders = res ;
        this.allOrders = res
        console.log(res);
      },
      (err)=>{console.error(err)},
      ()=>{}
    )
  }
  delete(id) {
    this.orderService.deleteOrder(id).subscribe(
      ()=>{console.log(id);
        this.orderService.getAllOrders().subscribe(
          (res:any)=>{
            this.orders = res;
            this.allOrders = res;
            console.log(res);
          },
          (err)=>{console.error(err)},
          ()=>{}
        );
      },
      (err)=>{console.error(err)},
      ()=>{}
    );
      
      
  }
}
