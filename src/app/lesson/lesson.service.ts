import {Injectable} from "@angular/core";
import {environment} from "../../environments/environments";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Question} from "../question/question";
import {Lesson} from "./lesson";

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getLessons(): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${this.apiServerUrl}/lesson/find/all`);
  }

  public findLesson(id: number) : Observable<Lesson> {
    return this.http.get<Lesson>(`${this.apiServerUrl}/lesson/find/${id}`);
  }

  public addLesson(lesson: Lesson) : Observable<Lesson> {
    return this.http.post<Lesson>(`${this.apiServerUrl}/lesson/add`, lesson);
  }


  public deleteLesson(id?: number) : Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/lesson/delete/${id}`);
  }

  public addQuestion(id: number, question: Question) : Observable<Lesson> {
    return this.http.put<Lesson>(`${this.apiServerUrl}/lesson/find/${id}/addQuestion`, question);
  }

  public getQuestion(id: number) : Observable<Question> {
    return this.http.get<Question>(`${this.apiServerUrl}/lesson/find/${id}/question`);
  }
}
