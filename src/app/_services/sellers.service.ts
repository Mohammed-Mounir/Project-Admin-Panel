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



  getAllSellers() {
    return this.httpClinet.get(this.baseUrl+'api/sellers');
  }
  getSellerById(id:string){
    return this.httpClinet.get(this.baseUrl+'api/sellers/id/'+id);
  }

  addSeller(seller: Seller) {

    const newSeller: Seller = {
      name:seller.name,
      phone:seller.phone,
      sellerName: seller.sellerName,
      category: seller.category,
      address: seller.address,
      logoImg: seller.logoImg,
      shortDesc: seller.shortDesc,
      email: seller.email,
      password: seller.password,
      dateOfRegister:seller.dateOfRegister



    };
    this.sellers.push(newSeller);
    // console.log(this.sellers);
  }
  updateSeller(seller: Seller,id:string) {
    return this.httpClinet.put(this.baseUrl+'api/sellers/'+id,seller);
  }
 
  deleteSeller(id: string) {
    return this.httpClinet.delete(this.baseUrl+'api/sellers/'+id);
  }
    
 ////////////////////////////////////////////////////
  SearchById(id) {
    console.log(this.sellers)
    return this.sellers.filter(s => s._id.includes(id));
   
  }

  SearchByName(name) {
    return this.sellers.filter(s => s.sellerName.toLowerCase().includes(name.toLowerCase()));
  }

  SearchByCategory(category) {
    return this.sellers.filter(s => s.category.toLowerCase().includes(category.toLowerCase()));
  }

  SearchByEmail(email) {
    return this.sellers.filter(s => s.email.toLowerCase().includes(email.toLowerCase()));
  }
}
