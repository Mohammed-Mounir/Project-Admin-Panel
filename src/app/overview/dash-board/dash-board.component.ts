import { Component, OnInit } from '@angular/core';
import anychart from 'anychart/index.js'
import { OrderService } from 'src/app/_services/order.service';
import { SellersService } from 'src/app/_services/sellers.service';
import { UsersService } from 'src/app/_services/users.service';
@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {
   orders;
   users;
  constructor(
    private orderService:OrderService,
    private userService:UsersService,
    private sellerService:SellersService
    ) { }

  ngOnInit(): void {
    
    this.orderService.getAllOrders().subscribe(
      (res)=>{
        this.orders = res;
        let pending=0,
            completed =0,
            cancelled = 0,
            value;
        for(let order of this.orders)
        {
          if(order.orderStatus==="Pending"){
            pending++;
          }
          else if(order.orderStatus==="Completed"){
            completed++;
          }
          else if(order.orderStatus==="Cancelled"){
            cancelled++;
          }
        }
        value = [
          {x :"Pending", value :pending , fill: "#007eb9"},
          {x :"Completed", value :completed , fill: "#24964e"},
          {x :"Cancelled", value :cancelled , fill: "#c6382f"},
        ];
        this.chart('Orders',value,this.orders.length,'pie');
      },
      (err)=>{console.error(err)},
      ()=>{}
    )
    this.userService.getAllUsers().subscribe(
      (res)=>{
        this.users = res;
        let child=0,
            baby=0,
            adult =0,
            old = 0,
            value;
        for(let user of this.users)
        {
          if(user.age>=15 && user.age<25){
            child++;
          }
          else if(user.age>=25 && user.age<40){
            adult++;
          }
          else if(user.age<15){
            baby++;
          }
          else if (user.age>40)
          {
            old++;
          }
        }
        value = [
          {x :"15-", value :baby , fill: "#48a3c6" , stroke:'white'},
          {x :"15-24", value :child , fill: "#ff9900" , stroke:'white'},
          {x :"25-39", value :adult , fill: "#24964e" , stroke:'white'},
          {x :"40+", value :old , fill: "#c6382f" , stroke:'white'},
        ];
        this.chart('Users',value,this.users.length,'column');
      },
      (err)=>{console.error(err)},
      ()=>{},
    )
    /* this.sellerService.getAllSellers().subscribe(
      (res)=>{
        this.users = res;
        let child=0,
            baby=0,
            adult =0,
            old = 0,
            value;
        for(let user of this.users)
        {
          if(user.age>=15 && user.age<25){
            child++;
          }
          else if(user.age>=25 && user.age<40){
            adult++;
          }
          else if(user.age<15){
            baby++;
          }
          else if (user.age>40)
          {
            old++;
          }
        }
        value = [
          {x :"15-", value :baby , fill: "#48a3c6" , stroke:'white'},
          {x :"15-24", value :child , fill: "#ff9900" , stroke:'white'},
          {x :"25-39", value :adult , fill: "#24964e" , stroke:'white'},
          {x :"40+", value :old , fill: "#c6382f" , stroke:'white'},
        ];
        this.chart('Users',value,this.users.length,'column');
      },
      (err)=>{console.error(err)},
      ()=>{},
    ) */
    
    /* this.chart('Product',this.value);
    this.chart('Seller',this.value); */
  }
  chart(name,value,total,type){
    var data = [
      ...value
    ];

    // create a chart and set the data
    var chart = anychart[type](data)

    // set the chart title
    chart.title(`Chart of ${name} , Total ${name} : ${total}`);
    // set the container id
    chart.container(name);

    // initiate drawing the chart
    chart.draw();
  }
}
