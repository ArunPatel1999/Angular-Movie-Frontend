import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  public doSearch(value:String)  {
    this.route.navigateByUrl(`/search/${value}`);
  }
}
