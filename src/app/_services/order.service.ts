import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../_model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = 'https://iti-amzon-backend.herokuapp.com/';
  constructor(private httpClinet : HttpClient) { }
  getAllOrders(){
    return this.httpClinet.get(this.baseUrl+'api/orders');
  }
  orderById(id:string){
    return this.httpClinet.get(this.baseUrl+'api/order/id/'+id);
  }
  updateOrder(order:Order){
    return this.httpClinet.put(this.baseUrl+'api/order/'+order._id,order);
  }
  deleteOrder(id:string){
    return this.httpClinet.delete(this.baseUrl+'api/order/'+id);
  }
  addOrder(order) {
    const newOrder: Order = {
      _id: order.orderData.orderID,
      orderItems: order.orderDetails.purchase_units[0].items,
      orderPrice: order.orderDetails.purchase_units[0].amount.value,
      orderDate: order.orderDetails.create_time,
      shippingAddress: order.userAddress,
      orderStatus: 'Pending',
      customerId: '5ff8c51fa4c6cf417005fd48',
    };

    this.httpClinet
      .post<{ message: string; orderID: string }>(
        this.baseUrl+'api/order/add',
        newOrder
      )
      .subscribe((responseOrder) => {
        console.log(responseOrder);
      });
  }
  searchById(id,orders){
    return orders.filter(o=> o._id.includes(id));
  }
  searchByDate(date,orders){
    return orders.filter(o=> o.orderDate.toLowerCase().includes(date.toLowerCase()));
  }
  searchByStatus(status,orders){
    return orders.filter(o=> o.orderStatus.toLowerCase().includes(status.toLowerCase()));
  }
  searchByCustomerName(name,orders){
    return orders.filter(o=> o.customerId.toLowerCase().includes(name.toLowerCase()));
  }
}
