import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Question} from '../question/question';
import {HttpErrorResponse} from '@angular/common/http';
import {QuestionService} from '../question/question.service';
import {Answer} from '../answer/answer';
import {AnswerService} from '../answer/answer.service';
import {NgForm} from '@angular/forms';
import {AnswerOption} from "../answer-option/answer-option";
import {AnswerOptionService} from "../answer-option/answer-option.service";
import {LessonService} from "../lesson/lesson.service";
import {Lesson} from "../lesson/lesson";
import {QuestionnaireService} from "./questionnaire.service";
import {LoginService} from "../login/login.service";
import {Subject} from "../subject/subject";

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit{

  lesson: Lesson = <Lesson>{};
  question: Question | undefined;

  subjectId: any = '0';
  lessonId: any = '0';
  answer: Answer | undefined;
  answerUser: string;

  dateNow: Date = new Date();
  answerOptions: AnswerOption[] | undefined;

  constructor (public loginService: LoginService, private lessonService : LessonService, private questionService: QuestionService, private questionnaireService: QuestionnaireService,private answerService: AnswerService, private answerOptionService: AnswerOptionService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.subjectId = params.get('subjectId');
      this.lessonId = params.get('lessonId');
    });
    this.getLesson(this.lessonId);
    this.answerUser = localStorage.getItem('answerUser') || "";
  }

  ngOnInit(): void {
    this.getLesson(this.lessonId);

  }

  public getLesson(id: number){
    this.lessonService.findLesson(id).subscribe(
      (response: Lesson) => {
        this.lesson = response;
        this.getQuestion(this.lessonId);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getAnswerOptions(id: number){
    if (this.question?.questionType === 'MULTIPLECHOICE') {
      this.questionService.findAllOptions(this.question.id).subscribe(
        (response: AnswerOption[]) => {
          this.answerOptions = response;
          console.log(response);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }
  }


  public getQuestion(id: number){
    this.lessonService.getQuestion(id).subscribe(
        (response: Question) => {
            this.question = response;
            console.log(response);
            this.getAnswerOptions(id);
        },
        (error: HttpErrorResponse) => {
            alert(error.message);
        }
    );
  }

  public onAddAnswer(addForm: NgForm): void{
    document.getElementById("add-answer-form")?.click();
    this.questionnaireService.answerQuestion(this.lessonId, addForm.value).subscribe(
      (response: Answer) => {
        this.answer = response;
        localStorage.setItem('answerUser', this.answer.answeredByUser);
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        alert("Question is not answerable!");
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
