import { Injectable, OnInit } from '@angular/core';
import { Advertisement } from '../_model/advertisements';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class AdvertisementsService {
 
  advertisements;
  baseUrl = 'https://iti-amzon-backend.herokuapp.com/';
  constructor(private httpClient: HttpClient) {}

  getAllAds() {
    return this.httpClient.get(`${this.baseUrl}api/advertisements`);
  }
  getAdById(id) {
    return this.httpClient.get(`${this.baseUrl}api/advertisement/${id}`);
  }

  addAd(advertisement: Advertisement) {
    const newAd: Advertisement = {
      // _id: advertisement._id,
      companyName: advertisement.companyName,
      AdTitle: advertisement.AdTitle,
      AdDescription: advertisement.AdDescription,
      date: advertisement.date,
      websiteUrl: advertisement.websiteUrl,
      img: advertisement.img,
    };

    return this.httpClient.post(`${this.baseUrl}api/advertisement`, newAd);
  }

  updateAd(advertisement: Advertisement) {
    
    const updatedAd: Advertisement = {
      _id: advertisement._id,
      companyName: advertisement.companyName,
      AdTitle: advertisement.AdTitle,
      AdDescription: advertisement.AdDescription,
      date: advertisement.date,
      websiteUrl: advertisement.websiteUrl,
      img: advertisement.img,
    };

    return this.httpClient.post(`${this.baseUrl}api/advertisement`, updatedAd);
  }

  deleteAd(id: string) {

    const idToBeDeleted = id;
    return this.httpClient.delete(
      `${this.baseUrl}api/advertisement/${idToBeDeleted}`
    );
  }

  SearchById(res, searchQuery: string) {
    const advID = searchQuery.toLowerCase();
    this.advertisements = res;
    return this.advertisements.filter((a) =>
      a._id.toLowerCase().includes(advID)
    );
  }

  SearchByName(res, searchQuery: string) {
    const companyNAME = searchQuery.toLowerCase();
    this.advertisements = res;
    return this.advertisements.filter((a) =>
      a.companyName.toLowerCase().includes(companyNAME)
    );
  }

  SearchByTitle(res, searchQuery: string) {
    const advTitle = searchQuery.toLowerCase();
    this.advertisements = res;
    return this.advertisements.filter((a) =>
      a.AdTitle.toLowerCase().includes(advTitle)
    );
  }

  SearchByDate(res, searchQuery: string) {
    const advDate = searchQuery.toLowerCase();
    this.advertisements = res;
    return this.advertisements.filter((a) =>
      a.date.publishedDate.toLowerCase().includes(advDate)
    );
  }
}
