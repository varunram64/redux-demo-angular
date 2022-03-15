import { NgRedux, select } from '@angular-redux/store';
import { Component } from '@angular/core';
import { Map } from 'immutable';
import { Observable } from 'rxjs';
import { INCREMENT } from './actions';
import { IAppState, INITIAL_STATE } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Demo App';
  public get counter() : number {
    const state = this.ngRedux.getState();
    return state?.counter || 0;
  }
  

  constructor(private ngRedux: NgRedux<IAppState>) {
  }

  increment() {
    this.ngRedux.dispatch({ type: INCREMENT, state: INITIAL_STATE });
  }
}
