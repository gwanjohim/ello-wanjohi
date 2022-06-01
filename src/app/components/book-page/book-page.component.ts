import { JsonPipe } from '@angular/common';
import { escapeRegExp } from '@angular/compiler/src/util';
import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { PageSubstring } from 'src/app/page-sub-string';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss']
})
export class BookPageComponent implements OnInit, AfterViewInit, OnChanges, AfterContentInit, AfterContentChecked {

  @Input() PageText: string;
  @Input() PageTokens: PageSubstring[]
  @ViewChild('pageContent') pageContent: ElementRef

  constructor() { }
  ngAfterContentChecked(): void {

  }
  ngAfterContentInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {

    // for (const propName in changes) {
    //   const chng = changes['PageTokens'];
    //   const cur = JSON.stringify(chng.currentValue);
    //   const prev = JSON.stringify(chng.previousValue);

    //   if (cur !== prev) {
    //     let result = JSON.parse(cur)
    //     this.PageTokens = result
    //   }
    // }




  }
  ngAfterViewInit(): void {

    let documentNode = document.createElement("span")

    this.pageContent.nativeElement.innerHTML = this.PageText

    this.PageTokens.forEach(tokn => {

      setTimeout(() => {

        let word = this.PageText.substring(tokn.startIndex, tokn.endIndex)
        let patternToReplace = `\b${word}\b`;
        let replacementWord = word;
        documentNode.innerHTML = replacementWord
        documentNode.className = "bold";
        let newContent = this.pageContent.nativeElement.innerHTML.replace(word, documentNode.outerHTML);

        this.pageContent.nativeElement.innerHTML = newContent
        // htmlString.replace(patternToReplace, replacement)
      }, 1000);
      //   setTimeout(() => {

      //   }, 1000);
      });

    }

  ngOnInit(): void {

    }

}
