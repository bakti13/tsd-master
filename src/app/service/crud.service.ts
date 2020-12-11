import {Injectable} from '@angular/core';

import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Employee} from '../model/Employee';

@Injectable({
  providedIn: 'root'
})

export class CrudService {

  // Java/SpringBoot API
  REST_API = 'http://localhost:8888/api/v1';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {
  }

  // Add Employee
  AddEmployee(data: Employee): Observable<any> {
    const API_URL = `${this.REST_API}/add-book`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get all Employee
  GetAllEmployee(): Observable<any> {
    console.log(`SERVICE URL: ${this.REST_API}/all-employee`)
    return this.httpClient.get(`${this.REST_API}/all-employee`);
  }

  // TODO: Get Employee By ID
  // Get single Employee
  GetEmployee(id: any): Observable<Employee> {
    console.log(` SERVICE URL: ${this.REST_API}/get-employee-by-id/${id}`)
    const API_URL = `${this.REST_API}/get-employee-by-id/${id}`;
    return this.httpClient.get(API_URL, {headers: this.httpHeaders})
      .pipe(map((res: any) => {
          return res || {};
        }),
        catchError(this.handleError)
      );
  }

  // TODO : Update Employee
  // Update Employee
  updateEmployee(id: any, data: any): Observable<any> {
    let API_URL = `${this.REST_API}/update-book/${id}`;
    return this.httpClient.put(API_URL, data, {headers: this.httpHeaders})
      .pipe(
        catchError(this.handleError)
      );
  }

  // TODO : Delete Employee By ID
  // Delete Employee
  deleteEmployee(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-book/${id}`;
    return this.httpClient.delete(API_URL, {headers: this.httpHeaders}).pipe(
      catchError(this.handleError)
    );
  }


  // Error handling
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
