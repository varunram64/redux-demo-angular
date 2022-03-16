import { NgRedux, select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DECREMENT, INCREMENT } from './actions';
import { TodoService } from './services/todo.service';
import { IAppState, INITIAL_STATE } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'To Do List';
  // public get counter() : number {
  //   const state = this.ngRedux.getState();
  //   return state?.counter || 0;
  // }
  addToDoListForm: FormGroup;
  @select(s => s.get('counter')) counter$: any;
  @select(s => s.get('lastUpdate')) lastUpdate$: any;
  @select(s => s.get('todoList')) todoList$: any;

  constructor(private ngRedux: NgRedux<IAppState>, private fb: FormBuilder, private todoservice: TodoService) {
    this.addToDoListForm = fb.group({
      contentText: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.todoservice.loadToDoList();
  }

  get f() {
    return this.addToDoListForm.controls;
  }

  addToDoList() {
    if(!this.addToDoListForm.valid) {
      alert('Enter some value');
      return;
    }

    this.ngRedux.dispatch({ type: INCREMENT, payload: { title: this.f.contentText.value }, state: INITIAL_STATE });

    this.addToDoListForm.reset();
  }

  trackByFn() {}

  applyRemove(item: any) {
    item.delete = !item?.delete;
  }

  decrement(item: any) {
    this.ngRedux.dispatch({ type: DECREMENT, payload: item, state: INITIAL_STATE });
  }
}
