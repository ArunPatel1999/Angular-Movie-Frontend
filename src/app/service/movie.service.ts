import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Movie } from "../entitys/movie";
import { DownloadData } from "../entitys/download-data";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient: HttpClient) { }

  public getMovies(endUrl: String): Observable<Movie[]> {
    return this.httpClient.get<GetResponseMovieList>("https://yts.mx/api/v2/list_movies.json"+endUrl).pipe(
      map(response => response.data.movies)
    );
  }

  public getMovieById(id:number):Observable<Movie> {
     return this.httpClient.get<GetResponseMovie>("https://yts.mx/api/v2/movie_details.json?movie_id="+id).pipe(
      map(response => response.data.movie)
    );
  }

  public getDownloadLink(name:String):Observable<DownloadData[]> {
    return this.httpClient.get<DownloadData[]>("http://localhost:8080/test/"+name);
  }

}

interface GetResponseMovieList {
  data: {
    movies: Movie[];
  }
}


interface GetResponseMovie {
  data: {
    movie: Movie;
  }
}