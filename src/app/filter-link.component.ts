import { Component, OnInit, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const GET_VISIBILITY_FILTER = gql`
  {
    visibilityFilter @client
  }
`;

@Component({
  selector: 'filter-link',
  template: `
    <button (click)="setFilter()" [disabled]="visibilityFilter === filter">
      <ng-content></ng-content>
    </button>
  `,
})
export class FilterLinkComponent implements OnInit {
  @Input() filter: string;
  visibilityFilter: Observable<string>;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.visibilityFilter = this.apollo.watchQuery({
      query: GET_VISIBILITY_FILTER
    })
      .valueChanges
      .pipe(map(result => result.data && this.visabilityFilter(result)));
  }

  visabilityFilter(res){
    return res.data.visibilityFilter;
  }

  setFilter() {
    this.apollo.getClient().writeData({
      data: { visibilityFilter: this.filter }
    });
  }
}
