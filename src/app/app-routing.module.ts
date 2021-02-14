import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './additional/page-not-found/page-not-found.component';
import { AdvertisementsComponent } from './manage/advertisements/advertisements.component';
import { CategoriesComponent } from './manage/categories/categories.component';
import { OrdersComponent } from './manage/orders/orders.component';
import { PaymentMethodsComponent } from './manage/payment-methods/payment-methods.component';
import { ProductsComponent } from './manage/products/products.component';
import { ReviewsComponent } from './manage/reviews/reviews.component';
import { SellersComponent } from './manage/sellers/sellers.component';
import { ShipmentsComponent } from './manage/shipments/shipments.component';
import { UsersComponent } from './manage/users/users.component';
import { WarehouseComponent } from './manage/warehouse/warehouse.component';
import { DashBoardComponent } from './overview/dash-board/dash-board.component';

const routes: Routes = [
  { path: '', component: DashBoardComponent },
  { path: 'advertisements', component: AdvertisementsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'payment-methods', component: PaymentMethodsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'reviews', component: ReviewsComponent },
  { path: 'sellers', component: SellersComponent },
  { path: 'shipments', component: ShipmentsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'warehouse', component: WarehouseComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
