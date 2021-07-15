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
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddProductComponent } from './shop/add-product/add-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AuthInterceptor } from './interceptor/auth.interceptor';

const routes : Routes = [
{path : 'home' , component : HomeComponent},
{path : 'shop' , component : ShopComponent},
{path : 'login' , component : LoginComponent},
{path : 'register' , component : RegisterComponent},
{path : 'single-product/:id' , component : ShopComponent},
{path : 'add-product' , component : AddProductComponent},
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
    NotFoundComponent,
    RegisterComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule ,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule ,
    MatProgressSpinnerModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS , useClass : AuthInterceptor , multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
