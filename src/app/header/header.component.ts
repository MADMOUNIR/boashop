import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() title : string;
  isAuth = false;
  userName : string;

  constructor( private userService : UsersService) { }

  ngOnInit(): void
  {
   this.isAuth = this.userService.isAuth ;
   if(this.isAuth)
   {
    this.userName = this.userService.currentUser.email;
   }

  }


  lougout() : void
  {
    this.userService.logout();
    this.isAuth = this.userService.isAuth;
  }

}
