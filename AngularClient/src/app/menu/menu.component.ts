import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public isUserAuthenticated: boolean;
  public isExternalAuth: boolean;



  constructor(private authService: AuthenticationService, private router: Router, private socialAuthService: SocialAuthService) {
    this.authService.authChanged
      .subscribe(res => {
        this.isUserAuthenticated = res;
      });
    this.socialAuthService.authState.subscribe(user => {
      this.isExternalAuth = user != null;
    });
  }

  ngOnInit(): void {
    this.authService.authChanged
    .subscribe(res => {
      this.isUserAuthenticated = res;
    });
  }
  public logout = () => {
    this.authService.logout();

    if (this.isExternalAuth){
        this.authService.signOutExternal();
    }

    this.router.navigate(['/']);
  }

}
