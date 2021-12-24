import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Movie } from "../entitys/movie";
import { DownloadData } from "../entitys/download-data";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from '../../environments/environment';

const YTS_LINK = environment.YTS_LINK;
const BACKEND_URL = environment.BACKEND_URL;

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  public movie:Movie ;
  public saveId:number[] =[];

  constructor(private httpClient: HttpClient) { }

//==============YTS======================
  public getMoviesByTorrent(endUrl: String): Observable<GetResponseMovieListFormTorrent> {
    return this.httpClient.get<GetResponseMovieListFormTorrent>(YTS_LINK+"/list_movies.json"+endUrl).pipe( map(response => response) );
  }

  public getMovieById(id:number):Observable<Movie> {    
    if(this.movie == null || this.movie.id != id)
      return this.httpClient.get<GetResponseMovie>(YTS_LINK+"/movie_details.json?movie_id="+id).pipe( map(response => response.data.movie) );
    else
      return of(this.movie);  
  }

//=====================Backend==============================

  public getMoviesByBackend(endUrl: String): Observable<GetResponseMovieListBackend> {
    return this.httpClient.get<GetResponseMovieListBackend>(BACKEND_URL+"/angularMovie"+endUrl);
  }

  public getOtherImage(imdbId: String): Observable<string[]> {
    return this.httpClient.get<string[]>(BACKEND_URL+"/imdb/"+imdbId);
  }

  public storeInBackendDatabase(temp: Movie): Observable<Movie> {
    var headers = {"Authorization": "Bearer " + localStorage.getItem("jwtToken") };
    return this.httpClient.post<Movie>(BACKEND_URL+"/angularMovie", temp, {headers: headers});
  }

  public deleteInBackendDatabase(id: number): Observable<string> {
    var headers = {"Authorization": "Bearer " + localStorage.getItem("jwtToken") };
    return this.httpClient.delete<string>(BACKEND_URL+"/angularMovie/"+id, {headers, responseType: 'text' as 'json'});
  }

  public getDownloadLink(name:String):Observable<DownloadData[]> {
    return this.httpClient.get<DownloadData[]>(BACKEND_URL+"/torrent/"+name);
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