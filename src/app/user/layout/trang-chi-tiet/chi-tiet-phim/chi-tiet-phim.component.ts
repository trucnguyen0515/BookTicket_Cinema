import {
  Component,
  OnInit
} from '@angular/core';
import {
  Subscriber
} from 'rxjs/Subscriber';
import {
  Subscription
} from 'rxjs/Subscription';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  MovieService
} from '../../../../Services/movie.service';

import {
  DomSanitizer
} from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'app-chi-tiet-phim',
  templateUrl: './chi-tiet-phim.component.html',
  styleUrls: ['./chi-tiet-phim.component.scss']
})
export class ChiTietPhimComponent implements OnInit {

  public urlHost: string = 'http://sv.myclass.vn/Images/Movies/';
  public MovieDetail: any = {};
  private MovieID: number;
  private MaNhom: any;

  private paramsSub1: Subscription;
  private paramsSub2: Subscription;


  private tenphim: any;
  public urlPhim: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private moviesService: MovieService, private doom: DomSanitizer) {}

  ngOnInit() {
    this.SetTopPage();
    this.SetThamSo();
    this.GetPhim();

    $("#Footer").css("margin-bottom","0");
  }

  //Set tham so de lay lich chieu
  SetThamSo() {
    this.paramsSub1 = this.activatedRoute.queryParams.subscribe(thamso => {
      this.MovieID = thamso['id'];
      this.MaNhom = thamso['groupid']
    });
  }

  GetPhim() {
    this.paramsSub2 = this.moviesService.LayChiTietPhim_LichChieuTheoNhom(this.MovieID, this.MaNhom).subscribe((result: any) => {
      this.MovieDetail = result;
    }, error => {
      this.MovieDetail = error;
    });
  }

  thongtin(title, url) {
    this.tenphim = title;
    this.urlPhim = this.doom.bypassSecurityTrustResourceUrl(url);
  }

  //Auto top
  SetTopPage() {
    $(".bookticket").on("click", function (e) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: $($(this).attr('href')).offset().top
      }, 500, 'linear');
    })
  }

  ngOnDestroy() {
    this.paramsSub1.unsubscribe();
    this.paramsSub2.unsubscribe();
  }

}