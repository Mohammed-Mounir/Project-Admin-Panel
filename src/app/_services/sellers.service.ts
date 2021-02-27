import { Injectable } from '@angular/core';
import { Seller } from '../_model/sellers';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SellersService {
  sellers: Seller[] = [];
  baseUrl = 'http://localhost:3000/';
  constructor(private httpClinet : HttpClient) { }

  getAllSellers() {
    return this.httpClinet.get(this.baseUrl+'api/sellers');
  }
  getSellerById(id:string) {

    return this.httpClinet.get(this.baseUrl+'api/sellers/id/'+id);
  }

  getSellerByName(sellerName: string) {
    return this.httpClinet.get(this.baseUrl+'api/sellers/name/'+sellerName);
  }

  updateSeller(seller: Seller): void {
    
  }
  
  deleteSeller(id: string) {
    return this.httpClinet.delete(this.baseUrl+'api/sellers/'+id);
  }

}
