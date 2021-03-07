import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../_model/product';
import { SellersService } from './sellers.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  
  products:Product[];
  cartProducts = [];
  baseUrl = 'https://iti-amzon-backend.herokuapp.com/';
  productAdded = new EventEmitter<Product[]>();

  constructor(
    private httpClinet : HttpClient,
    private sellerService : SellersService
    ) {}
  getAllProducts() {
    return this.httpClinet.get(this.baseUrl+'api/products');
  }
  productById(id: string) {
    return this.httpClinet.get(this.baseUrl+'api/product/id/'+id);
  }
  productByName(name: string) {
    return this.httpClinet.get(this.baseUrl+'api/product/name/'+name);
  }
  updateProduct(product: Product) {
    return this.httpClinet.put(this.baseUrl+'api/product/'+product._id,product);
  }
  deleteProduct(id: string) {
    return this.httpClinet.delete(this.baseUrl+'api/product/'+id);
  }
  addProduct(product: Product) {
   

    return this.httpClinet.post(this.baseUrl+'api/product/add',product);
  }

  addProductsToCart(products) {
    this.cartProducts = products.slice();
    this.productAdded.emit(this.cartProducts);
  }

  /* searchProductsByKeywords(...params) {
    var result = this.products.filter((p) => {
      return p.keywords.includes(params[0]);
    });
    for (let index = 1; index < params.length; index++) {
      result = result.filter((p) => {
        return p.keywords.includes(params[index]);
      });
    }

    return result;
  } */

  searchById(id,products){
    return products.filter(p=> p._id.includes(id));
  }
  /* searchByCategory(category,products){
    return products.filter(p=> {
      if(p.productCategory)
      {
        return p.productCategory.includes(category)
      }
      else
      {
        return 0
      }
    });
  } */
  /* searchBySubCategory(sub,products){
    return products.filter(p=> {
      if(p.productSubCategory)
      {
        return p.productSubCategory.includes(sub)
      }
      else
      {
        return 0
      }
    });
  } */
  searchByType(type,products){
    return products.filter(p=> {
      if(p.productType)
      {
        return p.productType.toLowerCase().includes(type.toLowerCase())
      }
      else
      {
        return 0
      }
    });
  }
  /* searchByStock(stock,products){
    return products.filter(p=> {
      if(p.productStock)
      {
        return p.productStock.toString().includes(stock)
      }
      else
      {
        return 0
      }
    });
  } */
  searchByName(name,products){
    return products.filter(p=> {
      if(p.productName)
      {
        return p.productName.toLowerCase().includes(name.toLowerCase())
      }
      else
      {
        return 0
      }
    });
  }
  searchBySalesName(sellerName,products){
    let seller:any = this.sellerService.SearchByName(products,sellerName);
    let ans = [];
    for(let prod of products)
    {
      for(let sel of seller)
      {
        if(prod.productSales === sel._id)
        {
          ans.push(prod);
        }
      }
    }
    return ans;
  }
}
