import {Component, OnInit} from '@angular/core'
import {Answer} from './answer';
import {AnswerService} from './answer.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Question} from '../question/question';
import {QuestionService} from '../question/question.service';
import {ActivatedRoute} from '@angular/router'

@Component({
    selector: 'app-answer',
    templateUrl: './answer.component.html',
    styleUrls: ['./answer.component.css']
  })

export class AnswerComponent implements OnInit {
    public question: Question | undefined;
    public answers: Answer[] | undefined;
    id: any = '0';
    constructor(private answerService: AnswerService, private questionService: QuestionService, private route: ActivatedRoute) {
        this.route.paramMap.subscribe(params => console.log(params))
        this.route.paramMap.subscribe(params => {this.id = params.get('id');})
    }

    ngOnInit() {
        this.getQuestion(this.id);
        this.getAnswers(this.id);
    }

    public getQuestion(id?: number){
        this.questionService.findQuestionById(id).subscribe(
            (response: Question) => {
                this.question = response;
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }

    public getAnswers(id?: number){
        this.questionService.findAllAnswersForQuestion(id).subscribe(
          (response: Answer[]) => {
            this.answers = response;
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
    }
}
