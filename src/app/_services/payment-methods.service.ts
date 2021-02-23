import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentMethod } from '../_model/payment-methods';

@Injectable({
  providedIn: 'root',
})
export class PaymentMethodsService {
  constructor(private http: HttpClient) {}
  paymentMethods: PaymentMethod[] = [];
  baseUrl: string = 'http://localhost:3000/api/payment-methods';

  getAllPaymentMethods(): Observable<{
    message: string;
    paymenMethods: PaymentMethod[];
  }> {
    return this.http.get<{ message: string; paymenMethods: PaymentMethod[] }>(
      this.baseUrl
    );
  }

  // getPaymentMethodById(id: number): PaymentMethod {
  //   return this.paymentMethods.find((p) => p.id === id);
  // }

  addPaymentMethod(
    paymentMethod: PaymentMethod
  ): Observable<{ message: string; _id: string }> {
    const newPaymentMethod: PaymentMethod = {
      paymentMethodType: paymentMethod.paymentMethodType,
      img: paymentMethod.img,
    };
    return this.http.post<{ message: string; _id: string }>(
      this.baseUrl,
      newPaymentMethod
    );
  }

  updatePaymentMethod(
    _id: string,
    paymentMethod: PaymentMethod
  ): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(
      this.baseUrl + `/${_id}`,
      paymentMethod
    );
  }

  deletePaymentMethod(_id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(this.baseUrl + `/${_id}`);
  }

  // updateReview(paymentMethod: PaymentMethod) {
  //   const index = this.paymentMethods.findIndex(
  //     (p) => p.id === paymentMethod.id
  //   );

  //   this.paymentMethods[index] = {
  //     paymentMethod: paymentMethod.paymentMethod,
  //     cardCompany: paymentMethod.cardCompany,
  //   };
  // }

  // deleteReview(id: number) {
  //   const index = this.paymentMethods.findIndex((p) => p.id === id);
  //   this.paymentMethods.splice(index, 1);
  // }
}
