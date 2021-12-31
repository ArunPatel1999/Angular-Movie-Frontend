import { DownloadData } from './download-data';

export class Movie {

  	id    :  string;
	name  :  string;
	year  :  string;
	image :  string;
	
	youtubeTrailer  :    string;
	runTime         :    string;
	imdbRating      :    string;
	description     :    string;
	
	genres    :   string[];
	directors :   string[];
	writers   :   string[];
	stars     :   string[];	
	otherImages : string[];
	
	story  :  string;

}
