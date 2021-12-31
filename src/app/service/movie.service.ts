import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Movie } from "../entitys/movie";
import { DownloadData } from "../entitys/download-data";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from '../../environments/environment';

// const YTS_LINK = environment.YTS_LINK;
const BACKEND_URL = environment.BACKEND_URL;

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  public movie:Movie ;
  public saveId:string[] =[];

  constructor(private httpClient: HttpClient) { }

//==============IMDB======================
  public getMoviesByTorrent(endUrl: String): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(BACKEND_URL+"/imdb"+endUrl); // .pipe( map(response => response) );
  }

  public getMoviesByGenre(endUrl: String): Observable<GetResponseMovieListFormIMDB> {
    return this.httpClient.get<GetResponseMovieListFormIMDB>(BACKEND_URL+"/imdb"+endUrl); // .pipe( map(response => response) );
  }

  public getMovieById(id:string):Observable<Movie> {    
    if(this.movie == null || this.movie.otherImages == null  || this.movie.otherImages?.length == 0)
      return this.httpClient.get<Movie>(BACKEND_URL+"/imdb/"+id);
    else
      return of(this.movie);
  }

//=====================Backend==============================

  public getMoviesByBackend(endUrl: String): Observable<GetResponseMovieListBackend> {
    return this.httpClient.get<GetResponseMovieListBackend>(BACKEND_URL+"/angularMovie"+endUrl);
  }

  public storeInBackendDatabase(temp: Movie): Observable<Movie> {
    var headers = {"Authorization": "Bearer " + localStorage.getItem("jwtToken") };
    return this.httpClient.post<Movie>(BACKEND_URL+"/angularMovie", temp, {headers: headers});
  }

  public deleteInBackendDatabase(id: string): Observable<string> {
    var headers = {"Authorization": "Bearer " + localStorage.getItem("jwtToken") };
    return this.httpClient.delete<string>(BACKEND_URL+"/angularMovie/"+id, {headers, responseType: 'text' as 'json'});
  }

  public getDownloadLink(name:String):Observable<DownloadData[]> {
    return this.httpClient.get<DownloadData[]>(BACKEND_URL+"/torrent/"+name);
  }

}

interface GetResponseMovieListFormIMDB {
  movies: Movie[];
  totalElement: number;
  pageNumber: number;
}

interface GetResponseMovieListBackend {
  content: Movie[];
  totalElements: number;
  size: number;
  number: number;
}

// interface GetResponseMovie {
//   data: {
//     movie: Movie;
//   }
// }