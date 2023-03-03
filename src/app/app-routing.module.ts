import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnswerComponent } from './answer/answer.component';
import { AppComponent } from './app.component';
import { QuestionAdderComponent } from './question-adder/question-adder.component';
import { QuestionComponent } from './question/question.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { SubjectComponent } from './subject/subject.component';

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'questions', component: QuestionComponent},
  {path: 'questions/:id', component: AnswerComponent},
  {path: 'subjects', component: SubjectComponent},
  {path: 'subjects/:id', component: QuestionnaireComponent},
  {path: 'subjects/:id/setQuestion', component: QuestionAdderComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
