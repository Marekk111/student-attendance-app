import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Question} from './question';
import {Answer} from '../answer/answer';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environments';
import {AnswerOption} from "../answer-option/answer-option";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getQuestion(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiServerUrl}/question/all`);
  }

  public findQuestionById(id? : number): Observable<Question> {
    return this.http.get<Question>(`${this.apiServerUrl}/question/find/${id}`);
  }

  public findAllAnswersForQuestion(id? : number): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.apiServerUrl}/question/find/${id}/answers`);
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

  public findAllOptions(id: number): Observable<AnswerOption[]> {
    return this.http.get<AnswerOption[]>(`${this.apiServerUrl}/question/find/${id}/options`)
  }
}
