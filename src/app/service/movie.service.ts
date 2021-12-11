import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Movie } from "../entitys/movie";
import { DownloadData } from "../entitys/download-data";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  public movie:Movie ;

  private readonly YTS_LINK:string = "https://yts.mx/api/v2";
  private readonly BACKEND_URL:string = "https://moviepur-api.herokuapp.com";
//private final BACKEND_URL:string  = "https://localhost:8080/test/";


  constructor(private httpClient: HttpClient) { }


  public getMoviesByTorrent(endUrl: String): Observable<GetResponseMovieListFormTorrent> {
    return this.httpClient.get<GetResponseMovieListFormTorrent>(this.YTS_LINK+"/list_movies.json"+endUrl).pipe( map(response => response) );
  }

  public getMoviesByBackend(endUrl: String): Observable<GetResponseMovieListBackend> {
    return this.httpClient.get<GetResponseMovieListBackend>(this.BACKEND_URL+"/angularMovie"+endUrl);
  }

  public getDownloadLink(name:String):Observable<DownloadData[]> {
    return this.httpClient.get<DownloadData[]>(this.BACKEND_URL+"/torrent/"+name);
  }

  public getMovieById(id:number):Observable<Movie> {    
    if(this.movie == null || this.movie.id != id)
      return this.httpClient.get<GetResponseMovie>(this.YTS_LINK+"/movie_details.json?movie_id="+id).pipe( map(response => response.data.movie) );
    else
      return of(this.movie);  
  }

}

interface GetResponseMovieListFormTorrent {
  data: {
    movies: Movie[];
    movie_count: number;
    limit: number;
    page_number: number;
  }
}

interface GetResponseMovieListBackend {
  content: Movie[];
  totalElements: number;
  size: number;
  number: number;
}


interface GetResponseMovie {
  data: {
    movie: Movie;
  }
}