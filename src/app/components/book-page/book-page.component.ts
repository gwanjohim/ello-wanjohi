import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PageSubstring } from 'src/app/page-sub-string';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss']
})
export class BookPageComponent implements OnInit, AfterViewInit {

  @Input() PageText: string;
  @Input() PageTokens: PageSubstring[]

  @ViewChild('pageContent') pageContent: ElementRef
  constructor() { }
  ngAfterViewInit(): void {
    let paragraphElement = document.createElement('p')
    
    let textNode = document.createTextNode(this.PageText)
    this.PageTokens.forEach(tokn => {
      let word = textNode.data.substring(tokn.startIndex, tokn.endIndex)
      textNode.data.replace(word, 'x')
      // console.error(`actual ${word}: tokenized ${tokn.subString}`);
    })
    this.pageContent.nativeElement.appendChild(textNode)
  }

  ngOnInit(): void {
  }

}
