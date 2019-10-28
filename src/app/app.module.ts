import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { GraphQLModule } from './graphql/graphql.module';
import { AppComponent } from './app.component';
import { FilterLinkComponent } from './filter-link.component';
import { FooterComponent } from './footer.component';
import { TodoFormComponent } from './todo-form.component';
import { TodoListComponent } from './todo-list.component';
import { TodoComponent } from './todo.component';

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule, GraphQLModule],
  declarations: [
    AppComponent,
    FilterLinkComponent,
    FooterComponent,
    TodoFormComponent,
    TodoListComponent,
    TodoComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
