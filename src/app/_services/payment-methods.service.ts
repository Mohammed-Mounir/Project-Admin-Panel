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
  baseUrl: string =
    'https://iti-amzon-backend.herokuapp.com/api/payment-methods';

  getAllPaymentMethods(): Observable<{
    message: string;
    paymenMethods: PaymentMethod[];
  }> {
    return this.http.get<{ message: string; paymenMethods: PaymentMethod[] }>(
      this.baseUrl
    );
  }

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
}
