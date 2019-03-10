import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter
} from '@angular/core';
import {
  MovieService
} from '../../../Services/movie.service';
import {
  Subscription
} from 'rxjs/Subscription';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { Tickets } from '../../../Models/Tickets';
import { DSGheSeDat } from '../../../Models/DSGheSeDat';
import { ThongTinCheckout } from '../../../Models/ThongTinCheckout';

declare var $: any;

@Component({
  selector: 'app-trang-dat-ve',
  templateUrl: './trang-dat-ve.component.html',
  styleUrls: ['./trang-dat-ve.component.scss']
})
export class TrangDatVeComponent implements OnInit {

  public IDShowTime: any;
  public IDMovie: any;
  public MaNhom: any;
  public urlHost: string = 'http://sv.myclass.vn/Images/Movies/';
  public MovieDetail: any;

  public dsGhe: Array < any > ;
  public dsThongTinGhe;
  public dsThongTinGheSeDat:DSGheSeDat = new DSGheSeDat();
  public dsttghe: Array < any > ;
  public tickets:Tickets = new Tickets();
  public ThongTinCheckout:ThongTinCheckout = new ThongTinCheckout();

  public paramsSub1: Subscription;
  public paramsSub2: Subscription;
  public paramsSub3: Subscription;

  public GioChieu: any;
  public NgayChieu: any;
  public imgMovie: any;
  public titleMovie: any;
  public desMovie: any;
  public TenRap: any;
  public TenChuThe:any;

  public SoLuongVe: number = 0;
  public SoLuongCombo: number = 0;
  public GiaVe: number = 0;
  public GiaCombo: number = 0;
  public TongTien: number = 0;

  public status:boolean;

  public loi2;

  public arrGheDuocChon: Array < any > = new Array < any > ();

  @Output() eventSoLuongVe = new EventEmitter;

  GetQtyVe(soluongVe) {
    this.SoLuongVe = soluongVe;
    this.GiaVe = soluongVe * 85;
    this.TongTien = this.GiaCombo + this.GiaVe;
    this.eventSoLuongVe.emit(soluongVe);
  }

  GetQtyCombo(soluongCombo) {
    this.SoLuongCombo = soluongCombo;
    this.GiaCombo = soluongCombo * 40;
    this.TongTien = this.GiaCombo + this.GiaVe;
  }

  constructor(public router: Router, public movieService: MovieService, public activatedRoute: ActivatedRoute) {}

  ngOnInit() {

  


    //Disable menu 
    $(".menu2").addClass("disable");
    $(".menu3").addClass("disable");

    // Animation when scroll
    $("body").on('scroll', function () {
      $(".headerDatVe").css("box-shadow", "0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12)");
    });

    this.StickyTop();
    this.HideComponent();
    this.GetThamSo();
    this.GetDanhSachGhe();
    this.GetImagePhim();

    //disable ThanhToan1
    if(this.dsThongTinGhe == undefined)
    {
      $(".ThanhToan").addClass("disable");
    }

    //Disable ThanhToan2
    $(".ThanhToan2").addClass("disable");

  }


  ThongTinThanhToan(value:boolean)
  {
    if(value == false)
    {
      $(".ThanhToan2").addClass("disable");
    }
    else
    {
      $(".ThanhToan2").removeClass("disable");
    }
  }

  CheckLoi(loi)
  {
    console.log(loi);
    if(loi != 0){
      $(".ThanhToan").addClass("disable2");
    }
    else
    {
      $(".ThanhToan").removeClass("disable2");
    }
  }

  thongtinghe(dsGheDuocChon) {
     var json = JSON.parse(dsGheDuocChon);
     this.dsThongTinGhe = json;
     console.log(this.dsThongTinGhe);
    for (let i = 1; i < this.dsThongTinGhe.length; i++) {
      let string = ",";
      var kq = this.dsThongTinGhe[i].SeatName.concat(string);
      this.dsThongTinGhe[i].SeatName = kq;
    }

    if(this.dsThongTinGhe.length == this.SoLuongVe)
    {
      $(".ThanhToan").removeClass("disable");
    }
    else
    {
      $(".ThanhToan").addClass("disable");
    }
  }

  quaylai() {
    this.router.navigate(['']);
  }

  thanhtoan() {
    var kqJson = localStorage.getItem("localUser");
    if(kqJson == null || kqJson == undefined)
    {
      $("#login2").trigger("click")
    }
    else
    {
      $(".menu3").removeClass("disable");
      $(".menu3").trigger("click");
      $(".menu1").addClass("disable");
      $(".menu2").addClass("disable");
      $(".ThanhToan").hide();
      $(".ThanhToan2").show();
    }
  }

  thanhtoan2() {
    $(".spinner").show();

    var kqJson = localStorage.getItem("localUser");
    if(kqJson == null || kqJson == undefined)
    {
      $(".login").trigger("click")
    }
    else
    {

      setTimeout(() => {
        let ttUser = JSON.parse(kqJson);     
        this.dsThongTinGhe.forEach(ghe => {
          this.dsThongTinGheSeDat.Tickets.push({SeatID:ghe.SeatID,Price:ghe.Price});
        })
        this.tickets = {GroupID:ttUser.GroupID,ShowTimeID:this.IDShowTime,UserID:ttUser.UserName,Tickets:this.dsThongTinGheSeDat.Tickets}
        console.log(this.tickets);
        this.movieService.DatVe(this.tickets).subscribe(result =>{
        console.log(result);
        $(".spinner").hide();
        });
  
        this.ThongTinCheckOut();
        this.router.navigate(["Home/Checkout"]);
        
      }, 2000);
    }
  }

  ThongTinCheckOut()
  {
    localStorage.removeItem("ThongTinCheckout");
    this.ThongTinCheckout.TenPhim = this.titleMovie;
    this.ThongTinCheckout.TenRap = this.TenRap;
    this.ThongTinCheckout.NgayChieu = this.NgayChieu;
    this.ThongTinCheckout.Suat = this.GioChieu;
    this.ThongTinCheckout.GheNgoi = this.dsThongTinGhe;
    this.ThongTinCheckout.TongTien = this.TongTien;
    this.ThongTinCheckout.TenNguoiGD = this.TenChuThe;
    var json = JSON.stringify(this.ThongTinCheckout);
    localStorage.setItem("ThongTinCheckout",json);
  }
  TenNguoiGD(kq)
  {
    this.TenChuThe = kq.value;
  }

  previous() {
    $(".menu2").addClass("disable");
    $("#counter").text("");
    $("button.ThanhToan").hide();
  }

  StickyTop() {
    // Sticky top
    window.onscroll = function () {
      myFunction();
    };

    // Sticky top
    var header = document.getElementById("headerDatVe");
    var sticky = header.offsetTop;

    function myFunction() {

      var a = $(".headerDatVe");

      if (window.pageYOffset > sticky) {

        a.css("box-shadow", "0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12)");
        a.css("background", "#1a202c");

      } else {

        a.css("box-shadow", "none");
        a.css("background", "transparent");

      }
    }
  }

  HideComponent() {
    $("#myNav").hide();
    $("#logoMovie").hide();
    $("#Footer").hide();
    $(".ThanhToan").hide();
    $(".ThanhToan2").hide();
    $("#HeaderNew").hide();

  }

  ShowComponent(){
    $("#myNav").show();
    $("#logoMovie").show();
    $("#Footer").show();
    $(".ThanhToan").show();
    $(".ThanhToan2").show();
  }

  GetThamSo() {
    this.paramsSub1 = this.activatedRoute.queryParams.subscribe(thamso => {
      this.IDShowTime = thamso['idShow'];
      this.IDMovie = thamso['idPhim'];
      this.MaNhom = thamso['group'];
      this.NgayChieu = thamso['ngaychieu'];
      this.GioChieu = thamso['giochieu'];
      this.TenRap = thamso['tenrap'];
    });
  }

  GetDanhSachGhe() {
    this.paramsSub2 = this.movieService.LayDanhSachGhe(this.IDShowTime).subscribe(result => {
      this.dsGhe = result;
    }, error => {
      this.dsGhe = error;
    });
  }

  GetImagePhim() {
    //Lay Image phim
    this.paramsSub3 = this.movieService.LayChiTietPhim_LichChieuTheoNhom(this.IDMovie, this.MaNhom).subscribe((result: any) => {
      this.MovieDetail = result;
      this.imgMovie = result.Image;
      this.titleMovie = result.Title;
      this.desMovie = result.Description;
    }, error => {
      this.MovieDetail = error;
    });
  }

  ngOnDestroy() {
    this.paramsSub1.unsubscribe();
    this.paramsSub2.unsubscribe();
    this.paramsSub3.unsubscribe();

  }

}