import { AfterContentChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Book, Page } from 'src/app/book-model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {


  book: Book | undefined;
  loading = true;
  error: any;
  title = 'ello-wanjohi';

  pages: Array<Page> = []
  currentPage = 0;

  offset = 0;

  pageCount = 2;

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
        this.loading = result.loading
        this.error = result.error
        let book = result?.data?.book
        this.book = book

        let pagesCount = this.book!.pages.length;

        if (this.currentPage != pagesCount) {
          let firstPage = this.book!.pages[this.currentPage]
          let secondPage = this.book!.pages[this.currentPage + 1]
          this.pages = [firstPage, secondPage]
          this.currentPage = this.currentPage + 2
        }

      });
  }

  goToNextDoublePage() {


    return this.pages.slice(((this.offset) - (this.pageCount)), (this.pageCount));

    let _currentPage = this.currentPage;

    let pagesCount = this.book!.pages.length;
    if (_currentPage == 0) {
      let firstPage = this.book!.pages[0]
      let secondPage = this.book!.pages[1]
      this.pages = []
      this.pages = [firstPage, secondPage]

      this.currentPage = this.currentPage + 2;
    }
    if (this.currentPage > 0 && this.currentPage < pagesCount) {

      let firstPage = this.book!.pages[_currentPage + 1]
      let secondPage = this.book!.pages[_currentPage + 2]
      this.pages = []
      this.pages = [firstPage, secondPage]
      this.currentPage = _currentPage + 2;
    }
    if (this.currentPage === pagesCount) {
      return;
      // let firstPage = this.book!.pages[_currentPage]
      // let pages = [firstPage]
      // this.pages.splice(0, 1, ...pages)
    }
  }

  goToPreviousDoublePage() {

    return this.pages.slice(((this.offset) - (this.pageCount)), (this.pageCount));

    // let _currentPage = this.currentPage;

    // let pagesCount = this.book!.pages.length;

    // if (this.currentPage <= 0) {
    //   // let firstPage = this.book!.pages[_currentPage]
    //   // let pages = [firstPage]
    //   // this.pages.splice(0, 1, ...pages)
    //   return;
    // }

    // if (_currentPage <= pagesCount) {
    //   if (_currentPage === 2) {
    //     return;
    //   }
    //   _currentPage = _currentPage - 2;
    //   this.currentPage = this.currentPage - 2

    //   let firstPage = this.book!.pages[_currentPage - 1]
    //   let secondPage = this.book!.pages[_currentPage]
    //   this.pages = []
    //   this.pages = [firstPage, secondPage]

    // }


  }

}
