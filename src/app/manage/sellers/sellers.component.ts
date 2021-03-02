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
    this.sellers = this.sellersService.getAllSellers(); 
    console.log(this.sellers); 

  }

  delete(i) {
    this.sellers.splice(i, 1);
  }

  idSearch(searchquery) {
     this.sellers = this.sellersService.getAllSellers();
    console.log(searchquery);
     this.sellers = this.sellersService.SearchById(searchquery);
    
  }
  
  nameSearch(searchquery) {
    this.sellers = this.sellersService.getAllSellers();
    console.log(searchquery);
    this.sellers = this.sellersService.SearchByName(searchquery);
  }

  categorySearch(searchquery) {
    this.sellers = this.sellersService.getAllSellers();
    console.log(searchquery);
    this.sellers = this.sellersService.SearchByCategory(searchquery);
  }

  emailSearch(searchquery) {
    this.sellers = this.sellersService.getAllSellers();
    console.log(searchquery);
    this.sellers = this.sellersService.SearchByEmail(searchquery);
  }



}
