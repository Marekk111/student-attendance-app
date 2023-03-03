import { Component, OnInit, Output } from '@angular/core';
import { __importDefault } from 'tslib';
import { QuestionService } from '../question/question.service';
import { Question } from '../question/question';
import {HttpErrorResponse} from '@angular/common/http';
import { Subject } from '../subject/subject';
import { SubjectService } from '../subject/subject.service';
import { ActivatedRoute } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question-adder',
  templateUrl: './question-adder.component.html',
  styleUrls: ['./question-adder.component.css']
})
export class QuestionAdderComponent implements OnInit{
  
  questions: Question[] | undefined;
  subject: Subject | undefined;
  id: any = '0';

  constructor(private questionService: QuestionService, private subjectService: SubjectService, private route: ActivatedRoute){
    this.route.paramMap.subscribe(params => {this.id = params.get('id');})
  }

  ngOnInit() {
    this.getSubject(this.id);
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

  public getSubject(id: number){
    this.subjectService.findSubjectById(id).subscribe(
      (response: Subject) => {
        this.subject = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public setQuestionForSubject(question: Question){
    console.log(this.id);
    console.log(question.name);
    this.subjectService.setSubjectQuestion(this.id, question).subscribe(
      (response: Subject) => {
        this.subject = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

}
