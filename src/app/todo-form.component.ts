import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const ADD_TODO = gql`
  mutation addTodo($text: String!) {
    addTodo(text: $text) @client {
      id
    }
  }
`;

@Component({
  selector: 'todo-form',
  template: `
    <input type="text" [formControl]="task">
    <button (click)="addTodo()">Add Todo</button>
  `
})
export class TodoFormComponent {
  task = new FormControl('');

  constructor(private apollo: Apollo) { }

  addTodo() {
    if (!this.task.value.trim()) {
      return;
    }

    this.apollo.mutate({
      mutation: ADD_TODO,
      variables: {
        text: this.task.value
      }
    }).subscribe(() => {
      this.task.setValue('');
    });
  }
}