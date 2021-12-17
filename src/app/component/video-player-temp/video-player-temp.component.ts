import { Component, OnInit } from '@angular/core';

import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-video-player-temp',
  templateUrl: './video-player-temp.component.html',
  styleUrls: ['./video-player-temp.component.css']
})
export class VideoPlayerTempComponent implements OnInit {

  constructor(private movieService: MovieService) { }
  
  ngOnInit(): void {
    let link = localStorage.getItem("videoLink");
    if(link != null && link.length > 0) 
      this.startVideoPlayer(link)
  }

  ngOnDestroy() {
      localStorage.removeItem("videoLink");
  }

  
  private startVideoPlayer(link:String)  {
    
    document.getElementById('videoDiv')?.removeAttribute("hidden");

    document.getElementById('videoPlayer')?.setAttribute("src",""+link);

    let script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@webtor/player-sdk-js/dist/index.min.js';
    script.type = 'text/javascript';
    script.async = true;
    script.charset = 'utf-8';
    document.getElementById('videoDiv')?.appendChild(script); 
    
  }

}
