import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const GET_TODOS = gql`
  {
    todos {
      id
      completed
      text
    }
  }
`;

@Component({
  selector: 'todo-list',
  template: `
    <ul>
      <todo *ngFor="let task of todos | async" [task]="task"></todo>
    </ul>
  `
})
export class TodoListComponent implements OnInit {
  todos: Observable<any[]>;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.todos = this.apollo.watchQuery({
      query: GET_TODOS
    })
      .valueChanges
      .pipe(
        map(({ data }) => this.getVisibleTodos(data))
      );
  }

  private getVisibleTodos(data) {
    return data.todos;
    // const filter = data.visibilityFilter;
    // switch (filter) {
    //   case 'SHOW_ALL':
    //     return todos;
    //   case 'SHOW_COMPLETED':
    //     return todos.filter(t => t.completed);
    //   case 'SHOW_ACTIVE':
    //     return todos.filter(t => !t.completed);
    //   default:
    //     throw new Error('Unknown filter: ' + filter);
    // }
  };
}
