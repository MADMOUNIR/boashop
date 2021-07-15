import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/model/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService : UsersService ,
              private fb : FormBuilder ,
              private router :Router ) { }

  loginForm : FormGroup ;
  errorMessage : string;
  successMessage : string;

  ngOnInit(): void
  {
    this.initFormLogin();
  }


  //Init form login
  initFormLogin() : void
 {
   this.loginForm = this.fb.group({
    email : this.fb.control('' ,[ Validators.email  , Validators.required] ) ,
    password : this.fb.control('' , [Validators.minLength(6) ,  Validators.required ]),

   });

 }

 //Submit

onSubmit() : void
{
  const email = this.loginForm.get('email').value ;
  const password = this.loginForm.get('password').value ;
  const newUser : Users  = {email : email , password :password} ;

  //Appel au service d'authent
  this.userService.authentifier(newUser).then(
    (data) => {
      //On vérifie s'il y a des chose dans le panier on redirige vers le checkout, sinon on rederige vers shop
      this.errorMessage = null ;
      this.successMessage = "Login successful ! ... redirection vers le shop ...." ;
      setTimeout(() => {
        this.router.navigate(['/shop']);
      }, 2000);



    }

  ).catch( (error) => {
    this.errorMessage = (error.error.message);
    console.log("erreur d'authentification :"+error);
    console.log(error);
    setTimeout(() => {
      this.errorMessage = null;
    }, 3000);


  }
  );
}


//Verif token on local storage




}
