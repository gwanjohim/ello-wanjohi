import { JsonPipe } from '@angular/common';
import { escapeRegExp } from '@angular/compiler/src/util';
import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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

  constructor(@Inject(DOCUMENT) public document: Document) {
  }
  ngAfterViewInit(): void {

    var textInput = this.PageText;

    let resultText = this.PageTokens.reduce((previous, token) => {

      let word = textInput.substring(token.startIndex, token.endIndex)
      var replacement = '<span>' + word + '</span>'
      let current = textInput.substring(token.startIndex, token.endIndex).replace(word, replacement)
      return previous + current
    }, '')

    var docu = document.getElementById('pageContent')
    docu!.outerText = resultText


  }

  ngOnInit(): void {

  }

}
