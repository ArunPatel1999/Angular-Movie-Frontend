import { DownloadData } from './download-data';

export class Movie {
  id: number;

  imdb_code: string;
  title: string;
  title_english: string;
  
  year: number;
  rating: number;
  runtime: number;
  genres: string[];
  
  description_full: string;
  
  yt_trailer_code: string;

  medium_cover_image: string;
  large_cover_image: string;

}
