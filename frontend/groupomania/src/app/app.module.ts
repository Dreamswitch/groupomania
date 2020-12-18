import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from '../app/components/header/header.component';
import { FooterComponent } from '../app/components/footer/footer.component';
import { LoginComponent } from '../app/components/login/login.component';
import { SignupComponent } from '../app/components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PublicationListComponent } from '../app/components/publication-list/publication-list.component';
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
import { CommentFormComponent } from '../app/components/comment-form/comment-form.component';
import { UserComponent } from '../app/components/user/user.component';
/* import { ProfileComponent } from '../app/components/profile/profile.component'; */
import { ProfileComponent } from '../app/components/view/profile/profile.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { LikeComponent } from './components/like/like.component';
import { NavbarProfileComponent } from './components/view/navbar/navbar-profile.component';
import { HeaderProfileComponent } from './components/view/header/header-profile.component';
import { ThumbmailProfileComponent } from './components/view/thumbmail-profile/thumbmail-profile.component';
import { ArticleAboutComponent } from './components/view/article-about/article-about.component';
import { UserDescriptionFormComponent } from './components/user-description-form/user-description-form.component';
import { UserDeleteComponent } from './components/user-delete/user-delete.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ArticleAdminComponent } from './components/article-admin/article-admin.component';



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
    UserComponent,
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
