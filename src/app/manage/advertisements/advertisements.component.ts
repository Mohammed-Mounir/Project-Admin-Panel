import { Component, OnInit } from '@angular/core';
import { Advertisement } from 'src/app/_model/advertisements';
import { AdvertisementsService } from 'src/app/_services/advertisements.service';

@Component({
  selector: 'app-advertisements',
  templateUrl: './advertisements.component.html',
  styleUrls: ['./advertisements.component.scss']
})
export class AdvertisementsComponent implements OnInit {
  advertisements ; 

  constructor(private advertisementsService: AdvertisementsService) { }

  ngOnInit(): void {
    this.advertisementsService.getAllAds().subscribe(
      (res) => {

        this.advertisements = res;
        // console.log(res);
        console.log('onInit',this.advertisements.length);
        
       },
      (err) => { 
        console.log(err);
        
      },
      () => { },  
    );
    

  }



  delete(i) {

    console.log(this.advertisements[i]._id);
    
    this.advertisements.splice(i, 1);

    // this.advertisementsService.deleteAd(this.advertisements[i]._id);


  }

  idSearch(searchquery) {
    // this.advertisements = this.advertisementsService.getAllAds();
    // console.log(searchquery);
    // this.advertisements = this.advertisementsService.SearchById(searchquery);

    this.advertisementsService.getAllAds().subscribe(
      (res) => {

        this.advertisements = res;
        this.advertisements = this.advertisementsService.SearchById(res, searchquery);
        console.log('onSearchById', this.advertisements);

      },
      (err) => {
        console.log(err);

      },
      () => { },
    );
  
  }

  nameSearch(searchquery) {
    // this.advertisements = this.advertisementsService.getAllAds();
    // console.log(searchquery);
    // this.advertisements = this.advertisementsService.SearchByName(searchquery);
    this.advertisementsService.getAllAds().subscribe(
      (res) => {

        this.advertisements = res;
        this.advertisements = this.advertisementsService.SearchByName(res, searchquery);
        console.log('onSearchByName', this.advertisements);

      },
      (err) => {
        console.log(err);

      },
      () => { },
    );
  }

  titleSearch(searchquery) {
    // this.advertisements = this.advertisementsService.getAllAds();
    // console.log(searchquery);
    // this.advertisements = this.advertisementsService.SearchByTitle(searchquery);
    this.advertisementsService.getAllAds().subscribe(
      (res) => {

        this.advertisements = res;
        this.advertisements = this.advertisementsService.SearchByTitle(res, searchquery);
        console.log('onSearchByTitle', this.advertisements);

      },
      (err) => {
        console.log(err);

      },
      () => { },
    );
  }

  dateSearch(searchquery) {
    // this.advertisements = this.advertisementsService.getAllAds();
    // console.log(searchquery);
    // this.advertisements = this.advertisementsService.SearchByDate(searchquery);

    this.advertisementsService.getAllAds().subscribe(
      (res) => {

        this.advertisements = res;
        this.advertisements = this.advertisementsService.SearchByDate(res, searchquery);
        console.log('onSearchByDate', this.advertisements);

      },
      (err) => {
        console.log(err);

      },
      () => { },
    );
  }

}
