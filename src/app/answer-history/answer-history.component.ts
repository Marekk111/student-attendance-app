import {Component, OnInit} from '@angular/core';
import {AnswerService} from "../answer/answer.service";
import {LessonService} from "../lesson/lesson.service";
import {ActivatedRoute} from "@angular/router";
import {Question} from "../question/question";
import {HttpErrorResponse} from "@angular/common/http";
import {QuestionService} from "../question/question.service";
import {group} from "@angular/animations";
import {Answer} from "../answer/answer";

@Component({
  selector: 'app-answer-history',
  templateUrl: './answer-history.component.html',
  styleUrls: ['./answer-history.component.css']
})
export class AnswerHistoryComponent implements OnInit{

  questionId: any = '';
  lessonId: any = '';

  previousQuestions: Question[] = [];

  question: Question | undefined;

  constructor(private answerService: AnswerService, private questionService: QuestionService, private lessonService: LessonService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.lessonId = params.get('lessonId');
      this.questionId = params.get('questionId');
    });
  }
  ngOnInit(): void {
    this.getQuestionsByLesson(this.lessonId);
    //this.getQuestion(this.questionId);
    //this.getAnswersByLesson(this.questionId, this.groupName);
  }

  public getQuestion(id?: number){
    this.questionService.findQuestionById(id).subscribe(
      (response: Question) => {
        this.question = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  public getQuestionsByLesson(lessonId: number) {
    this.lessonService.getPreviousQuestions(lessonId).subscribe(
      (response : Question[]) => {
        this.previousQuestions = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }


  /*public getAnswersByLesson(questionId: number, lessonId: number) {
    this.answerService.getAnswersByLesson(questionId, groupName).subscribe(
      (response: Answer[]) => {
        this.answers = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }*/
}
