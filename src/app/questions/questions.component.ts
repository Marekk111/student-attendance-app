import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Question } from '../question';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-root',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionComponent implements OnInit{
  public questions: Question[] | undefined;
  public editQuestion: Question | undefined;
  public deleteQuestion: Question | undefined;
  constructor(private questionService: QuestionService) {}

  ngOnInit() {
    this.getQuestions();
  }

  public getQuestions(){
    this.questionService.getQuestion().subscribe(
      (response: Question[]) => {
        this.questions = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddQuestion(addForm: NgForm): void{
    document.getElementById("add-question-form")?.click();
    this.questionService.addQuestion(addForm.value).subscribe(
      (response: Question) => {
        console.log(response);
        this.getQuestions();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateQuestion(question: Question): void{
    this.questionService.updateQuestion(question).subscribe(
      (response: Question) => {
        console.log(response);
        this.getQuestions();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteQuestion(id?: number): void {
    this.questionService.deleteQuestion(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getQuestions();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(mode: string, question?: Question): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addQuestionModal');
    }
    else if (mode === 'edit') {
      this.editQuestion = question;
      button.setAttribute('data-target', '#editQuestionModal');
    }
    else if (mode === 'delete') {
      this.deleteQuestion = question;
      button.setAttribute('data-target', '#deleteQuestionModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
