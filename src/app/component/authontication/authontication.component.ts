import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthonticationService } from "src/app/service/authontication.service";
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-authontication',
  templateUrl: './authontication.component.html',
  styleUrls: ['./authontication.component.css']
})
export class AuthonticationComponent implements OnInit {

  public errorMessage:string = '';

  constructor(private router: Router, private authonticationService : AuthonticationService ) { }

  ngOnInit(): void {
    this.loginStatus();
  }

  private loginStatus() {
    this.authonticationService.getLoginStatus().subscribe(data => { 
        this.authonticationService.isAuthenticated.next(true);
        this.router.navigate(['']); 
      }, err => this.authonticationService.isAuthenticated.next(false)
    );
  }

  public login(username:any, password:any) {
    this.authonticationService.loginFuncation(username.value, password.value).subscribe(
      data => {
        localStorage.setItem("jwtToken",data.token);
        this.authonticationService.isAuthenticated.next(true);
        this.router.navigate(['']);
      }, err => this.errorAlert(err.error)
    );
    username.value='';
    password.value='';
  }

  private errorAlert(message:string) {
     Swal.fire({  
          icon: 'error',  
          title: 'Oops...',  
          text: message
      }) ;
  }
  


}
