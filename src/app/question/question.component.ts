import {Component, OnInit} from '@angular/core';
import {Question} from './question';
import {QuestionService} from './question.service';
import {HttpErrorResponse} from '@angular/common/http'
import {NgForm} from '@angular/forms';
import {QuestionType} from "./questionType";
import {AnswerOptionService} from "../answer-option/answer-option.service";
import {AnswerOption} from "../answer-option/answer-option";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit{
  public questions: Question[] | undefined;
  public editQuestion: Question | undefined;
  public deleteQuestion: Question | undefined;
  public questionToAddOptions: Question | undefined;

  selectedType: QuestionType | undefined;

  questionTypes = Object.values(QuestionType);

  items: { optionBody: string, question: Question | undefined }[] = [];

  constructor(private questionService: QuestionService, private answerOptionService: AnswerOptionService) {
  }

  addItem(question?: Question) {
    this.items.push({
      optionBody: '',
      question: question
    });
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }


  ngOnInit() {
    this.getQuestions();
  }

  onAnswerOptionSubmit(form: NgForm): void {
    console.log(this.items);
    console.log(this.questionToAddOptions);
    for (const answerOption of this.items) {
      console.log(answerOption);
      this.answerOptionService.addAnswerOption(answerOption).subscribe(
        (response: AnswerOption) => {
          console.log(response);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }
  }

  trackByFn(index: number, item: string): number {
    return index; // or item.id if you have an identifier property
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
    console.log(this.selectedType);
    console.log(addForm.value);
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
    else if (mode === 'addOption') {
      this.questionToAddOptions = question;
      button.setAttribute('data-target', '#optionModal')
    }
    container?.appendChild(button);
    button.click();
  }
}
