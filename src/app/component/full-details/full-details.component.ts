import { Component, OnInit} from '@angular/core';
import { MovieService } from 'src/app/service/movie.service';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/entitys/movie';
import { DowloadLinksComponent } from 'src/app/component/dowload-links/dowload-links.component';


@Component({
  selector: 'app-full-details',
  templateUrl: './full-details.component.html',
  styleUrls: ['./full-details.component.css']
})
export class FullDetailsComponent implements OnInit {

  public movie:Movie = new Movie();
  public language:String = "Hindi";
  public movieName:string ;
  public buttonClick:boolean = false;
  public showDownloadLink:boolean = false;
  public otherImageList:any[] = [];

  constructor(private router:ActivatedRoute, private movieService:MovieService) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(() => {       
      this.getById() ;
    });
  }

  private getById() {
    this.movieService.getMovieById(Number(this.router.snapshot.paramMap.get("id"))).subscribe(data => { 
      this.movie = data;   
     
      this.movieService.getOtherImage(data.imdb_code).subscribe(imagesData => {
        imagesData.reduce((r, path) => {
            var temp:any = (r.children = r.children || []).find(q => q['path'] === path);
            if (!temp) r.children.push(temp = { path });
            return r;
        }, { children: this.otherImageList });

      });

      this.showDownloadLink=true;
    });
  }

  public setMovieName(movieName: string) { 
    this.buttonClick= false;
    this.movieName = movieName;
    this.buttonClick= true;
  }



}
