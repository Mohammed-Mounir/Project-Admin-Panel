import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaymentMethod } from 'src/app/_model/payment-methods';
import { PaymentMethodsService } from 'src/app/_services/payment-methods.service';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss'],
})
export class PaymentMethodsComponent implements OnInit {
  paymentMethods: PaymentMethod[] = [];
  paymentMethodsCopy: PaymentMethod[] = [];
  editMode: boolean = false;
  addPaymentMethod: PaymentMethod = {
    _id: '',
    paymentMethodType: '',
    img: '',
  };

  numOfPages: number[] = [];
  pageSize = 9;
  currentPage = 0;
  lastPage = 0;

  constructor(private paymentMethodsService: PaymentMethodsService) {}

  ngOnInit(): void {
    this.paymentMethodsService.getAllPaymentMethods().subscribe({
      next: (responseData: any) => {
        this.paymentMethods = responseData.paymentMethods;
        this.paymentMethodsCopy = responseData.paymentMethods;
        this.currentPage = 0;
        this.lastPage = this.paymentMethods.length / this.pageSize;
        this.calculateNumOfPages();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSubmit(paymentMethodForm: NgForm) {
    const newPaymentMethod: PaymentMethod = Object.assign(
      {},
      this.addPaymentMethod
    );
    if (this.editMode === false) {
      this.paymentMethodsService.addPaymentMethod(newPaymentMethod).subscribe({
        next: (res: any) => {
          console.log(res.message);
          newPaymentMethod._id = res._id;
          this.paymentMethods.push(newPaymentMethod);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.paymentMethodsService
        .updatePaymentMethod(newPaymentMethod._id, newPaymentMethod)
        .subscribe({
          next: (res: any) => {
            console.log(res.message);
            const index = this.paymentMethods.findIndex(
              (p) => p._id === newPaymentMethod._id
            );
            this.paymentMethods[index] = newPaymentMethod;
          },
          error: (err) => {
            console.log(err);
          },
        });
      this.editMode = false;
    }
    paymentMethodForm.reset();
  }

  onEdit(_id: string) {
    const toEdit = this.paymentMethods.find((p) => p._id === _id);
    console.log(toEdit);
    this.addPaymentMethod = { ...toEdit };
    this.editMode = true;
  }
  onCancelEdit(paymentMethodForm: NgForm) {
    this.editMode = false;
    paymentMethodForm.reset();
  }

  onDelete(_id: string, paymentMethodForm: NgForm) {
    this.paymentMethodsService.deletePaymentMethod(_id).subscribe({
      next: (res: any) => {
        console.log(res.message);
        this.paymentMethods = this.paymentMethods.filter((p) => {
          return p._id !== _id;
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
    paymentMethodForm.reset();
    this.editMode = false;
  }

  getSlicedArrOfPaymentMethods() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    return this.paymentMethods.slice(start, end);
  }

  calculateNumOfPages() {
    this.numOfPages = [];
    for (
      let index = 0;
      index < this.paymentMethods.length / this.pageSize;
      index++
    ) {
      this.numOfPages.push(index + 1);
    }
    if(this.numOfPages.length===0){
      this.numOfPages.push(0)
    }
  }

  onSearch(searchInput) {
    this.currentPage = 0;
    this.paymentMethods = this.paymentMethodsCopy.slice();

    if (searchInput.name === 'paymentId') {
      this.paymentMethods = this.paymentMethods.filter((p) =>
        p._id.toLowerCase().includes(searchInput.value.toLowerCase())
      );
    } else if (searchInput.name === 'paymentType') {
      this.paymentMethods = this.paymentMethods.filter((p) =>
        p.paymentMethodType
          .toLowerCase()
          .includes(searchInput.value.toLowerCase())
      );
    }

    this.calculateNumOfPages();
  }
}
