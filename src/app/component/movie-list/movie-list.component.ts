import { Component, OnInit } from '@angular/core';

import { AuthonticationService } from "src/app/service/authontication.service";
import { MovieService } from "src/app/service/movie.service";
import { Movie } from 'src/app/entitys/movie';
import { ActivatedRoute, Router } from "@angular/router";

import Swal from 'sweetalert2';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  public movies: Movie[];
  private endUrl:String;

  public pageNumber: number = 1;
  public perPageElement: number = 20;
  public totalElement: number =0;
  
  public alreadySave = false;

  public tempMovieService:number[];
  public login:boolean = false;
  
  constructor(private movieService: MovieService, private activatedRoute: ActivatedRoute, private router: Router, private authonticationService: AuthonticationService) {
    this.tempMovieService = movieService.saveId;
  }

  ngOnInit(): void {
    this.authonticationService.getLoginStatus().subscribe(
      data =>  this.authonticationService.isAuthenticated.next(true), 
      err => this.authonticationService.isAuthenticated.next(false)
    );
    this.activatedRoute.paramMap.subscribe(() => { this.listMovies(); });
    this.authonticationService.isAuthenticated.subscribe(data => this.login = data );
  }
  
  public dropDownChangePerPaze(perPageElement:number) {
      this.perPageElement=perPageElement;
      this.pageNumber=1;
      this.getMovies();
  }

  public pageNumberChange() {
    this.getMovies();
  }

  private listMovies() {
    if (this.activatedRoute.snapshot.paramMap.has("keyword"))   
        this.endUrl = `?query_term=`+this.activatedRoute.snapshot.paramMap.get("keyword")+"&";
    else if(this.activatedRoute.snapshot.paramMap.has("category"))   
        this.endUrl = `?genre=`+this.activatedRoute.snapshot.paramMap.get("category")+"&";    
    else 
        this.endUrl = "? "; 

    this.pageNumber = 1;
    this.perPageElement = 20;
    
    this.getMovies();
  } 

  private getMovies() {
    if(!this.endUrl.startsWith("? ")) this.getForTorrent(this.endUrl+"limit="+this.perPageElement+"&page="+this.pageNumber) 
    else this.getForBackend(this.endUrl+"page="+(this.pageNumber-1)+"&size="+this.perPageElement);
  }

  private getForTorrent(url:string) {
    this.alreadySave = false;
    this.movieService.getMoviesByTorrent(url).subscribe(
      data => {         
        if (typeof data !== 'undefined') {
          
          this.movies = data.data.movies;
          this.pageNumber = data.data.page_number;
          this.perPageElement = data.data.limit;
          this.totalElement = data.data.movie_count;

        }else
          this.movies = [];
      });
  }

  
  private getForBackend(url:string) {
    this.alreadySave = true;
    this.movieService.getMoviesByBackend(url).subscribe(data => {
        if (typeof data !== 'undefined') {
          
          this.movies = data.content;
          this.pageNumber = data.number+1;
          this.perPageElement = data.size;
          this.totalElement = data.totalElements;

          this.movieService.saveId = this.movies.map(movie =>movie.id);
        } else
          this.movies = [];
    });
  
  
  }


  public fullDetails(movie:Movie) {
    this.movieService.movie = movie;
    this.router.navigate(['movie/'+movie.id]);
  }

  public storeInBackendDatabase(movie:Movie) {
    this.movieService.storeInBackendDatabase(movie).subscribe(
      data => this.successMessage(data.title, 'Successful Add...'),
      err => this.errorMessage(err.error)
    );
    this.movieService.saveId.push(movie.id);
  }

  public deleteInBackendDatabase(movie:Movie) {  
    Swal.fire({  
      title: movie.title,  
      text: 'Are you sure want to remove?',  
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: 'Yes, delete it!',  
      cancelButtonText: 'No, keep it'  
    }).then((result) => {  
      if (result.value) { 
        this.movieService.deleteInBackendDatabase(movie.id).subscribe(
          data => { 
            this.successMessage(movie.title, 'Successful Delete...'),            
            this.movieService.saveId.splice(this.movieService.saveId.findIndex(item => item == movie.id), 1);
          }, err => this.errorMessage(err.error.text)
        ) 
      } else if (result.dismiss === Swal.DismissReason.cancel) {  
        Swal.fire(  
          'Cancelled',  
          'file is safe 😅',  
          'error'  
        )  
      }  
    })  
  }  

  private successMessage(title: string, text:string) {
     Swal.fire({   
      icon: 'success',  
      title: title,
      text: text, 
      showConfirmButton: false,  
      timer: 1500  
    })  
    this.getMovies();
  }

  private errorMessage(message: string) {
    Swal.fire({  
      icon: 'error',  
      title: 'Oops...',  
      text: message 
    });   
    this.getMovies();
  }

}

