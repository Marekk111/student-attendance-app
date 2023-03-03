import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from './subject';
import { Question } from '../question/question';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
    providedIn: 'root'
  })
  export class SubjectService {
  
    private apiServerUrl = environment.apiBaseUrl;
  
    constructor(private http: HttpClient) { }
    
    public getSubject(): Observable<Subject[]> {
      return this.http.get<Subject[]>(`${this.apiServerUrl}/subject/all`);
    }
    
    public findSubjectById(id? : number): Observable<Subject> {
      return this.http.get<Subject>(`${this.apiServerUrl}/subject/find/${id}`);
    }
  
    public addSubject(subject : Subject): Observable<Subject> {
      return this.http.post<Subject>(`${this.apiServerUrl}/subject/add`, subject);
    } 
  
    public updateSubject(subject : Subject): Observable<Subject> {
      return this.http.put<Subject>(`${this.apiServerUrl}/subject/update`, subject);
    }

    public setSubjectQuestion(id: number, question? : Question): Observable<Subject> {
      return this.http.put<Subject>(`${this.apiServerUrl}/subject/find/${id}/setQuestion`, question);
    }
  
    public deleteSubject(id? : number): Observable<void> {
      return this.http.delete<void>(`${this.apiServerUrl}/subject/delete/${id}`);
    }

    public getSubjectQuestion(id: number): Observable<Question> {
      return this.http.get<Question>(`${this.apiServerUrl}/subject/find/${id}/question`);
    }
  }