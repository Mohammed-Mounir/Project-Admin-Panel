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
      img:
        'https://seeklogo.com/images/M/MasterCard-logo-4C5D228602-seeklogo.com.png',
    },

    {
      id: 2,
      paymentMethod: 'Credit Card',
      cardCompany: 'MasterCard',
      img:
        'https://seeklogo.com/images/M/MasterCard-logo-4C5D228602-seeklogo.com.png',
    },
    {
      id: 3,
      paymentMethod: 'Debit Card',
      cardCompany: 'Visa',
      img:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Visa_2014_logo_detail.svg/1280px-Visa_2014_logo_detail.svg.png',
    },

    {
      id: 4,
      paymentMethod: 'Credit Card',
      cardCompany: 'Visa',
      img:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Visa_2014_logo_detail.svg/1280px-Visa_2014_logo_detail.svg.png',
    },

    {
      id: 5,
      paymentMethod: 'Paypal',
      img:
        'https://newsroom.mastercard.com/wp-content/uploads/2016/09/paypal-logo.png',
    },

    {
      id: 6,
      paymentMethod: 'Cash On Delivery',
      img:
        'https://scentfie.com/wp-content/uploads/2017/11/Cash-On-Delivery-Logo.jpg',
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
