import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { baseURL } from '../../environments/environment'
import {task} from '../interfaces'

@Injectable({
    providedIn: 'root'
})

export class ToDoListService {
    constructor(private http: HttpClient) {
    }

    getTasksList(limit: number, offset: number): Observable<any> {
        const params = new HttpParams().set('limit', limit).set('offset', offset)
        return this.http.get(baseURL, { params: params }).pipe(
            map((response) => {
                return response;
            }),
            catchError((err) => {
                console.error(err);
                throw err;
            }
            )
        )
    }

    getTaskDataByID(id: string): Observable<any> {
        return this.http.get(baseURL + `/${id}`).pipe(
            map((response) => {
                return response;
            }),
            catchError((err) => {
                console.error(err);
                throw err;
            }
            )
        )
    }

    updateTask(id: string, taskdata: task): Observable<any> {
        return this.http.put(baseURL + `/${id}`, taskdata).pipe(
            map((response) => {
                return response;
            }),
            catchError((err) => {
                console.error(err);
                throw err;
            }
            )
        )
    }

    addTask( taskdata: task): Observable<any> {
        return this.http.post(baseURL, {...taskdata}).pipe(
            map((response) => {
                return response;
            }),
            catchError((err) => {
                console.error(err);
                throw err;
            }
            )
        )
    }

    deleteTask(id?: Number): Observable<any> {

        return this.http.delete(baseURL + `/${id}`).pipe(
            map((response) => {
                return response;
            }),
            catchError((err) => {
                console.error(err);
                throw err;
            }
            )
        )
    }

}