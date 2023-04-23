import {Component, OnInit} from '@angular/core';
import {QuestionService} from "../question/question.service";
import {AnswerService} from "../answer/answer.service";
import {Answer} from "../answer/answer";
import {Question} from "../question/question";
import {ActivatedRoute} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import Chart from 'chart.js/auto'
import {waitForAsync} from "@angular/core/testing";
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit{

  answers: Answer[] = [];
  questionId: any;
  lessonId: any;
  answerStrings: string[] = [];
  question: Question | undefined;

  constructor(private questionService: QuestionService, private answerService: AnswerService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.questionId = params.get('questionId');
      this.lessonId = params.get('lessonId');
    });
    this.getQuestion(this.questionId);
    this.getAnswers(this.questionId, this.lessonId)

  }
  ngOnInit(): void {
    //this.getQuestion(this.questionId);
    //this.getAnswers(this.questionId, this.lessonId);

  }

  public getAnswers(questionId: number, lessonId: number) : void {
    this.answerService.getAnswersByQuestionAndLesson(questionId, lessonId).subscribe(
      (response: Answer[]) => {
        this.answers = response;
        this.answerStrings = this.answers.map((answer) => answer.answerBody);
        console.log(this.answerStrings);
        this.createChart();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getQuestion(id: number): void {
    this.questionService.findQuestionById(id).subscribe(
      (response: Question) => {
        this.question = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public createChart() {

    const count: Record<string, number> = {};

    for (const element of this.answerStrings) {
      if (count[element]) {
        count[element] += 1;
      } else {
        count[element] = 1;
      }
    }

    console.log(count);
    //console.log(this.answerStrings);
    new Chart(
        <HTMLCanvasElement>document.getElementById('answers'),
        {
          type: 'pie',
          data: {
            labels: Object.keys(count),
            datasets: [
              {
                label: 'Answer count',
                data: Object.values(count)
              }
            ]
          },
        }
      );
  }


}
