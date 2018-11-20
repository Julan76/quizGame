import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user/user.service";
import {AppUser} from "../../domain/AppUser";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication/authentication.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  appUser: AppUser ;
  private subscription;
  isAdmin: boolean=false;

  constructor(private userService: UserService,private router: Router) { }

  ngOnInit() {
    this.subscription = this.userService.theUser$.subscribe(
      user => {
        this.appUser= user;
        this.isAdmin=this.userService.isAdmin(user);
      }
    )
  }
  redirectToLogin() {
    this.router.navigate(['/login'])
  }
  logout(){
    this.userService.logout();
    this.appUser=null;
    this.isAdmin=false;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
