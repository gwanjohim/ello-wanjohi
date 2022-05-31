import { AfterContentChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Book, Page, Token } from './book-model';
import { PageSubstring } from './page-sub-string';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {

  // @ViewChild('pageContent', { read: true, static: false }) pageContent: ElementRef;

  book: Book | undefined;
  loading = true;
  error: any;
  title = 'ello-wanjohi';
  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
        {book{
          author
          title
          pages{
            content
            pageIndex
            tokens{
              position
              value
            }
          }
        }}
        `,
      })
      .valueChanges.subscribe((result: any) => {
        let book = result?.data?.book
        this.loading = result.loading
        this.error = result.error
        this.book = book
      });
  }


  preparePage(tokens: Token[]) {
    return tokens.map(token => {
      let positions = token.position
      let startIndex = positions[0]
      let endIndex = positions[1]

      let substringLength = endIndex - startIndex
      let SubstringValue = token.value

      let pagesubString: PageSubstring = { startIndex: startIndex, endIndex: endIndex, length: substringLength, subString: SubstringValue }
      return pagesubString;
      //we care about

      //startIndex
      //SubString length
      //the substringValue
    })
  }
}


