import { Component, OnInit } from '@angular/core';
import { HelpersService } from '../../services/helpers.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(private helpers:HelpersService) { 
    
  }

  ngOnInit() {}

}
