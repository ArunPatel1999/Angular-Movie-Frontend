import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthonticationService } from "src/app/service/authontication.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public login: boolean = false;

  constructor(private route:Router, private authonticationService:AuthonticationService) {  }

  ngOnInit(): void {
    this.authonticationService.isAuthenticated.subscribe(data => this.login = data );
   }

  public doSearch(value:String)  {
    this.route.navigateByUrl(`/search/${value}`);
  }

  public logout(){
    this.authonticationService.logoutFuncation();
    this.login = false;
  }
}
