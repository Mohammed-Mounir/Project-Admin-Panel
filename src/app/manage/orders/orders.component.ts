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
  message = 'Loading ...';
  input =['id' ,'date' ,'status' ,'customer' ]
  constructor(
    private orderService:OrderService,
  ) { }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(
      (res:any)=>{
        this.orders = res ;
        this.allOrders = res
      },
      (err)=>{console.error(err)},
      ()=>{}
    )
  }
  setUrl(lat,lng)
  {
    console.log(lat );
    return 'http://google.com/maps/bylatlng?lat=' + lat + '&lng=' + lng
  }
  delete(id) {
    this.orderService.deleteOrder(id).subscribe(
      ()=>{console.log(id);
        this.orderService.getAllOrders().subscribe(
          (res:any)=>{
            this.orders = res;
            this.allOrders = res;
          },
          (err)=>{console.error(err)},
          ()=>{}
        );
      },
      (err)=>{console.error(err)},
      ()=>{}
    );
      
      
  }
  clearSearch(except){

    for(let i of this.input)
    {
      if(i != except)
      {
        let inp = document.getElementById(i) as HTMLInputElement;
        inp.value = '';
      }
    }
  }
  idSearch(id){
    this.clearSearch('id');
    if( this.orderService.searchById(id,this.allOrders).length != 0)
      {
        this.orders = this.orderService.searchById(id,this.allOrders);
      }
      else
      {
        this.orders = this.orderService.searchById(id,this.allOrders);
        this.message = 'Data Not Found';
      }
  }
  dateSearch(date){
    this.clearSearch('date');
    if( this.orderService.searchByDate(date,this.allOrders).length != 0)
      {
        this.orders = this.orderService.searchByDate(date,this.allOrders);
      }
      else
      {
        this.orders = this.orderService.searchByDate(date,this.allOrders);
        this.message = 'Data Not Found';
      }
  }
  statusSearch(status){
    this.clearSearch('status');
    if( this.orderService.searchByStatus(status,this.allOrders).length != 0)
      {
        this.orders = this.orderService.searchByStatus(status,this.allOrders);
      }
      else
      {
        this.orders = this.orderService.searchByStatus(status,this.allOrders);
        this.message = 'Data Not Found';
      }
  }
  customerNameSearch(name){
    this.clearSearch('customer');
    if( this.orderService.searchByCustomerName(name,this.allOrders).length != 0)
      {
        this.orders = this.orderService.searchByCustomerName(name,this.allOrders);
      }
      else
      {
        this.orders = this.orderService.searchByCustomerName(name,this.allOrders);
        this.message = 'Data Not Found';
      }
  }
}
