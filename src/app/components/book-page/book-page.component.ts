import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Page } from 'src/app/book-model';


@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss']
})
export class BookPageComponent implements AfterViewInit {

  @Input() BookPage: Page;
  @ViewChild(`pageContent`) pageContent: ElementRef
  constructor() {
  }


  ngAfterViewInit(): void {
    this.processPage()
  }

  processPage(){
    if (this.BookPage.content !== '') {
      const pageCharactersArray = Array.from(this.BookPage.content)

      let lengthOfTokens = this.BookPage.tokens.length;

      for (let index = lengthOfTokens; index >= 0; index--) {
        try {
          const startIndex = this.BookPage.tokens[index].position[0]
          const endIndex = this.BookPage.tokens[index].position[1]

          //a new array representing the word
          const charMatches = pageCharactersArray.slice(startIndex, endIndex)
          const actualStringOnDocument = charMatches.length
          const wordLink = this.BookPage.tokens[index].value

          charMatches.unshift(`<a href="#/home/word?name=${wordLink}">`)
          charMatches.push("</a>")

          pageCharactersArray.splice(startIndex, (actualStringOnDocument), charMatches.join(''))
        } catch (error) {
        }
      }
      pageCharactersArray.unshift("<span>")
      pageCharactersArray.push("</span>")
      this.pageContent.nativeElement.innerHTML = pageCharactersArray.join('')
    }
  }


}
