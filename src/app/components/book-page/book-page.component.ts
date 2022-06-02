import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PageSubstring } from 'src/app/page-sub-string';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss']
})
export class BookPageComponent implements OnInit, AfterViewInit {

  @Input() PageText: string;
  @Input() PageTokens: PageSubstring[]
  @ViewChild('pageContent') pageContent: ElementRef
  constructor(@Inject(DOCUMENT) public document: Document) {
  }
  ngAfterViewInit(): void {

    let pageinCharArray = Array.from(this.PageText)

    let result = this.PageTokens.map(token => {
      let startIndex = token.startIndex
      let endIndex = token.endIndex + 1
      let charMatches = pageinCharArray.slice(startIndex, endIndex).join('')
      let span = this.document.createElement('span')
      span.addEventListener("click", function () {
        document.getElementById('paragraphPage')!.innerHTML = token.subString
      });
      span.textContent =  charMatches
      return span
    })

    result.forEach(x => this.pageContent.nativeElement.appendChild(x))
    

  }



  ngOnInit(): void {
  }

}
