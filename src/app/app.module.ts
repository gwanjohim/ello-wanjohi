import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

/**Apollo graph API clients */
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

/**Application Components */
import { AppComponent } from './app.component';
import { BookPageComponent } from './components/book-page/book-page.component';
import { WordDefinitionComponent } from './components/word-definition/word-definition.component';
import { BookComponent } from './components/book/book.component';

@NgModule({
  declarations: [
    AppComponent,
    BookPageComponent,
    WordDefinitionComponent,
    BookComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
