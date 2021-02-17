import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/_model/reviews';
import { ReviewsService } from 'src/app/_services/reviews.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
  reviews: Review[];

  constructor(private reviewsService: ReviewsService) {}

  ngOnInit(): void {
    this.reviews = this.reviewsService.getAllReviews();
    console.log(this.reviews);
  }
} 
