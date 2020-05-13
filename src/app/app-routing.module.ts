import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { QuestionComponent } from './Components/question/question.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { UsersComponent } from './Components/users/users.component';
import { QuestiondetailsComponent } from './Components/questiondetails/questiondetails.component';
import { UserQuestionsComponent } from './Components/user-questions/user-questions.component';


const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'questions/ask', component: QuestionComponent },
  { path: 'questions', component: HomeComponent },
  { path: 'questions/:tag', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'user/:username', component: UserQuestionsComponent },
  { path: 'question/:id/:questiontitle', component: QuestiondetailsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
