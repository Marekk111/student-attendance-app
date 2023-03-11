import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../subject/subject.service';
import { Subject } from '../subject/subject';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../question/question';
import { HttpErrorResponse} from '@angular/common/http';
import { QuestionService } from '../question/question.service';
import { Answer } from '../answer/answer';
import { AnswerService } from '../answer/answer.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit{

  subject: Subject | undefined;
  question: Question | undefined;
  id: any = '0';
  answer: Answer | undefined;

  constructor (private subjectService: SubjectService, private questionService: QuestionService,private answerService: AnswerService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {this.id = params.get('id')});
    this.getSubject(this.id);
  }

  ngOnInit(): void {
    this.getSubject(this.id);
  }

  public getSubject(id?: number){
    this.subjectService.findSubjectById(id).subscribe(
      (response: Subject) => {
        this.subject = response;
        this.getQuestion(this.id);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }




  public getQuestion(id: number){
    this.subjectService.getSubjectQuestion(id).subscribe(
        (response: Question) => {
            this.question = response;
        },
        (error: HttpErrorResponse) => {
            alert(error.message);
        }
    );
  }

  public addQuestionToSubject(id: number, question: Question){

    this.subjectService.setSubjectQuestion(id, question).subscribe(
      (response: Subject) => {
        this.subject = response;
        this.getQuestion(this.id);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public answerQuestion(answer: Answer){
    this.answerService.addAnswer(answer);
  }

  public onAddAnswer(addForm: NgForm): void{
    document.getElementById("add-answer-form")?.click();
    this.answerService.addAnswer(addForm.value).subscribe(
      (response: Answer) => {
        this.answer = response;
        console.log(response);
        this.getQuestion(this.id);
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
      button.setAttribute('data-target', '#addAnswerModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
