  import { Injectable } from '@angular/core';
  import { HttpClient,HttpErrorResponse } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { Tarea } from '../models/tarea.model';
  import { catchError } from 'rxjs/operators';
  import { throwError } from 'rxjs';
  import { ErrorHandlerService } from './error-handler-service.service';

  @Injectable({
    providedIn: 'root'
  })
  export class TareasService {
    private apiUrl = 'http://localhost:5067/api/';

    constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) {}

    getTareas(): Observable<Tarea[]> {
      return this.http.get<Tarea[]>(this.apiUrl + 'tareas').pipe(
        catchError(this.handleError.bind(this))
      );
    }

    getTarea(id: number): Observable<Tarea> {
      return this.http.get<Tarea>(this.apiUrl + 'tareas/' + id).pipe(
      catchError(this.handleError.bind(this))
    );
    }
    
    addTarea(tarea: Tarea): Observable<Tarea> {
      return this.http.post<Tarea>(this.apiUrl + 'tareas', tarea).pipe(
      catchError(this.handleError.bind(this))
    );
    }
    
    updateTarea(tarea: Tarea): Observable<Tarea> {
      return this.http.put<Tarea>(this.apiUrl + 'tareas/' + tarea.id, tarea).pipe(
      catchError(this.handleError.bind(this))
    );
    }
    
    deleteTarea(id: number): Observable<void> {
      return this.http.delete<void>(this.apiUrl + 'tareas/' + id).pipe(
      catchError(this.handleError.bind(this))
    );
    }

    
    private handleError(error: HttpErrorResponse) {
      this.errorHandler.handleError(error);
      return throwError(error);
    }
  }