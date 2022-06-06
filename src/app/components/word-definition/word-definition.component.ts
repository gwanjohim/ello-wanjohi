import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-word-definition',
  templateUrl: './word-definition.component.html',
  styleUrls: ['./word-definition.component.scss']
})
export class WordDefinitionComponent implements OnInit {

  name =""
  constructor(
    private route: ActivatedRoute,private _location: Location
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.name = params['name'];
    });
  }

  navigateBack(){
    this._location.back()
  }

}
