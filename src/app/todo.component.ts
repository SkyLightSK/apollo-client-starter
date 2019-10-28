import { Component, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: Int!) {
    toggleTodo(id: $id) @client
  }
`;

@Component({
  selector: 'todo',
  template: `
    <li 
      *ngIf="task" 
      (click)="toggle()" 
      [ngStyle]="{'textDecoration': task.completed ? 'line-through' : 'none' }"
    >
      {{task.text}}
    </li>
  `,
})
export class TodoComponent {
  @Input() task: any;

  constructor(private apollo: Apollo) { }

  toggle() {
    this.apollo.mutate({
      mutation: TOGGLE_TODO,
      variables: {
        id: this.task.id
      },
    }).subscribe();
  }
}