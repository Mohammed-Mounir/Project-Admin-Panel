import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/_model/reviews';
import { ReviewsService } from 'src/app/_services/reviews.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
  reviews: Review[] = [];
  reviewsCopy: Review[] = [];

  numOfPages: number[] = [];
  pageSize = 30;
  currentPage = 0;
  lastPage = 0;

  constructor(private reviewsService: ReviewsService) {}

  ngOnInit(): void {
    this.reviewsService.getAllReviews().subscribe({
      next: (responseData: any) => {
        this.reviews = responseData.reviews;
        this.reviewsCopy = responseData.reviews;
        this.currentPage = 0;
        this.lastPage = this.reviews.length / this.pageSize;
        this.calculateNumOfPages();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onDelete(_id: string) {
    console.log(_id);
    this.reviewsService.deleteReview(_id).subscribe({
      next: (res: any) => {
        console.log(res.message);
        this.reviews = this.reviews.filter((r) => {
          return r._id !== _id;
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getSlicedArrOfReviews() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    return this.reviews.slice(start, end);
  }

  calculateNumOfPages() {
    this.numOfPages = [];
    for (let index = 0; index < this.reviews.length / this.pageSize; index++) {
      this.numOfPages.push(index + 1);
    }
    if(this.numOfPages.length===0){
      this.numOfPages.push(0)
    }
  }

  onSearch(searchInput) {
    this.currentPage = 0;
    this.reviews = this.reviewsCopy.slice();

    if (searchInput.name === 'reviewerId') {
      this.reviews = this.reviews.filter((r) =>
        r.reviewerID.toLowerCase().includes(searchInput.value.toLowerCase())
      );
    } else if (searchInput.name === 'reviewerName') {
      this.reviews = this.reviews.filter((r) =>
        r.reviewerName.toLowerCase().includes(searchInput.value.toLowerCase())
      );
    } else if (searchInput.name === 'reviewerVote') {
      this.reviews = this.reviews.filter((r) =>
        r.reviewVote.toString().includes(searchInput.value)
      );
    } else if (searchInput.name === 'productId') {
      this.reviews = this.reviews.filter((r) =>
        r.productID.toLowerCase().includes(searchInput.value.toLowerCase())
      );
    }

    this.calculateNumOfPages();
  }
}
