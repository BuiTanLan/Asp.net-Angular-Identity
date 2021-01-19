import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { UserForAuthenticationDto } from 'src/app/_interfaces/userForAuthenticationDto.model';
import { SocialUser } from 'angularx-social-login';
import { ExternalAuthDto } from 'src/app/_interfaces/externalAuthDto.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public errorMessage = '';
  public showError: boolean;
  private returnUrl: string;
  constructor(private authService: AuthenticationService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    const query = 'returnUrl';
    this.returnUrl = this.route.snapshot.queryParams[query] || '/';
  }
  public validateControl = (controlName: string) => {
    return this.loginForm.controls[controlName].invalid && this.loginForm.controls[controlName].touched;
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }
  public loginUser = (loginFormValue) => {
    this.showError = false;
    const login = {... loginFormValue };
    const userForAuth: UserForAuthenticationDto = {
      email: login.username,
      password: login.password,
      clientURI: 'http://localhost:4200/authentication/forgotpassword'

    };
    this.authService.loginUser('api/accounts/login', userForAuth)
    .subscribe((res: any) => {
      if (res.is2StepVerificationRequired) {
        this.router.navigate(['/authentication/twostepverification'],
          { queryParams: { returnUrl: this.returnUrl, provider: res.provider, email: userForAuth.email }});
      }
      else {
        localStorage.setItem('token', res.token);
        this.authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
        this.router.navigate([this.returnUrl]);
      }
    },
    (error) => {
      this.errorMessage = error;
      this.showError = true;
    });
  }
  public externalLogin = () => {
    this.showError = false;
    this.authService.signInWithGoogle()
    .then(res => {
      const user: SocialUser = { ...res };
      console.log(user);
      const externalAuth: ExternalAuthDto = {
        provider: user.provider,
        idToken: user.idToken
      };
      this.validateExternalAuth(externalAuth);
    }, error => console.log(error));
  }

  private validateExternalAuth(externalAuth: ExternalAuthDto) {
    this.authService.externalLogin('api/accounts/externallogin', externalAuth)
      .subscribe(res => {
        localStorage.setItem('token', res.token);
        this.authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.errorMessage = error;
        this.showError = true;
        this.authService.signOutExternal();
      });
  }
}
