import { Injectable } from '@angular/core';
import { PaymentMethod } from '../_model/payment-methods';

@Injectable({
  providedIn: 'root',
})
export class PaymentMethodsService {
  paymentMethods: PaymentMethod[] = [
    {
      id: 1,
      paymentMethod: 'Debit Card',
      cardCompany: 'MasterCard',
    },

    {
      id: 2,
      paymentMethod: 'Credit Card',
      cardCompany: 'MasterCard',
    },
    {
      id: 3,
      paymentMethod: 'Debit Card',
      cardCompany: 'Visa',
    },

    {
      id: 4,
      paymentMethod: 'Credit Card',
      cardCompany: 'Visa',
    },

    {
      id: 5,
      paymentMethod: 'Paypal',
    },

    {
      id: 6,
      paymentMethod: 'Cash On Delivery',
    },
  ];

  getAllPaymentMethods(): PaymentMethod[] {
    return this.paymentMethods.slice();
  }

  getPaymentMethodById(id: number): PaymentMethod {
    return this.paymentMethods.find((p) => p.id === id);
  }

  addPaymentMethod(paymentMethod: PaymentMethod) {
    const newPaymentMethod: PaymentMethod = {
      id: paymentMethod.id,
      paymentMethod: paymentMethod.paymentMethod,
      cardCompany: paymentMethod.cardCompany,
    };
    this.paymentMethods.push(newPaymentMethod);
  }

  updateReview(paymentMethod: PaymentMethod) {
    const index = this.paymentMethods.findIndex(
      (p) => p.id === paymentMethod.id
    );

    this.paymentMethods[index] = {
      paymentMethod: paymentMethod.paymentMethod,
      cardCompany: paymentMethod.cardCompany,
    };
  }

  deleteReview(id: number) {
    const index = this.paymentMethods.findIndex((p) => p.id === id);
    this.paymentMethods.splice(index, 1);
  }
}
