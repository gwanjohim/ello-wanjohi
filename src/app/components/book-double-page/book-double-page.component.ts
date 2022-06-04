import { Component, Input, OnInit } from '@angular/core';
import { Book, Page, Token } from 'src/app/book-model';

@Component({
  selector: 'app-book-double-page',
  templateUrl: './book-double-page.component.html',
  styleUrls: ['./book-double-page.component.scss']
})
export class BookDoublePageComponent implements OnInit {


  @Input() pages: Page[];
  pageItems: Array<any> =[]

  constructor() { }


  ngOnInit(): void {
    let pagesLength = this.pages.length

    for (let index = 0; index < pagesLength; index++) {
      const page1 = this.pages[index];
      const page2 = this.pages[index + 1];
      let pageItems = { firstPage: page1, secondPage: page2 }
      this.pageItems!.push(pageItems)
    }
  }

}
