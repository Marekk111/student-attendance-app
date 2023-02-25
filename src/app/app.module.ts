import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { QuestionService } from './question/question.service';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule} from '@angular/router'
import { AnswerComponent } from './answer/answer.component';
import { QuestionComponent } from './question/question.component';

@NgModule({
  declarations: [
    AppComponent,
    AnswerComponent,
    QuestionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, FormsModule, AppRoutingModule, RouterModule
  ],
  providers: [QuestionService],
  bootstrap: [AppComponent]
})
export class AppModule { }