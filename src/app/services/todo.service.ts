import { NgRedux } from '@angular-redux/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FETCH_TODOS_ERROR, FETCH_TODOS_SUCCESS } from '../actions';
import { IAppState } from '../store';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  baseURL: string = "https://jsonplaceholder.typicode.com";

  constructor(private http: HttpClient, private ngRedux: NgRedux<IAppState>) { 
    
  }

  loadToDoList() {
    this.http.get(`${this.baseURL}/todos`).subscribe((data: any) => {
      this.ngRedux.dispatch({ type: FETCH_TODOS_SUCCESS, payload: data });
    },
    error => {
      this.ngRedux.dispatch({ type: FETCH_TODOS_ERROR, payload: error.error });
    });
  }
}
