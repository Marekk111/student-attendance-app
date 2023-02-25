import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnswerComponent } from './answer/answer.component';
import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'questions', component: QuestionComponent},
  {path: 'questions/:id', component: AnswerComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
