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
  // currentPage = 0;

  offset = 0;
  pageCount = 2;
  currentlyShownPages: Page[] = []

  constructor(private apollo: Apollo) {
  }

  createPageItems(pagesPerView: number) {
    // var items: number[] = [];
    // for(var i = 1; i <= number; i++){
    //   items.push(i);
    // }
    // return items;
    return new Array<number>(pagesPerView)
  }

  // createRange(number: number) {
  //   // var items: number[] = [];
  //   // for(var i = 1; i <= number; i++){
  //   //   items.push(i);
  //   // }
  //   // return items;
  //   return new Array(number);
  // }

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
        this.initializeView()

        // let pagesCount = this.book!.pages.length;

        // if (this.currentPage != pagesCount) {
        //   let firstPage = this.book!.pages[this.currentPage]
        //   let secondPage = this.book!.pages[this.currentPage + 1]
        //   this.pages = [firstPage, secondPage]
        //   this.currentPage = this.currentPage + 2
        // }

      });
  }

  initializeView() {
    this.currentlyShownPages = this.book!.pages.slice(this.offset, this.pageCount)
  }
  goToNextDoublePage() {

    this.offset = this.offset + this.pageCount;

    this.currentlyShownPages = this.book!.pages.slice(this.offset, (this.offset + this.pageCount));



    // let _currentPage = this.currentPage;

    // let pagesCount = this.book!.pages.length;
    // if (_currentPage == 0) {
    //   let firstPage = this.book!.pages[0]
    //   let secondPage = this.book!.pages[1]
    //   this.pages = []
    //   this.pages = [firstPage, secondPage]

    //   this.currentPage = this.currentPage + 2;
    // }
    // if (this.currentPage > 0 && this.currentPage < pagesCount) {

    //   let firstPage = this.book!.pages[_currentPage + 1]
    //   let secondPage = this.book!.pages[_currentPage + 2]
    //   this.pages = []
    //   this.pages = [firstPage, secondPage]
    //   this.currentPage = _currentPage + 2;
    // }
    // if (this.currentPage === pagesCount) {
    //   return;
    //   // let firstPage = this.book!.pages[_currentPage]
    //   // let pages = [firstPage]
    //   // this.pages.splice(0, 1, ...pages)
    // }
  }

  goToPreviousDoublePage() {



    this.currentlyShownPages = this.book!.pages.slice((this.offset - this.pageCount), this.offset);

    this.offset = this.offset - this.pageCount;



    // let _currentPage = this.currentPage;

    // let pagesCount http://transcendentwholeinnerlaugh.neverssl.com/onlinetPage <= 0) {
    //   // let firstPage = this.book!.pages[_currentPage]
    //   // let pages = [firstPage]
    //   // this.pageshttp://transcendentwholeinnerlaugh.neverssl.com/onlineage === 2) {
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
