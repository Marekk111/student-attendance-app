import { Component, OnInit } from '@angular/core';
import { Subject } from './subject';
import { SubjectService } from './subject.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  subjects: Subject[] | undefined;
  constructor(private subjectService: SubjectService) {}

  ngOnInit() {
    this.getSubjects();
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
