import { Component, OnInit } from '@angular/core';
import { Subject } from '../subject/subject';
import { Question } from '../question/question';
import { SubjectService } from '../subject/subject.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-question-adder',
  templateUrl: './question-adder.component.html',
  styleUrls: ['./question-adder.component.css']
})
export class QuestionAdderComponent {
  subjects: Subject[] | undefined;
  question: Question | undefined;
  constructor(private subjectService: SubjectService) {}

  ngOnInit() {
    this.getSubjects();
  }

  public questionToSubject(question: Question) {
    this.question = question;
  }

  public setQuestion(id: number) {
    this.subjectService.setSubjectQuestion(id, this.question);
  }

  public getSubjects() {
    this.subjectService.getSubject().subscribe(
      (response: Subject[]) => {
        this.subjects = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateQuestion(subject: Subject): void{
    this.subjectService.updateSubject(subject).subscribe(
      (response: Subject) => {
        console.log(response);
        this.getSubjects();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}