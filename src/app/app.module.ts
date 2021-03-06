import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule } from '@angular/common/http';
import { MovieService } from './service/movie.service';
import { Routes, RouterModule } from "@angular/router";
import { MovieListComponent } from './component/movie-list/movie-list.component';
import { SearchComponent } from './component/search/search.component';
import { FullDetailsComponent } from './component/full-details/full-details.component';
import { DowloadLinksComponent } from './component/dowload-links/dowload-links.component';
import { PlayLinkComponent } from './component/play-link/play-link.component';

import { VideoPlayerTempComponent } from './component/video-player-temp/video-player-temp.component';
import { AuthonticationComponent } from './component/authontication/authontication.component';

import { AuthonticationService } from './service/authontication.service';
import { DirectDownloadLinkComponent } from './component/direct-download-link/direct-download-link.component';
import { SafePipe } from './pipe/safe.pipe';
import { IvyCarouselModule } from 'angular-responsive-carousel';



const routes:Routes = [
  {path: "play", component: VideoPlayerTempComponent},
  {path: "movie/:id/play", component: VideoPlayerTempComponent},
  
  // {path: "download", component: VideoPlayerTempComponent},
  
  {path: 'login', component: AuthonticationComponent},
  {path: 'login/successful', component: AuthonticationComponent},
  
  {path: 'onlyDownloadLink/:name', component:DirectDownloadLinkComponent},
  {path: "movie/:id", component: FullDetailsComponent},
  
  {path: "search/:keyword", component: MovieListComponent},
  {path: "category/:category", component: MovieListComponent},
  {path: "category", component: MovieListComponent},
  {path: "movies", component: MovieListComponent},

  {path: "", redirectTo: 'movies', pathMatch:'full' },
  {path: "**", redirectTo: 'movies', pathMatch:'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    MovieListComponent,
    FullDetailsComponent,
    DowloadLinksComponent,
    PlayLinkComponent,
    VideoPlayerTempComponent,
    AuthonticationComponent,
    DirectDownloadLinkComponent,
    SafePipe
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    IvyCarouselModule
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private authonticationService: AuthonticationService) {
    authonticationService.getLoginStatus().subscribe(
      data =>  this.authonticationService.isAuthenticated.next(data), 
      err => this.authonticationService.isAuthenticated.next(false)
    );

  }
 }
