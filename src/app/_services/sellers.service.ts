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

  SearchByCategory(res,category) {
    const sellerCategory = category.toLowerCase();
    this.sellers = res;
    return this.sellers.filter(seller => seller.category.toLowerCase().includes(sellerCategory));
  }

  SearchByEmail(res,email) {
    const sellerEmail = email.toLowerCase();
    this.sellers = res;
    return this.sellers.filter(seller => seller.email.toLowerCase().includes(sellerEmail));
  }
 /////////////////////////////////////
  // addSeller(seller: Seller) {
  //   const newSeller: Seller = {
  //     name:seller.name,
  //     phone:seller.phone,
  //     sellerName: seller.sellerName,
  //     category: seller.category,
  //     address: seller.address,
  //     logoImg: seller.logoImg,
  //     shortDesc: seller.shortDesc,
  //     email: seller.email,
  //     password: seller.password,
  //     dateOfRegister:seller.dateOfRegister
  //   };
  //   this.sellers.push(newSeller);
  //   // console.log(this.sellers);
  // }
  updateSeller(seller: Seller,id:string) {
    return this.httpClinet.put(this.baseUrl+'api/sellers/'+id,seller);
  }
 
  deleteSeller(id: string) {
    console.log(id)
    return this.httpClinet.delete(this.baseUrl+'api/sellers/'+id);
  }
    
 
}
