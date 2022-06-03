import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PageSubstring } from 'src/app/page-sub-string';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Token } from 'src/app/book-model';

export interface token {
  character: string
  index: number
  word: string
}

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss']
})
export class BookPageComponent implements OnInit, AfterViewInit {

  @Input() PageText: string;
  @Input() PageTokens: Token[]
  @ViewChild('pageContent') pageContent: ElementRef
  constructor(@Inject(DOCUMENT) public document: Document) {
  }
  ngAfterViewInit(): void {
    let pageinCharArray = Array.from(this.PageText)
    let lengthOfTokens = this.PageTokens.length;
    for (let index = lengthOfTokens; index >= 0; index--) {
      try {
        let startIndex = this.PageTokens[index].position[0]
        let endIndex = this.PageTokens[index].position[1]
        //a new array representing the word
        let charMatches = pageinCharArray.slice(startIndex, endIndex)
        let actualStringOnDocument = charMatches.length
        let wordLink = this.PageTokens[index].value
        
        charMatches.unshift(`<a href="/word?name=${wordLink}">`)
        charMatches.push("</a>")

        pageinCharArray.splice(startIndex, (actualStringOnDocument), charMatches.join(''))
      } catch (error) {
        console.log(error);
      }
    }
    pageinCharArray.unshift("<span>")
    pageinCharArray.push("</span>")
    this.pageContent.nativeElement.innerHTML = pageinCharArray.join('')
  }

  ngOnInit(): void {
  }

}
