import { Component, OnInit } from '@angular/core';
import { Seller } from 'src/app/_model/sellers';
import { SellersService } from 'src/app/_services/sellers.service';

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.scss']
})
export class SellersComponent implements OnInit {
  sellers: Seller[] = [];

  constructor(private sellersService: SellersService) { }

  ngOnInit(): void {
   
    this.sellersService.getAllSellers().subscribe(
      (res:any)=>{
        this.sellers = res;
        console.log(this.sellers)
      },
      (err)=>{console.error(err)},
      ()=>{}
    );
  }

  // delete(i) {
  //   this.sellers.splice(i, 1);
  // }

  idSearch(searchquery):any {
     
    
    if( this.sellersService.getSellerById(searchquery,this.allProducts).length != 0)
    {
      this.sellers = this.sellersService.getSellerById(id,this.allProducts);
    }
    else
    {
      this.products = this.productService.searchById(id,this.allProducts);
      this.message = 'Data Not Found';
    }

    // console.log(searchquery);
    //  this.sellersService.getSellerById(searchquery).subscribe(
    //   (res:any)=>{
    //     this.sellers = res;
    //     console.log(this.sellers.email)
    //   },
    //   (err)=>{console.error(err)},
    //   ()=>{}
    //  );
    
  }
  
  // nameSearch(searchquery) {
    
  //   this.sellers= this.sellersService.getSellerByName(searchquery);
  // }

  // categorySearch(searchquery) {
  //   this.sellers = this.sellersService.getAllSellers();
  //   console.log(searchquery);
  //   this.sellers = this.sellersService.SearchByCategory(searchquery);
  // }

  // emailSearch(searchquery) {
  //   this.sellers = this.sellersService.getAllSellers();
  //   console.log(searchquery);
  //   this.sellers = this.sellersService.SearchByEmail(searchquery);
  // }



}
