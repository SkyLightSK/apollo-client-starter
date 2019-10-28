import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {ApolloModule, APOLLO_OPTIONS, Apollo} from 'apollo-angular';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { resolvers, defaults, typeDefs } from './schema';

const uri = 'http://localhost:3000/graphql';

@NgModule({
  exports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})
export class GraphQLModule {
  constructor(
      apollo: Apollo,
      httpLink: HttpLink
  ) {
    // create Apollo
    apollo.create({
      link: httpLink.create({ uri }),
      cache: new InMemoryCache(),
    });
  }
}
