import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { ErrorHandlerService } from './shared/services/error-handler.service';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './shared/guards/auth.guard';
import { PrivacyComponent } from './privacy/privacy.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    NotFoundComponent,
    PrivacyComponent,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot([
    { path: 'home', component: HomeComponent },
    { path: 'company', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule), canActivate: [AuthGuard] },
    { path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
    { path: 'privacy', component: PrivacyComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: 'privacy', component: PrivacyComponent },
    { path: '404', component: NotFoundComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/404', pathMatch: 'full' }
    ], { relativeLinkResolution: 'legacy' }),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'),
        allowedDomains:  ['localhost:5001'],
        disallowedRoutes: []
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerService, multi: true },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '766042399636-elblcf74dgnul28r1m380ae7tpjs3vlp.apps.googleusercontent.com'
            )
          },
        ],
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
