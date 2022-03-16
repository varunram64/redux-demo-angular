import { NgRedux, select } from '@angular-redux/store';
import { Component, Input, OnInit } from '@angular/core';
import { DELETEALL, INCREMENT } from '../actions';
import { IAppState, INITIAL_STATE } from '../store';

@Component({
  selector: 'app-counter',
  templateUrl: './app-counter.component.html',
  styleUrls: ['./app-counter.component.scss']
})
export class AppCounterComponent implements OnInit {
  @Input() counter: any;
  @Input() lastUpdate: any;

  constructor(private ngRedux: NgRedux<IAppState>) {
  }

  ngOnInit(): void {
  }

  deleteAll() {
    console.log(this.counter, 27);
    if(!isNaN(this.counter) && Number(this.counter) > 0) {
      this.ngRedux.dispatch({ type: DELETEALL, state: INITIAL_STATE });
    }
    else {
      alert('Add something before deleting');
    }
  }

}
