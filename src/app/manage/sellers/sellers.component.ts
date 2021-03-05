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
  message = 'Loading ...';
  input =['id' ,'name' ,'category' ,'email' ];
  constructor(private sellersService: SellersService) { }

  ngOnInit(): void {
    this.sellersService.getAllSellers().subscribe(
      (res:any)=>{
        this.sellers = res;
        
      },
      (err)=>{console.error(err)},
      ()=>{}
    );
  }

  delete(i) {
    this.sellers.splice(i, 1);
  }
  clearSearch(except){

    for(let i of this.input)
    {
      if(i != except)
      {
        let inp = document.getElementById(i) as HTMLInputElement;
        inp.value = '';
      }
    }
  }
  idSearch(id) {
    this.clearSearch('id');
      if( this.sellersService.SearchById(id).length != 0)
      {
        this.sellers = this.sellersService.SearchById(id);
      }
      else
      {
        this.sellers = this.sellersService.SearchById(id);
        this.message = 'Data Not Found';
      }
     
    
  }
  
  nameSearch(name) {
    this.clearSearch('name');
    if( this.sellersService.SearchByName(name).length != 0)
      {
        this.sellers = this.sellersService.SearchByName(name);
      }
      else
      {
        this.sellers = this.sellersService.SearchByName(name);
        this.message = 'Data Not Found';
      }
  }

  categorySearch(category) {
    this.clearSearch('category');
    if( this.sellersService.SearchByCategory(category).length != 0)
      {
        this.sellers = this.sellersService.SearchByCategory(category);
      }
      else
      {
        this.sellers = this.sellersService.SearchByCategory(category);
        this.message = 'Data Not Found';
      }
  }

  emailSearch(email) {
    this.clearSearch('email');
    if( this.sellersService.SearchByEmail(email).length != 0)
      {
        this.sellers = this.sellersService.SearchByEmail(email);
      }
      else
      {
        this.sellers = this.sellersService.SearchByEmail(email);
        this.message = 'Data Not Found';
      }
  }



}
