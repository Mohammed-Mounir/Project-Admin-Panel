import { Component, OnInit } from '@angular/core';
import anychart from 'anychart/index';
import { OrderService } from 'src/app/_services/order.service';
import { ProductService } from 'src/app/_services/product.service';
import { SellersService } from 'src/app/_services/sellers.service';
import { UsersService } from 'src/app/_services/users.service';
@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss'],
})
export class DashBoardComponent implements OnInit {
  orders;
  users;
  sellers;
  products;
  month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  constructor(
    private orderService: OrderService,
    private userService: UsersService,
    private sellerService: SellersService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(
      (res) => {
        this.orders = res;
        let pending = 0,
          completed = 0,
          cancelled = 0,
          value;
        for (let order of this.orders) {
          if (order.orderStatus === 'Pending') {
            pending++;
          } else if (order.orderStatus === 'Completed') {
            completed++;
          } else if (order.orderStatus === 'Cancelled') {
            cancelled++;
          }
        }
        value = [
          { x: 'Pending', value: pending, fill: '#007eb9' },
          { x: 'Completed', value: completed, fill: '#24964e' },
          { x: 'Cancelled', value: cancelled, fill: '#c6382f' },
        ];
        this.chart('Orders', value, this.orders.length, 'pie', 'Order Status');
      },
      (err) => {
        console.error(err);
      },
      () => {}
    );
    this.userService.getAllUsers().subscribe(
      (res) => {
        this.users = res;
        let child = 0,
          baby = 0,
          adult = 0,
          old = 0,
          value;
        for (let user of this.users) {
          if (user.age >= 15 && user.age < 25) {
            child++;
          } else if (user.age >= 25 && user.age < 40) {
            adult++;
          } else if (user.age < 15) {
            baby++;
          } else if (user.age > 40) {
            old++;
          }
        }
        value = [
          { x: '15-', value: baby, fill: '#48a3c6', stroke: 'white' },
          { x: '15-24', value: child, fill: '#ff9900', stroke: 'white' },
          { x: '25-39', value: adult, fill: '#24964e', stroke: 'white' },
          { x: '40+', value: baby, fill: '#c6382f', stroke: 'white' },
        ];
        this.chart(
          'Users',
          value,
          this.users.length,
          'column',
          "Average of user's Age"
        );
      },
      (err) => {
        console.error(err);
      },
      () => {}
    );
    this.sellerService.getAllSellers().subscribe(
      (res) => {
        this.sellers = res;
        let years,
          arrYears = [],
          counts = {};
        for (let seller of this.sellers) {
          let date = new Date(seller.dateOfRegister);
          let y = date.getFullYear();
          arrYears.push(y);
        }
        arrYears.forEach(function (x) {
          counts[x] = (counts[x] || 0) + 1;
        });
        years = [
          {
            x: '2017',
            value: counts['2017'],
            fill: '#24964e',
            stroke: 'white',
          },
          {
            x: '2018',
            value: counts['2018'],
            fill: '#24964e',
            stroke: 'white',
          },
          {
            x: '2019',
            value: counts['2019'],
            fill: '#24964e',
            stroke: 'white',
          },
          {
            x: '2020',
            value: counts['2020'],
            fill: '#24964e',
            stroke: 'white',
          },
          {
            x: '2021',
            value: counts['2021'],
            fill: '#24964e',
            stroke: 'white',
          },
        ];

        this.chart(
          'Sellers',
          years,
          this.sellers.length,
          'column',
          "Seller's year of register"
        );
      },
      (err) => {
        console.error(err);
      },
      () => {}
    );
    this.productService.getAllProducts().subscribe(
      (res) => {
        this.products = res;
        let one = 0,
          two = 0,
          three = 0,
          four = 0,
          five = 0,
          value;
        for (let product of this.products) {
          if (
            product.productPrice.finalPrice >= 1000 &&
            product.productPrice.finalPrice < 5000
          ) {
            two++;
          } else if (
            product.productPrice.finalPrice >= 5000 &&
            product.productPrice.finalPrice < 10000
          ) {
            three++;
          } else if (product.productPrice.finalPrice < 1000) {
            one++;
          } else if (
            product.productPrice.finalPrice >= 10000 &&
            product.productPrice.finalPrice < 20000
          ) {
            four++;
          } else if (product.productPrice.finalPrice >= 20000) {
            five++;
          }
        }
        value = [
          { x: '1000-', value: one, fill: '#48a3c6' },
          { x: '1000-5000', value: two, fill: '#48a3c6' },
          { x: '5000-10000', value: three, fill: '#48a3c6' },
          { x: '10000-20000', value: four, fill: '#48a3c6' },
          { x: '20000+', value: five, fill: '#48a3c6' },
        ];

        this.chart(
          'Products',
          value,
          this.products.length,
          'line',
          "Product's Price"
        );
      },
      (err) => {
        console.error(err);
      },
      () => {}
    );
  }
  chart(name, value, total, type, title) {
    var data = [...value];

    // create a chart and set the data
    var chart = anychart[type](data);

    // set the chart title
    chart.title(`${title} , Total ${name} : ${total}`);
    // set the container id
    chart.container(name);
    if (type !== 'pie') {
      chart.xAxis().labels().fontSize(9);
      chart.yAxis().labels().fontSize(9);
    } else {
      chart.labels().fontSize(9);
    }
    chart.background().fill('#EBECF0');
    chart.background().stroke('1 black');
    // initiate drawing the chart
    chart.draw();
  }
}
