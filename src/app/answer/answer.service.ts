import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Answer} from './answer';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAnswer(): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.apiServerUrl}/answer/all`);
  }

  public addAnswer(answer : Answer): Observable<Answer> {
    return this.http.post<Answer>(`${this.apiServerUrl}/answer/add`, answer);
  }

  public updateAnswer(answer : Answer): Observable<Answer> {
    return this.http.put<Answer>(`${this.apiServerUrl}/answer/update`, answer);
  }

  public deleteAnswer(id? : number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/answer/delete/${id}`);
  }

  public getAnswersByQuestionAndLesson(questionId: number, lessonId: number): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.apiServerUrl}/answer/find/${lessonId}/${questionId}`);
  }
}
