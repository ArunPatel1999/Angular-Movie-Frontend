import { Component, OnInit, Input} from '@angular/core';
import { DownloadData } from 'src/app/entitys/download-data';
import { MovieService } from 'src/app/service/movie.service';
import { PlayLinkComponent } from "../play-link/play-link.component";

@Component({
  selector: 'app-dowload-links',
  templateUrl: './dowload-links.component.html',
  styleUrls: ['./dowload-links.component.css']
})
export class DowloadLinksComponent implements OnInit {


  @Input()
  movieName: string = "";
  public downloadLinks: DownloadData[] =[]; 
  public playLink:string ;
  public loader:boolean = true;

  constructor( private movieService:MovieService) { }

  ngOnInit(): void {}
  
  ngOnChanges(): void {
    this.movieService.getDownloadLink(this.movieName).subscribe(data => { this.downloadLinks = data; this.loader = false;}); 
  }

  public playStart(playLink: string) {
    this.playLink = playLink;

    //temp delete after find solution
    // this.movieService.playLinkTemp=playLink;
    
    localStorage.setItem("videoLink", playLink);
    window.location.href=window.location.href+"/play"
    
  }

}
