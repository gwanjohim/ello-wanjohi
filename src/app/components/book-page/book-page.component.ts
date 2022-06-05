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
      let pageinCharArray = Array.from(this.BookPage.content)
      let lengthOfTokens = this.BookPage.tokens.length;
      for (let index = lengthOfTokens; index >= 0; index--) {
        try {
          let startIndex = this.BookPage.tokens[index].position[0]
          let endIndex = this.BookPage.tokens[index].position[1]
          //a new array representing the word
          let charMatches = pageinCharArray.slice(startIndex, endIndex)
          let actualStringOnDocument = charMatches.length
          let wordLink = this.BookPage.tokens[index].value

          charMatches.unshift(`<a href="#/home/word?name=${wordLink}">`)
          charMatches.push("</a>")

          pageinCharArray.splice(startIndex, (actualStringOnDocument), charMatches.join(''))
        } catch (error) {
        }
      }
      pageinCharArray.unshift("<span>")
      pageinCharArray.push("</span>")
      this.pageContent.nativeElement.innerHTML = pageinCharArray.join('')
    }
  }


}
