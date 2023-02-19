import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from './question';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
  
  public getQuestion(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiServerUrl}/question/all`);
  } 

  public addQuestion(question : Question): Observable<Question> {
    return this.http.post<Question>(`${this.apiServerUrl}/question/add`, question);
  } 

  public updateQuestion(question : Question): Observable<Question> {
    return this.http.put<Question>(`${this.apiServerUrl}/question/update`, question);
  }

  public deleteQuestion(id? : number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/question/delete/${id}`);
  }
}
