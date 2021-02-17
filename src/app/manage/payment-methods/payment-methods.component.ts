import { Component, OnInit } from '@angular/core';
import { PaymentMethod } from 'src/app/_model/payment-methods';
import { PaymentMethodsService } from 'src/app/_services/payment-methods.service';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss'],
})
export class PaymentMethodsComponent implements OnInit {
  paymentMethods: PaymentMethod[];

  constructor(private paymentMethodsService: PaymentMethodsService) {}

  ngOnInit(): void {
    this.paymentMethods = this.paymentMethodsService.getAllPaymentMethods();
    console.log(this.paymentMethods);
  }

  onDelete(index) {
    this.paymentMethods.splice(index, 1);
  }
}
