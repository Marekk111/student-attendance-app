import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../subject/subject.service';
import { Subject } from '../subject/subject';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../question/question';
import { HttpErrorResponse} from '@angular/common/http';
import { QuestionService } from '../question/question.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit{

  subject: Subject | undefined;
  question: Question | undefined;
  id: any = '0';

  constructor (private subjectService: SubjectService, private questionService: QuestionService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {this.id = params.get('id');})
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





}
