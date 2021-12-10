import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { MovieService } from './service/movie.service';
import { Routes, RouterModule } from "@angular/router";
import { MovieListComponent } from './component/movie-list/movie-list.component';
import { SearchComponent } from './component/search/search.component';
import { FullDetailsComponent } from './component/full-details/full-details.component';
import { DowloadLinksComponent } from './component/dowload-links/dowload-links.component';
import { PlayLinkComponent } from './component/play-link/play-link.component';

import { VideoPlayerTempComponent } from './component/video-player-temp/video-player-temp.component';

const routes:Routes = [
  {path:"movie/:id/play", component: VideoPlayerTempComponent},
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
    VideoPlayerTempComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
