import {environment} from "../../environments/environments";
import {HttpClient} from "@angular/common/http";
import {Question} from "../question/question";
import {Observable} from "rxjs";
import {Answer} from "../answer/answer";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public answerQuestion(lessonId: number, answer : Answer): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/questionnaire/${lessonId}/answerQuestion`, answer);
  }
}
