import { Component, OnInit } from '@angular/core';
import { ShipmentsService } from 'src/app/_services/shipments.service';

@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.scss']
})
export class ShipmentsComponent implements OnInit {
  shipments: any = [];
  message = 'Loading ...';
  input =['id' ,'payment' ,'company' ,'date' ];
  numOfPages: number[] = [];
  pageSize = 30;
  currentPage = 0;
  lastPage = 0;
  constructor(private shipmentsService: ShipmentsService) { }

  ngOnInit(): void {
    this.shipmentsService.getAllShipments().subscribe(
      (res:any)=>{
        this.shipments = res;
        this.lastPage = this.shipments.length / this.pageSize;
        this.calculateNumOfPages();
      },
      (err)=>{console.error(err)},
      ()=>{}
    );
  }
  getSlicedArrayOfShipments() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    return this.shipments.slice(start, end);
  }
  calculateNumOfPages() {
    this.numOfPages = [];
    for (let index = 0; index < this.shipments.length / this.pageSize; index++) {
      this.numOfPages.push(index + 1);
    }
    if(this.numOfPages.length===0){
      this.numOfPages.push(0)
    }
  }
  delete(id) {
    this.shipmentsService.deleteShipments(id).subscribe(
      (res)=>{
        this.shipmentsService.getAllShipments().subscribe(
          (res:any)=>{
            this.shipments = res;
            this.calculateNumOfPages();
          },
          (err)=>{console.error(err)},
          ()=>{}
        );
      },
      (err)=>{console.error(err)},
      ()=>{}
    );
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
    this.shipmentsService.getAllShipments().subscribe(
      (res) => {
        if(res){
          this.shipments = res;
          this.shipments=this.shipmentsService.searchById(res,id);
          this.calculateNumOfPages();
        }else{
          this.message = 'Data Not Found';
        }
      },
      (err) => {console.log(err);},
      () => {()=>this.clearSearch('name'); },
    )
  }
  
  paymentSearch(payment) {
    this.shipmentsService.getAllShipments().subscribe(
      (res) => {
        if(res){
          this.shipments = res;
          this.shipments=this.shipmentsService.searchByPayment(res,payment);
          this.calculateNumOfPages();
        }else{
          this.message = 'Data Not Found';
        }
      },
      (err) => {console.log(err);},
      () => {()=>this.clearSearch('name'); },
    )
  }

  companySearch(company) {
    this.shipmentsService.getAllShipments().subscribe(
      (res) => {
        if(res){
          this.shipments = res;
          this.shipments=this.shipmentsService.searchByCompany(res,company);
          this.calculateNumOfPages();
        }else{
          this.message = 'Data Not Found';
        }
      },
      (err) => {console.log(err);},
      () => {()=>this.clearSearch('name'); },
    )
  }

  dateSearch(date) {
    
    this.shipmentsService.getAllShipments().subscribe(
      (res) => {
        if(res){
          this.shipments = res;
          this.shipments=this.shipmentsService.searchByDate(res,date);
          this.calculateNumOfPages();
        }else{
          this.message = 'Data Not Found';
        }
      },
      (err) => {console.log(err);},
      () => {()=>this.clearSearch('name'); },
    )
  }



}
