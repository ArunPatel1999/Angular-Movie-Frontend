import { Component, OnInit } from '@angular/core';

import { MovieService } from "src/app/service/movie.service";
import { Movie } from 'src/app/entitys/movie';
import { ActivatedRoute, Router } from "@angular/router";


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
 
  constructor(private movieService: MovieService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {
      this.listMovies();
    });
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

    if(this.activatedRoute.snapshot.paramMap.has("keyword"))   
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
    ;
    if(!this.endUrl.startsWith("? ")) this.getForTorrent(this.endUrl+"limit="+this.perPageElement+"&page="+this.pageNumber) 
    else this.getForBackend(this.endUrl+"page="+(this.pageNumber-1)+"&size="+this.perPageElement);
  }

  private getForTorrent(url:string) {
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
    
    this.movieService.getMoviesByBackend(url).subscribe(data => {
        if (typeof data !== 'undefined') {
          
          this.movies = data.content;
          this.pageNumber = data.number+1;
          this.perPageElement = data.size;
          this.totalElement = data.totalElements;
  
        } else
          this.movies = [];
    });
  }


  public fullDetails(movie:Movie) {
    this.movieService.movie = movie;
    this.router.navigate(['movie/'+movie.id]);
  }

}

