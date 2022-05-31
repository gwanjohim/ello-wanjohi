import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Book } from './book-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  book: Book | undefined;
  loading = true;
  error: any;
  title = 'ello-wanjohi';
  constructor(private apollo: Apollo) { }

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
        this.prepareBook(book)
      });
  }

  prepareBook(book: Book) {
    let pages = book.pages

    pages.forEach(page => {
      let content = page.content
      let tokens = page.tokens

      let tokenizedSubstrings = tokens.map(token => {
        let positions = token.position
        let startIndex = positions[0]
        let endIndex = positions[1]

        let substringLength = endIndex - startIndex
        let SubstringValue = token.value

        let pagesubString: PageSubstring = { startIndex: startIndex, length: substringLength, subString: SubstringValue }
        return pagesubString;
        //we care about
        
        //startIndex
        //SubString length
        //the substringValue
      })
      console.error(content)
      console.error(tokenizedSubstrings)


    });

  }
}

export interface PageSubstring {
  startIndex: Number
  length: number
  subString: string
}
