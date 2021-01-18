import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { TwoFactorDto } from 'src/app/_interfaces/twoFactorDto.model';

@Component({
  selector: 'app-two-step-verification',
  templateUrl: './two-step-verification.component.html',
  styleUrls: ['./two-step-verification.component.css']
})
export class TwoStepVerificationComponent implements OnInit {
  public twoStepForm: FormGroup;
  public showError: boolean;
  public errorMessage: string;
  private provider: string;
  private email: string;
  private returnUrl: string;
  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router) { }
  ngOnInit(): void {
    this.twoStepForm = new FormGroup({
      twoFactorCode: new FormControl('', [Validators.required]),
    });
      // tslint:disable-next-line:align
      this.provider = this.route.snapshot.queryParams['provider'];
      // tslint:disable-next-line:align
      this.email = this.route.snapshot.queryParams['email'];
      // tslint:disable-next-line:align
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
  }
  public validateControl = (controlName: string) => {
    return this.twoStepForm.controls[controlName].invalid && this.twoStepForm.controls[controlName].touched;
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.twoStepForm.controls[controlName].hasError(errorName);
  }
  public loginUser = (twoStepFromValue) => {
    this.showError = false;
    const formValue = { ...twoStepFromValue };
    const twoFactorDto: TwoFactorDto = {
      email: this.email,
      provider: this.provider,
      token: formValue.twoFactorCode
    };
    this.authService.twoStepLogin('api/accounts/twostepverification', twoFactorDto)
    .subscribe(res => {
      localStorage.setItem('token', res.token);
      this.authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
      this.router.navigate([this.returnUrl]);
    },
    error => {
      this.errorMessage = error;
      this.showError = true;
    });
  }
}
