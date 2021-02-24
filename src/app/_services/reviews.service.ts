import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../_model/reviews';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  reviews: Review[] = [];
  baseUrl: string = 'http://localhost:3000/api/reviews';

  constructor(private http: HttpClient) {}

  getAllReviews(): Observable<{
    message: string;
    reviews: Review[];
  }> {
    return this.http.get<{ message: string; reviews: Review[] }>(this.baseUrl);
  }

  deleteReview(_id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(this.baseUrl + `/${_id}`);
  }
}
