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


  book: Book | undefined;
  loading = false;
  error: any;
  title = 'ello';

  offset = 0;
  pageCount = 2;
  currentlyShownPages: Page[] = []

  constructor(private apollo: Apollo) {
  }

  ngOnInit() {

    let book = localStorage.getItem('book')
    let currentPages = localStorage.getItem('filterItems')

    if (book != null && currentPages !== null) {
      this.currentlyShownPages = JSON.parse(currentPages!);
      this.book = JSON.parse(book!)
      let offset = localStorage.getItem('offset')
      this.offset = Number.parseInt(offset!)

    } else {
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

  ngOnDestroy(): void {
    if (this.currentlyShownPages.length > 0 && this.book !== undefined) {
      localStorage.setItem('filterItems', JSON.stringify(this.currentlyShownPages));
      localStorage.setItem('book', JSON.stringify(this.book));
      localStorage.setItem('offset', `${this.offset}`);
    }
  }

  initializeView() {
    this.currentlyShownPages = this.book!.pages.slice(this.offset, this.pageCount)
  }
  goToNextDoublePage() {
    this.offset = this.offset + this.pageCount;
    this.currentlyShownPages = this.book!.pages.slice(this.offset, (this.offset + this.pageCount));
  }

  goToPreviousDoublePage() {
    this.currentlyShownPages = this.book!.pages.slice((this.offset - this.pageCount), this.offset);
    this.offset = this.offset - this.pageCount;
  }

}
