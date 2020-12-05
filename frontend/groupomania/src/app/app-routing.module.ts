import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/* import { SauceListComponent } from './sauce-list/sauce-list.component';
import { SauceFormComponent } from './sauce-form/sauce-form.component';
import { SingleSauceComponent } from './single-sauce/single-sauce.component'; */
import { SignupComponent } from './authentification-view/signup/signup.component';
import { LoginComponent } from './authentification-view/login/login.component';
import { AuthGuard } from './services/auth-guard.service';
import { PublicationListComponent } from './publication-view/publication-list/publication-list.component';

const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'publications',
    component: PublicationListComponent,
    canActivate: [AuthGuard]
  },
  /*   { path: 'sauce/:id', component: SingleSauceComponent, canActivate: [AuthGuard] },
    { path: 'new-sauce', component: SauceFormComponent, canActivate: [AuthGuard] },
    { path: 'modify-sauce/:id', component: SauceFormComponent, canActivate: [AuthGuard] }, */
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'signup'
  },
  {
    path: '**',
    redirectTo: 'signup'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
