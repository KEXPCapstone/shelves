import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  categories = [
    'rock-pop',
    'hiphop',
    'local',
    'world',
    'roots',
    'reggae',
    'beats-electronic'
  ];

  constructor() { }

  ngOnInit() {
  }

}
