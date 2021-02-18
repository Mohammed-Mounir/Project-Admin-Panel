import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { SideBarComponent } from './layout/side-bar/side-bar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { DashBoardComponent } from './overview/dash-board/dash-board.component';
import { ProductsComponent } from './manage/products/products.component';
import { SideBarService } from './_services/side-bar.service';
import { PageNotFoundComponent } from './additional/page-not-found/page-not-found.component';
import { AdvertisementsComponent } from './manage/advertisements/advertisements.component';
import { CategoriesComponent } from './manage/categories/categories.component';
import { OrdersComponent } from './manage/orders/orders.component';
import { PaymentMethodsComponent } from './manage/payment-methods/payment-methods.component';
import { ReviewsComponent } from './manage/reviews/reviews.component';
import { SellersComponent } from './manage/sellers/sellers.component';
import { ShipmentsComponent } from './manage/shipments/shipments.component';
import { UsersComponent } from './manage/users/users.component';
import { WarehouseComponent } from './manage/warehouse/warehouse.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideBarComponent,
    FooterComponent,
    DashBoardComponent,
    ProductsComponent,
    PageNotFoundComponent,
    AdvertisementsComponent,
    CategoriesComponent,
    OrdersComponent,
    PaymentMethodsComponent,
    ReviewsComponent,
    SellersComponent,
    ShipmentsComponent,
    UsersComponent,
    WarehouseComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule ], 
  providers: [SideBarService],
  bootstrap: [AppComponent],
})
export class AppModule {}
