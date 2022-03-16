import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { fromJS, Map } from 'immutable';

import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IAppState, INITIAL_STATE, rootReducer } from './store';
import { AppCounterComponent } from './app-counter/app-counter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AppCounterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgReduxModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<Map<string, any>>, devTools: DevToolsExtension) {
    var enhancers = isDevMode() ? [devTools.enhancer()] : [];
    ngRedux.configureStore(rootReducer, Object.assign(fromJS(INITIAL_STATE)), [], enhancers);
  }
}
