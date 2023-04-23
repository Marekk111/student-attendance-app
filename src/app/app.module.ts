import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {QuestionService} from './question/question.service';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router'
import {AnswerComponent} from './answer/answer.component';
import {QuestionComponent} from './question/question.component';
import {SubjectComponent} from './subject/subject.component';
import {QuestionnaireComponent} from './questionnaire/questionnaire.component';
import {QuestionAdderComponent} from './question-adder/question-adder.component';
import {LoginComponent} from './login/login.component';
import {LessonComponent} from './lesson/lesson.component';
import {MatButtonModule} from "@angular/material/button";
import {Interceptor} from "./login/interceptor";
import {ErrorInterceptor} from "./login/errorInterceptor";
import { ErrorComponent } from './error/error.component';
import { ChartComponent } from './chart/chart.component';
import { NgChartsModule } from 'ng2-charts';
import { AnswerHistoryComponent } from './answer-history/answer-history.component';

@NgModule({
  declarations: [
    AppComponent,
    AnswerComponent,
    QuestionComponent,
    SubjectComponent,
    QuestionnaireComponent,
    QuestionAdderComponent,
    LoginComponent,
    LessonComponent,
    ErrorComponent,
    ChartComponent,
    AnswerHistoryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    MatButtonModule,
    NgChartsModule
  ],
  providers: [QuestionService, {provide: HTTP_INTERCEPTORS,useClass: Interceptor,multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
