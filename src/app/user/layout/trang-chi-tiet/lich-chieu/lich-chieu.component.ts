import {
  Component,
  OnInit
} from '@angular/core';
import {
  MovieService
} from '../../../../Services/movie.service';
import {
  Subscription
} from 'rxjs/Subscription';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

import {
  LichChieu
} from "../../../../Models/LichChieu";
import {
  GioChieu
} from "../../../../Models/GioChieu";

declare var $: any;

@Component({
  selector: 'app-lich-chieu',
  templateUrl: './lich-chieu.component.html',
  styleUrls: ['./lich-chieu.component.scss']
})
export class LichChieuComponent implements OnInit {

  private urlHost: string = 'http://sv.myclass.vn/Images/Movies/';
  private MovieDetail: any = {};
  private MovieID: number;
  private MaNhom: any;

  public trangthai:boolean;

  private arrLichChieu: any = [];
  private LichChieu = new LichChieu();
  private GioChieu = new GioChieu();


  // private obKey:any = Object.keys;
  // private obVal:any = Object.values;

  private paramsSub1: Subscription;
  private paramsSub2: Subscription;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private moviesService: MovieService) {}


  DatVe(ShowTimeID, ngaychieu, giochieu,tenrap,event) {
    this.router.navigate(['Home/DatVe'], {
      queryParams: {
        idShow: ShowTimeID,
        idPhim: this.MovieID,
        group: this.MaNhom,
        ngaychieu: ngaychieu,
        giochieu: giochieu,
        tenrap: tenrap,
      }
    });
  }


  //Lấy chi tiết phim lịch chiếu dựa vào 2 tham số
  SetThamSo() {
    this.paramsSub1 = this.activatedRoute.queryParams.subscribe(thamso => {
      this.MovieID = thamso['id'];
      this.MaNhom = thamso['groupid']
    });
  }

  GetLichChieu() {
    this.paramsSub2 = this.moviesService.LayChiTietPhim_LichChieuTheoNhom(this.MovieID, this.MaNhom).subscribe((result: any) => {

      this.MovieDetail = result;
      
      if(result.ShowTimes != null)
      {
        this.trangthai = true;
  
        for (let i = 0; i < this.MovieDetail.ShowTimes.length; i++) {
          let ShowTimes = this.MovieDetail.ShowTimes[i];
          if(i == 0){
            this.LichChieu.NgayChieu = ShowTimes.DateReady;
            this.GioChieu.GioChieu = ShowTimes.StartDate;
            this.GioChieu.ShowTimeID = ShowTimes.ShowTimeID;
            this.GioChieu.IDRap = ShowTimes.CinimaRoom.CinimaRoomID;
            this.GioChieu.TenRap = ShowTimes.CinimaRoom.CinimaRoomName;
            this.LichChieu.Suat.push(this.GioChieu);
            this.arrLichChieu.push(this.LichChieu);
          } else {
            if(this.LichChieu.NgayChieu == ShowTimes.DateReady){
              this.GioChieu = new GioChieu();
              this.GioChieu.GioChieu = ShowTimes.StartDate;
              this.GioChieu.ShowTimeID = ShowTimes.ShowTimeID;
              this.GioChieu.IDRap = ShowTimes.CinimaRoom.CinimaRoomID;
              this.GioChieu.TenRap = ShowTimes.CinimaRoom.CinimaRoomName;
              this.LichChieu.Suat.push(this.GioChieu);
            } else {
              this.LichChieu = new LichChieu();
              this.GioChieu = new GioChieu();
              this.LichChieu.NgayChieu = ShowTimes.DateReady;
              this.GioChieu.GioChieu = ShowTimes.StartDate;
              this.GioChieu.ShowTimeID = ShowTimes.ShowTimeID;
              this.GioChieu.IDRap = ShowTimes.CinimaRoom.CinimaRoomID;
              this.GioChieu.TenRap = ShowTimes.CinimaRoom.CinimaRoomName;
              this.LichChieu.Suat.push(this.GioChieu);
              this.arrLichChieu.push(this.LichChieu);
            }
          }
        }
      }else{
        this.trangthai = false;
      }

      //Auto active first li a
      setTimeout(function () {
        var a = $("a[href='#homechau1']");
        a.trigger('click');
      }, 1);

    }, error => {
      this.MovieDetail = error;
    });
  }

  ngOnInit() {
    this.SetThamSo();
    this.GetLichChieu();

    // this.MovieDetail.ShowTimes_modified = {};        
    // this.MovieDetail.ShowTimes.forEach((showTime, idx, list)=>{
    //     this.MovieDetail.ShowTimes_modified[showTime.DateReady] 
    //     = this.MovieDetail.ShowTimes_modified[showTime.DateReady] || [];

    //     this.MovieDetail.ShowTimes_modified[showTime.DateReady].push(showTime.StartDate);
    // })

    //this.MovieDetail.ShowTimes_modified = {};
    //this.MovieDetail.ShowTimes_modified = new Map()


    // for(let i = 0; i < this.MovieDetail.ShowTimes.length; i++)
    // {
    //     let showTime = this.MovieDetail.ShowTimes[i];

    //     if(!this.arrLichChieu[showTime.DateReady]) {
    //         this.arrLichChieu[showTime.DateReady] = [];
    //     };

    //     this.arrLichChieu[showTime.DateReady].push(showTime.StartDate);
    // }

    // console.log(this.obVal(this.arrLichChieu));
  }


  ngOnDestroy() {
    this.paramsSub1.unsubscribe();
    this.paramsSub2.unsubscribe();
  }

}