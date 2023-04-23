import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AnswerComponent} from './answer/answer.component';
import {AppComponent} from './app.component';
import {QuestionAdderComponent} from './question-adder/question-adder.component';
import {QuestionComponent} from './question/question.component';
import {QuestionnaireComponent} from './questionnaire/questionnaire.component';
import {SubjectComponent} from './subject/subject.component';
import {LoginComponent} from "./login/login.component";
import {LessonComponent} from "./lesson/lesson.component";
import {ErrorComponent} from "./error/error.component";
import {ChartComponent} from "./chart/chart.component";
import {AnswerHistoryComponent} from "./answer-history/answer-history.component";

const routes: Routes = [
  //{path: '', component: AppComponent},
  {path: 'questions', component: QuestionComponent},
  {path: 'questions/:id', component: AnswerComponent},
  {path: 'subjects', component: SubjectComponent},
  {path: 'subjects/:subjectId/lessons', component: LessonComponent},
  {path: 'subjects/:subjectId/lessons/:lessonId', component: QuestionnaireComponent},
  {path: 'subjects/:subjectId/lessons/:lessonId/setQuestion', component: QuestionAdderComponent},
  {path: 'login', component: LoginComponent},
  {path: 'error', component: ErrorComponent},
  {path: 'subjects/:subjectId/lessons/:lessonId/:questionId/chart', component: ChartComponent},
  {path: 'subjects/:subjectId/lessons/:lessonId/:questionId', component: AnswerHistoryComponent},
  {path: '**', redirectTo: '/login'}

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
