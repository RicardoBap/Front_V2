import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ HomeService ]
})
export class HomeComponent implements OnInit { 

  constructor(
    private title: Title   
    ) { }

  ngOnInit(): void {
    this.title.setTitle('Home')  
  }

}
