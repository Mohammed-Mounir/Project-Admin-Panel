import { Component, OnInit } from '@angular/core';
import { SellersService } from 'src/app/_services/sellers.service';

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.scss']
})
export class SellersComponent implements OnInit {
  sellers: any = [];
  message = 'Loading ...';
  input =['id' ,'name' ,'category' ,'email' ];
  numOfPages: number[] = [];
  pageSize = 30;
  currentPage = 0;
  lastPage = 0;
  constructor(private sellersService: SellersService) { }

  ngOnInit(): void {
    this.sellersService.getAllSellers().subscribe(
      (res:any)=>{
        this.sellers = res;
        this.lastPage = this.sellers.length / this.pageSize;
        this.calculateNumOfPages();
      },
      (err)=>{console.error(err)},
      ()=>{}
    );
  }
  getSlicedArrayOfSellers() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    return this.sellers.slice(start, end);
  }
  calculateNumOfPages() {
    this.numOfPages = [];
    for (let index = 0; index < this.sellers.length / this.pageSize; index++) {
      this.numOfPages.push(index + 1);
    }
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
    this.sellersService.getAllSellers().subscribe(
      (res) => {
        if(res){
          this.sellers = res;
          this.sellers=this.sellersService.searchById(res,id)
        }else{
          this.message = 'Data Not Found';
        }
      },
      (err) => {console.log(err);},
      () => {()=>this.clearSearch('name'); },
    )
  }
  
  nameSearch(name) {
    this.sellersService.getAllSellers().subscribe(
      (res) => {
        if(res){
          this.sellers = res;
          this.sellers=this.sellersService.SearchByName(res,name)
        }else{
          this.message = 'Data Not Found';
        }
      },
      (err) => {console.log(err);},
      () => {()=>this.clearSearch('name'); },
    )
  }

  categorySearch(category) {
    this.sellersService.getAllSellers().subscribe(
      (res) => {
        if(res){
          this.sellers = res;
          this.sellers=this.sellersService.SearchByCategory(res,category)
        }else{
          this.message = 'Data Not Found';
        }
      },
      (err) => {console.log(err);},
      () => {()=>this.clearSearch('name'); },
    )
  }

  emailSearch(email) {
    this.sellersService.getAllSellers().subscribe(
      (res) => {
        if(res){
          this.sellers = res;
          this.sellers=this.sellersService.SearchByEmail(res,email)
        }else{
          this.message = 'Data Not Found';
        }
      },
      (err) => {console.log(err);},
      () => {()=>this.clearSearch('name'); },
    )
  }



}
