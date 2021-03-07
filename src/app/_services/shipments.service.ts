import { Shipments } from './../_model/shipments';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ShipmentsService {
  shipments: Shipments[] = [];
  baseUrl = 'https://iti-amzon-backend.herokuapp.com/';
  constructor(private httpClinet : HttpClient) { }
  ////////////////////////////////////////////////////
getAllShipments() {
  return this.httpClinet.get(this.baseUrl+'api/shipments');
}

searchById(res,id){
  return res.filter(p=> p._id.includes(id));
}

  searchByCompany(res, company) {
    const shipmentCompany = company.toLowerCase();
    this.shipments = res;
    return this.shipments.filter(shipments => shipments.shippingCompany.toLowerCase().includes(shipmentCompany));
  }

  searchByDate(res,date) {
    this.shipments = res;
    return this.shipments.filter(shipments => shipments.deliveryDate.includes(date));
  }

  searchByPayment(res,payment) {
    const shipmentPayment = payment.toLowerCase();
    this.shipments = res;
    return this.shipments.filter(shipments => shipments.paymentMethod.toLowerCase().includes(shipmentPayment));
  }
 
  updateShipments(shipment: Shipments,id:string) {
    return this.httpClinet.put(this.baseUrl+'api/shipments/'+id,shipment);
  }
 
  deleteShipments(id: string) {
  
    return this.httpClinet.delete(this.baseUrl+'api/shipments/'+id);
  }
    
}
