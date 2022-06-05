import { AfterContentChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Book, Page, Token } from './book-model';
import { PageSubstring } from './page-sub-string';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() { }
  ngOnInit() { }
}


