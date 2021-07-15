import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';
import {  IProducts , Product } from 'src/app/model/products'
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  loading : boolean = false;
  productForm : FormGroup ;
  errorMessage : string;
  imagePreview : string;
  userId : string;
  successMessage : string;

  constructor(private fb : FormBuilder ,
              private userService : UsersService,
              private productService : ProductsService ,
              private router : Router) { }

  ngOnInit(): void
  {
    this.initForm();
    if(this.userService.isAuth)
    {
      this.userId = this.userService.currentUser.idUser;
    }

  }

  initForm()
  {
     this.productForm =  this.fb.group({
      name: this.fb.control('', [ Validators.required]),
      description: this.fb.control('', [ Validators.required, Validators.minLength(5)]),
      price: this.fb.control(0, [ Validators.required]),
      stock: this.fb.control(1, [ Validators.required]),
      image: this.fb.control(null, [ Validators.required]),

    }
    );
  }

  onSubmit()
  {
    this.loading = true ;
    let product   = new Product() ;
    product.name = this.productForm.get('name').value;
    product.description = this.productForm.get('description').value;
    product.price = this.productForm.get('price').value;
    product.stock = this.productForm.get('stock').value;
    product.image = '';
    product.userId = this.userId;

    //envoie de la requette Http
    this.productService.createNewProduct(product,this.productForm.get('image').value)
    .then(
      ()=> {
        this.productForm.reset();
        this.loading = false;
        this.successMessage = "Product created ! ... redirection vers le shop ...." ;
         setTimeout(() => {
        this.router.navigate(['/shop']);
      }, 2000);


      }
     )
    .catch(
      (err) =>
      {
        this.errorMessage = err.massage;
        console.log(err.message);
        this.loading = false;
      }


    )


  }

  onImagePick(event : Event)
  {
    //Charger une image choisi dans le variable file
    const file = (event.target as HTMLInputElement).files[0] ;
    this.productForm.get('image').patchValue(file);
    this.productForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      if(this.productForm.get('image').valid)
      {
        this.imagePreview = reader.result as string;
      }
      else
      {
        this.imagePreview = null ;
      }
    }
    reader.readAsDataURL(file);


  }
}
