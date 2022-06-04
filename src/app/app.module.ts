import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { HighlightDirective } from './directives/highlight/highlight.directive';
import { BookPageComponent } from './components/book-page/book-page.component';
import { WordDefinitionComponent } from './components/word-definition/word-definition.component';
import { BookComponent } from './components/book/book.component';
import { BookDoublePageComponent } from './components/book-double-page/book-double-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HighlightDirective,
    BookPageComponent,
    WordDefinitionComponent,
    BookComponent,
    BookDoublePageComponent
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
