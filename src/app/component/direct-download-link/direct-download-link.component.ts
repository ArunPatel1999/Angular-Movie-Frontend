import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/service/movie.service';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/entitys/movie';
import { DownloadData } from 'src/app/entitys/download-data';

@Component({
  selector: 'app-direct-download-link',
  templateUrl: './direct-download-link.component.html',
  styleUrls: ['./direct-download-link.component.css']
})
export class DirectDownloadLinkComponent implements OnInit {

  public downloadLinks: DownloadData[] =[]; 
  public playLink:string ;
  public loader:boolean = true;

  constructor( private router:ActivatedRoute, private movieService: MovieService) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe(() => {    
      this.movieService.getDownloadLink(new String(this.router.snapshot.paramMap.get("name"))).subscribe(data => { this.downloadLinks = data; this.loader = false;}); 
    });
  }

  public playStart(playLink: string) {
    this.playLink = playLink;

    localStorage.setItem("videoLink", playLink);
    window.location.href="/play";
  }

}
