import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from '../app/components/header/header.component';
import { FooterComponent } from '../app/components/footer/footer.component';
import { LoginComponent } from '../app/components/auth/login/login.component';
import { SignupComponent } from '../app/components/auth/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PublicationListComponent } from '../app/components/view/publication/publication.component';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PublicationFormComponent } from '../app/components/publication-form/publication-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommentFormComponent } from '../app/components/publication-comment-form/publication-comment-form.component';
import { HeaderUserLinkComponent } from '../app/components/header-user-link/header-user-link.component';
import { ProfileComponent } from '../app/components/view/profile/profile.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { LikeComponent } from './components/publication-like/publication-like.component';
import { NavbarProfileComponent } from './components/profile-navbar/profile-navbar.component';
import { HeaderProfileComponent } from './components/profile-header/profile-header.component';
import { ThumbmailProfileComponent } from './components/profile-thumbmail/profile-thumbmail.component';
import { ArticleAboutComponent } from './components/profile-about/profile-about.component';
import { UserDescriptionFormComponent } from './components/profile-user-description-form/profile-user-description-form.component';
import { UserDeleteComponent } from './components/profile-user-delete/profile-user-delete.component';
import { SearchBarComponent } from './components/profile-admin-search-bar/profile-admin-search-bar.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ArticleAdminComponent } from './components/profile-admin-interface/profile-admin-interface.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    PublicationListComponent,
    PublicationFormComponent,
    CommentFormComponent,
    HeaderUserLinkComponent,
    ProfileComponent,
    LikeComponent,
    NavbarProfileComponent,
    HeaderProfileComponent,
    ThumbmailProfileComponent,
    ArticleAboutComponent,
    UserDescriptionFormComponent,
    UserDeleteComponent,
    SearchBarComponent,
    ArticleAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule,
    MatDialogModule,
    MatMenuModule,
    MatAutocompleteModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
