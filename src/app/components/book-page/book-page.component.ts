import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
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

  processPage() {
    if (this.BookPage.content !== '') {
      const pageContentInCharactersArray = Array.from(this.BookPage.content)

      let lengthOfTokens = this.BookPage.tokens.length;

      for (let index = lengthOfTokens; index >= 0; index--) {
        try {
          const startIndex = this.BookPage.tokens[index].position[0]
          const endIndex = this.BookPage.tokens[index].position[1]

          //a new array representing the word
          const charMatches = pageContentInCharactersArray.slice(startIndex, endIndex)
          const actualStringOnDocument = charMatches.length
          const wordLink = this.BookPage.tokens[index].value

          charMatches.unshift(`<a href="#/home/word?name=${wordLink}">`)
          charMatches.push("</a>")

          pageContentInCharactersArray.splice(startIndex, (actualStringOnDocument), charMatches.join(''))
        } catch (error) {
          console.warn(error);

        }
      }
      pageContentInCharactersArray.unshift("<span>")
      pageContentInCharactersArray.push("</span>")
      this.pageContent.nativeElement.innerHTML = pageContentInCharactersArray.join('')
    }
  }


}
