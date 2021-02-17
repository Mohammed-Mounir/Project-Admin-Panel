import { Component, OnInit } from '@angular/core';
import { Advertisement } from 'src/app/_model/advertisements';
import { AdvertisementsService } from 'src/app/_services/advertisements.service';

@Component({
  selector: 'app-advertisements',
  templateUrl: './advertisements.component.html',
  styleUrls: ['./advertisements.component.scss']
})
export class AdvertisementsComponent implements OnInit {
  advertisements: Advertisement[] = []; 

  constructor(private advertisementsService: AdvertisementsService) { }

  ngOnInit(): void {
    this.advertisements = this.advertisementsService.getAllAds();
    console.log(this.advertisements);

  }

  delete(i) {
    this.advertisements.splice(i, 1);
  }

}
