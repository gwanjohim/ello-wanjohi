import { AfterContentChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Book, Page, Token } from './book-model';
import { PageSubstring } from './page-sub-string';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentChecked {

  // @ViewChild('pageContent', { read: true, static: false }) pageContent: ElementRef;

  book: Book | undefined;
  loading = true;
  error: any;
  title = 'ello-wanjohi';
  constructor(private apollo: Apollo) {
    // this.pageContent = new ElementRef<any>(undefined)
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
        // this.prepareBook(book)
      });
  }


  ngAfterContentChecked(): void {


    // let pageText = this.pageContent.nativeElement.innerText

    // console.error(pageText)
  }
  preparePage(tokens: Token[]) {
    return tokens.map(token => {
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
  }
}


