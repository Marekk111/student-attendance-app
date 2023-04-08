import {Component} from '@angular/core';
import {Lesson} from "./lesson";
import {LessonService} from "./lesson.service";
import {Subject} from "../subject/subject";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {SubjectService} from "../subject/subject.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent {
  lessons: Lesson[] | undefined;

  subject: Subject | undefined;

  deleteLesson: Lesson | undefined;

  subjectId: any = '0';
  constructor(private subjectService: SubjectService, private lessonService: LessonService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {this.subjectId = params.get('subjectId');})
  }

  ngOnInit() {
    //console.log(this.subjectId);
    this.getLessons(this.subjectId);
    this.getSubject(this.subjectId);
    console.log(this.subject);
  }

  public getSubject(id: number) {
    this.subjectService.findSubjectById(id).subscribe(
      (response: Subject) => {
        this.subject = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getLessons(id: number) {
    console.log(this.subjectId)
    this.subjectService.getSubjectLessons(id).subscribe(
      (response: Lesson[]) => {
        this.lessons = response;
        //console.log(this.subjectId);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddLesson(addForm: NgForm): void{
    document.getElementById("add-lesson-form")?.click();
    console.log(addForm.value);
    this.lessonService.addLesson(addForm.value).subscribe(
      (response: Lesson) => {
        console.log(response);
        this.getLessons(this.subjectId);
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onDeleteLesson(id?: number): void {
    this.lessonService.deleteLesson(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getLessons(this.subjectId);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(mode: string, lesson?: Lesson): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addLessonModal');
    }
    else if (mode === 'delete') {
      this.deleteLesson = lesson;
      button.setAttribute('data-target', '#deleteLessonModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
