import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { routes } from './app-routing.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ServerModalComponent } from './outer/content/server-modal/server-modal.component';
import { ServerContentComponent } from './outer/content/server-content/server-content.component';
import { ServerObserverComponent } from './outer/content/server-observer/server-observer.component';
import { ContentComponent } from './outer/content/content.component';

import { AxiosService } from './axios.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeader, NgbdTableSortable } from './outer/content/server-table/server-table.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { ServerDeleteModalComponent } from './outer/content/server-delete-modal/server-delete-modal.component';
import { ServerModalEditorComponent } from './outer/content/server-modal-editor/server-modal-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    NgbdSortableHeader,
    NgbdTableSortable,
    ServerContentComponent,
    ServerObserverComponent,
    HttpClientModule,
    CommonModule,
    ServerDeleteModalComponent,
    ServerModalEditorComponent,
    
  ],
  providers: [AxiosService, provideRouter(routes), HttpClientModule, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
