import {environment} from "../../environments/environments";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AnswerOption} from "./answer-option";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class AnswerOptionService {
private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAnswerOption(): Observable<AnswerOption[]> {
    return this.http.get<AnswerOption[]>(`${this.apiServerUrl}/option/all`);
  }

  public findAnswerOptionById(id? : number): Observable<AnswerOption> {
    return this.http.get<AnswerOption>(`${this.apiServerUrl}/option/find/${id}`);
  }

  public addAnswerOption(option : AnswerOption): Observable<AnswerOption> {
    return this.http.post<AnswerOption>(`${this.apiServerUrl}/option/add`,option);
  }

  public deleteAnswerOption(id? : number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/option/delete/${id}`);
  }
}
