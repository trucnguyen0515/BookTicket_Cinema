import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../../../Services/movie.services';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-tong-tien',
  templateUrl: './tong-tien.component.html',
  styleUrls: ['./tong-tien.component.scss']
})
export class TongTienComponent implements OnInit {

  private IDMovie:any;
  private MaNhom:any;
  private IDShowTime:any;
  private MovieDetailImage:any;
  private urlHost: string = 'http://sv.myclass.vn/Images/Movies/';

  private SoLuongVe:number;
  private SoLuongCombo:number;

  private paramsSub1: Subscription;
  private paramsSub2: Subscription;
  private paramsSub3: Subscription;

  constructor(private movieService:MoviesService,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {


   
    
  }
}
