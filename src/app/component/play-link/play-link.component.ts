import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-play-link',
  templateUrl: './play-link.component.html',
  styleUrls: ['./play-link.component.css']
})
export class PlayLinkComponent implements OnInit {


  @Input() playLink: string = "";

  constructor() { }
  ngOnInit(): void { }
  ngOnChanges():void {
    
    if(this.playLink != "" && this.playLink != undefined )   {
      this.startVideoPlayer();
    }  
    
  }

  private startVideoPlayer()  {
    
    document.getElementById('videoDiv')?.removeAttribute("hidden");

    document.getElementById('videoPlayer')?.setAttribute("src",this.playLink);

    let script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@webtor/player-sdk-js/dist/index.min.js';
    script.type = 'text/javascript';
    script.async = true;
    script.charset = 'utf-8';
    document.getElementById('videoDiv')?.appendChild(script); 

  }

}
