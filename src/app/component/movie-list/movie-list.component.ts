import { Component, OnInit } from '@angular/core';

import { MovieService } from "src/app/service/movie.service";
import { Movie } from 'src/app/entitys/movie';
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  public movies: Movie[];
  private endUrl:String;
 
  constructor(private movieService: MovieService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(() => {
      this.listMovies();
    });
  }

  private listMovies() {

    if(this.router.snapshot.paramMap.has("keyword"))   
        this.endUrl = `?query_term=`+this.router.snapshot.paramMap.get("keyword");
    else if(this.router.snapshot.paramMap.has("category"))   
        this.endUrl = `?genre=`+this.router.snapshot.paramMap.get("category");    
    else
        this.endUrl = ""; 

    this.movieService.getMovies(this.endUrl).subscribe(
      data => { 
        if (typeof data !== 'undefined')
          this.movies =data;
        else
          this.movies = [];
      }
    )
  } 
}

