import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {QuestionService} from '../question/question.service';
import {Question} from '../question/question';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {LessonService} from "../lesson/lesson.service";
import {Lesson} from "../lesson/lesson";

@Component({
  selector: 'app-question-adder',
  templateUrl: './question-adder.component.html',
  styleUrls: ['./question-adder.component.css']
})
export class QuestionAdderComponent implements OnInit{

  questions: Question[] | undefined;
  lesson: Lesson | undefined;
  lessonId: any = '0';
  subjectId: any = '0';

  constructor(private lessonService: LessonService, private questionService: QuestionService, private route: ActivatedRoute){
    this.route.paramMap.subscribe(params => {
      this.subjectId = params.get('subjectId');
      this.lessonId = params.get('lessonId');
    })
  }

  ngOnInit() {
    this.getLesson(this.lessonId);
    this.getQuestions();
  }

  @Output() childToParent = new EventEmitter<Question>();

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

  public getLesson(id: number){
    this.lessonService.findLesson(id).subscribe(
      (response: Lesson) => {
        this.lesson = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public setQuestionForLesson(question: Question){
    console.log(this.lessonId);
    console.log(this.subjectId);
    console.log(question.name);
    this.lessonService.addQuestion(this.lessonId, question).subscribe(
      (response: Lesson) => {
        this.lesson = response;
        localStorage.setItem('answerUser', '');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

}
