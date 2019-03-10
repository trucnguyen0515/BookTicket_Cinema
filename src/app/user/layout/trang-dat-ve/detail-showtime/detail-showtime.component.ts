import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from '../../../../Services/movie.service';
import { ThongTinCheckout } from '../../../../Models/ThongTinCheckout';

@Component({
  selector: 'app-detail-showtime',
  templateUrl: './detail-showtime.component.html',
  styleUrls: ['./detail-showtime.component.scss']
})
export class DetailShowtimeComponent implements OnInit {

  public IDShowTime:any;
  public IDMovie:any;
  public MaNhom:any;
  public urlHost: string = 'http://sv.myclass.vn/Images/Movies/';
  public MovieDetail:any;

  public dsGhe:Array<any>;

  public paramsSub1: Subscription;
  public paramsSub2: Subscription;
  public paramsSub3: Subscription;

  public GioChieu:any;
  public NgayChieu:any;
  public imgMovie:any;
  public titleMovie:any;
  public desMovie:any;
  public TenRap:any;

  public ThongTinCheckout:ThongTinCheckout = new ThongTinCheckout();


  constructor(public router: Router,public movieService:MovieService,public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.GetThamSo();
    this.GetDSGhe();
    this.GetImage();

    
  }

  


  GetThamSo()
  {
    //Lấy danh sach ghe  dựa vào 1 tham số
    this.paramsSub1  = this.activatedRoute.queryParams.subscribe(thamso=>{
      this.IDShowTime = thamso['idShow'];
      this.IDMovie = thamso['idPhim'];
      this.MaNhom = thamso['group'];
      this.NgayChieu = thamso['ngaychieu'];
      this.GioChieu = thamso['giochieu'];
      this.TenRap = thamso['tenrap'];

    });
  }

  GetDSGhe()
  {
    // Lay danh sach ghe
    this.paramsSub2 = this.movieService.LayDanhSachGhe(this.IDShowTime).subscribe(result=>{
      this.dsGhe = result;
    });
  }

  GetImage()
  {
    //Lay Image phim
    this.paramsSub3 = this.movieService.LayChiTietPhim_LichChieuTheoNhom(this.IDMovie,this.MaNhom).subscribe((result:any)=>{ 
      this.MovieDetail = result;
      this.imgMovie = result.Image;
      this.titleMovie = result.Title;
      this.desMovie = result.Description;

    },error => {
      this.MovieDetail = error;
    });  
  }

  ngOnDestroy(){
    this.paramsSub1.unsubscribe();
    this.paramsSub2.unsubscribe();
    this.paramsSub3.unsubscribe();

  }

}
