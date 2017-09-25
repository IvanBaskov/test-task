import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PaginationModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation'
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientListComponent } from './clients/client-list/client-list.component';
import { HomeComponent } from './home/home.component';
import { NewClientComponent } from './clients/new-client/new-client.component';
import { ResponseHandlerService } from './common/response-handler.service';
import { ToastyModule, ToastyService } from 'ng2-toasty';
import { ClientComponent } from './clients/client/client.component';


@NgModule({
  declarations: [
    AppComponent,
    ClientListComponent,
    HomeComponent,
    NewClientComponent,
    ClientComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    FormsModule,
    CustomFormsModule,
    ToastyModule.forRoot(),
    PaginationModule.forRoot()
  ],
  providers: [ToastyService, ResponseHandlerService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
