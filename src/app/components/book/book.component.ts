import { ThisReceiver } from '@angular/compiler';
import { AfterContentChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Book, Page } from 'src/app/book-model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit, OnDestroy {

  /**The book we are getting from ello endpoint */
  book: Book | undefined;
  /**Lets the user know that the app is in the process of getting data from the graph endpoint */
  loading = false;
  error: any;
  title = 'ello';

  /**This is the current page being displayed. This is the index of the page that is currently being displayed*/
  offset = 0;
  pageCount = 2;

  currentlyRenderedPages: Page[] = []

  constructor(private apollo: Apollo) {
  }

  ngOnInit() {

    let book = localStorage.getItem('book')
    let currentPages = localStorage.getItem('renderedPages')

    if (book != null && currentPages !== null) {
      this.currentlyRenderedPages = JSON.parse(currentPages!);
      this.book = JSON.parse(book!)
      let offset = localStorage.getItem('offset')
      this.offset = Number.parseInt(offset!)

    } else {
      //There is no book data in local storage... Go a head and pull one from graphql endpoint
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
          this.loading = result.loading
          this.error = result.error
          this.book = result!.data!.book
          this.initializeView()
        });
    }
  }
  /**
   * When this component is destroyed, save the current configurations in local storage
   * This method is called when we navigate to word-definition.
   */
  ngOnDestroy(): void {
    if (this.currentlyRenderedPages.length > 0 && this.book !== undefined) {
      localStorage.setItem('renderedPages', JSON.stringify(this.currentlyRenderedPages));
      localStorage.setItem('book', JSON.stringify(this.book));
      localStorage.setItem('offset', `${this.offset}`);
    }
  }

  initializeView() {
    this.currentlyRenderedPages = this.book!.pages.slice(this.offset, this.pageCount)
  }

  /**
   * Go to next double-page 
   */
  goToNextDoublePage() {
    this.offset = this.offset + this.pageCount;
    this.currentlyRenderedPages = this.book!.pages.slice(this.offset, (this.offset + this.pageCount));
  }

  /**
   * Go to rrevious double-page
   */
  goToPreviousDoublePage() {
    this.currentlyRenderedPages = this.book!.pages.slice((this.offset - this.pageCount), this.offset);
    this.offset = this.offset - this.pageCount;
  }

}
