import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Employee } from './Employee';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiURL = environment.apiURL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL + 'api/employees')
    .pipe(
      catchError(this.errorHandler)
    )
  }
     
  create(post: Employee) {
    return this.httpClient.post(this.apiURL + 'api/employees/add', JSON.stringify(post), this.httpOptions)
    .pipe(catchError(this.errorHandler))
  }  
     
  find(id: string): Observable<any> {
    return this.httpClient.get(this.apiURL + 'api/employees/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
     
  update(id: string, post: Employee): Observable<any> {
    return this.httpClient.patch(this.apiURL + 'api/employees/' + id, JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
     
  delete(id: string): Observable<any> {
    return this.httpClient.delete(this.apiURL + 'api/employees/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
    
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
