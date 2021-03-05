import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/_model/order';
import { OrderService } from 'src/app/_services/order.service';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders:Order[]=[];
  users;
  allOrders:Order[]=[];
  message = 'Loading ...';
  input =['id' ,'date' ,'status' ,'customer' ];
  numOfPages: number[] = [];
  pageSize = 30;
  currentPage = 0;
  lastPage = 0;
  constructor(
    private orderService:OrderService,
    private userService:UsersService
  ) { }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(
      (res:any)=>{
        this.orders = res ;
        this.allOrders = res;
        this.lastPage = this.orders.length / this.pageSize;
        this.calculateNumOfPages();
      },
      (err)=>{console.error(err)},
      ()=>{}
    )
    this.userService.getAllUsers().subscribe(
      (res)=>{
        this.users=res;
      },
      (err)=>{console.error(err)},
      ()=>{},
    )
  }
  calculateNumOfPages() {
    this.numOfPages = [];
    for (let index = 0; index < this.orders.length / this.pageSize; index++) {
      this.numOfPages.push(index + 1);
    }
    if(this.numOfPages.length===0){
      this.numOfPages.push(0)
    }
  }
  getSlicedArrayOfOrders() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    return this.orders.slice(start, end);
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
        this.calculateNumOfPages();
      }
      else
      {
        this.orders = this.orderService.searchById(id,this.allOrders);
        this.calculateNumOfPages();
        this.message = 'Data Not Found';
      }
  }
  dateSearch(date){
    this.clearSearch('date');
    if( this.orderService.searchByDate(date,this.allOrders).length != 0)
      {
        this.orders = this.orderService.searchByDate(date,this.allOrders);
        this.calculateNumOfPages();
      }
      else
      {
        this.orders = this.orderService.searchByDate(date,this.allOrders);
        this.calculateNumOfPages();
        this.message = 'Data Not Found';
      }
  }
  statusSearch(status){
    this.clearSearch('status');
    if( this.orderService.searchByStatus(status,this.allOrders).length != 0)
      {
        this.orders = this.orderService.searchByStatus(status,this.allOrders);
        this.calculateNumOfPages();
      }
      else
      {
        this.orders = this.orderService.searchByStatus(status,this.allOrders);
        this.calculateNumOfPages();
        this.message = 'Data Not Found';
      }
  }
  getName(id){
    return this.users.find((user)=>user._id===id).userName;
  }
  customerNameSearch(name){
    this.clearSearch('customer');
    if( this.orderService.searchByCustomerName(name,this.allOrders).length != 0)
      {
        this.orders = this.orderService.searchByCustomerName(name,this.allOrders);
        this.calculateNumOfPages();
      }
      else
      {
        this.orders = this.orderService.searchByCustomerName(name,this.allOrders);
        this.calculateNumOfPages();
        this.message = 'Data Not Found';
      }
  }
  complete(id){
    let res =confirm('Are You Sure to Assign This Order as Completed ?');
    if(res)
    {
      let order = this.orders.find((order)=>order._id=id);
      order.orderStatus='Completed';
      this.orderService.updateOrder(order).subscribe(
        (res)=>{
          this.orderService.getAllOrders().subscribe(
            (res:any)=>{
              this.orders = res ;
              this.allOrders = res;
              this.lastPage = this.orders.length / this.pageSize;
              this.calculateNumOfPages();
            },
            (err)=>{console.error(err)},
            ()=>{}
          )
        },
        (err)=>{console.error(err)},
        ()=>{},
      )
    }
  }
  cancel(id){
    let res =confirm('Are You Sure to Cancel This Order ?');
    if(res)
    {
      let order = this.orders.find((order)=>order._id=id);
      order.orderStatus='Cancelled';
      this.orderService.updateOrder(order).subscribe(
        (res)=>{
          this.orderService.getAllOrders().subscribe(
            (res:any)=>{
              this.orders = res ;
              this.allOrders = res;
              this.lastPage = this.orders.length / this.pageSize;
              this.calculateNumOfPages();
            },
            (err)=>{console.error(err)},
            ()=>{}
          )
        },
        (err)=>{console.error(err)},
        ()=>{},
      )
    }
  }
}
