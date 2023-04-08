import {Component, OnInit} from '@angular/core';
import {Subject} from './subject';
import {SubjectService} from './subject.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';

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

  public onAddSubject(addForm: NgForm): void{
    document.getElementById("add-subject-form")?.click();
    this.subjectService.addSubject(addForm.value).subscribe(
      (response: Subject) => {
        console.log(response);
        this.getSubjects();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onOpenModal(mode: string, subject?: Subject): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addSubjectModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
