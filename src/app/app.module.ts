import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HomeComponent } from './Components/home/home.component';
import { QuestionComponent } from './Components/question/question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './Components/users/users.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { QuestiondetailsComponent } from './Components/questiondetails/questiondetails.component';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserQuestionsComponent } from './Components/user-questions/user-questions.component';
import { InterceptorService } from './interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    HomeComponent,
    QuestionComponent,
    UsersComponent,
    SidebarComponent,
    QuestiondetailsComponent,
    UserQuestionsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
    BrowserAnimationsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
