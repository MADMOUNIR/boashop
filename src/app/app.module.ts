import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { ShopComponent } from './shop/shop/shop.component';
import { SingleProductComponent } from './shop/single-product/single-product.component';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes : Routes = [
{path : 'home' , component : HomeComponent},
{path : 'shop' , component : ShopComponent},
{path : 'single-product/:id' , component : ShopComponent},
{path : 'not-found' , component : NotFoundComponent},
{path : '' , component : HomeComponent},
{path : '**' ,redirectTo : 'not-found', pathMatch: 'full'},

] ;

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    ShopComponent,
    SingleProductComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
