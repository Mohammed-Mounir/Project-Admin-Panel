import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Seller } from '../_model/sellers';

@Injectable({
  providedIn: 'root'
})
export class SellersService {
  sellers: Seller[] = [];
  baseUrl = 'https://iti-amzon-backend.herokuapp.com/';
  constructor(private httpClinet : HttpClient) { }


////////////////////////////////////////////////////
getAllSellers() {
  return this.httpClinet.get(this.baseUrl+'api/sellers');
}

searchById(res,id){
  return res.filter(p=> p._id.includes(id));
}

  SearchByName(res, searchQuery) {
    const sellerName = searchQuery.toLowerCase();
    this.sellers = res;
    return this.sellers.filter(seller => seller.sellerName.toLowerCase().includes(sellerName));
  }

  SearchByCategory(res,myCategory) {
    const sellerCategory = myCategory.toLowerCase();
    this.sellers = res;
    return this.sellers.filter(seller => seller.category&&seller.category.toLowerCase().includes(sellerCategory));
  }

  SearchByEmail(res,email) {
    const sellerEmail = email.toLowerCase();
    this.sellers = res;
    return this.sellers.filter(seller => seller.email.toLowerCase().includes(sellerEmail));
  }

  updateSeller(seller: Seller,id:string) {
    return this.httpClinet.put(this.baseUrl+'api/sellers/'+id,seller);
  }
 
  deleteSeller(id: string) {
 
    return this.httpClinet.delete(this.baseUrl+'api/sellers/'+id);
  }
    
 
}
