import {
  Component,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import {
  MovieService
} from '../../../../Services/movie.service';
import {
  Subscription
} from 'rxjs/Subscription';
import {
  ActivatedRoute
} from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-chon-so-luong-ve',
  templateUrl: './chon-so-luong-ve.component.html',
  styleUrls: ['./chon-so-luong-ve.component.scss']
})
export class ChonSoLuongVeComponent implements OnInit {

  public IDShowTime: any;
  public IDMovie: any;
  public MaNhom: any;
  public urlHost: string = 'http://sv.myclass.vn/Images/Movies/';
  public MovieDetailImage: any;

  public SoLuongVe: number = 0;
  public SoLuongCombo: number = 0;
  public GiaVe: number = 85;
  public GiaCombo: number = 40;

  public dsGhe: Array < any > ;

  public paramsSub1: Subscription;
  public paramsSub2: Subscription;
  public paramsSub3: Subscription;

  @Output() LaySoLuongVe = new EventEmitter();
  @Output() LaySoLuongCombo = new EventEmitter();


  constructor(public movieService: MovieService, public activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    $(".btnclick").addClass("disable");

    this.SetThamSo();
    this.GetDanhSachGhe();
    this.GetImage();
    this.DisableClick();

  }


  next() {
    $(".ThanhToan").show();
    $(".menu2").removeClass("disable");
    $(".menu2").trigger("click");

    this.TimeLeft()
  }

  TimeLeft() {
    // Clear all timeout
    var id = window.setTimeout(function () {}, 0);
    while (id--) {
      window.clearTimeout(id);
    }

    // Time Left
    countdown(5);

    function countdown(minutes) {
      var seconds = 60;
      var mins = minutes;
      tick();

      function tick() {
        var counter = $("#counter");
        var current_minutes = mins - 1
        seconds--;
        counter.text(current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds));
        if (seconds > 0) {
          setTimeout(tick, 1000);
        } else {
          if (mins > 1) {
            countdown(mins - 1);
          }
        }
      }
    }
  }

  tangsl1() {
    this.SoLuongVe++;

    if (this.SoLuongVe >= 4) {
      $(".tangsl1").addClass("disable");
    } else {
      $(".tangsl1").removeClass("disable");
    }
    if (this.SoLuongVe == 0) {
      $(".giamsl1").addClass("disable");
      $(".btnclick").addClass("disable");
      $(".arrow").removeClass("animRun");

    } else {
      $(".giamsl1").removeClass("disable");
      $(".btnclick").removeClass("disable");
      $(".arrow").addClass("animRun");


    }

    this.LaySoLuongVe.emit(this.SoLuongVe);

  }

  giamsl1() {
    this.SoLuongVe--;
    if (this.SoLuongVe >= 4) {
      $(".tangsl1").addClass("disable");
    } else {
      $(".tangsl1").removeClass("disable");
    }
    if (this.SoLuongVe == 0) {
      $(".giamsl1").addClass("disable");
      $(".btnclick").addClass("disable");
      $(".arrow").removeClass("animRun");

    } else {
      $(".giamsl1").removeClass("disable");
      $(".btnclick").removeClass("disable");
      $(".arrow").addClass("animRun");


    }

    this.LaySoLuongVe.emit(this.SoLuongVe);

  }

  tangsl2() {
    this.SoLuongCombo++;

    if (this.SoLuongCombo >= 4) {
      $(".tangsl2").addClass("disable");
    } else {
      $(".tangsl2").removeClass("disable");
    }
    if (this.SoLuongCombo == 0) {
      $(".giamsl2").addClass("disable");
    } else {
      $(".giamsl2").removeClass("disable");
    }
    this.LaySoLuongCombo.emit(this.SoLuongCombo);

  }

  giamsl2() {
    this.SoLuongCombo--;
    if (this.SoLuongCombo >= 4) {
      $(".tangsl2").addClass("disable");
    } else {
      $(".tangsl2").removeClass("disable");
    }
    if (this.SoLuongCombo == 0) {
      $(".giamsl2").addClass("disable");
    } else {
      $(".giamsl2").removeClass("disable");
    }
    this.LaySoLuongCombo.emit(this.SoLuongCombo);
  }

  SetThamSo() {
    this.paramsSub1 = this.activatedRoute.queryParams.subscribe(thamso => {
      this.IDShowTime = thamso['idShow'];
      this.IDMovie = thamso['idPhim'];
      this.MaNhom = thamso['group'];
    });
  }

  GetDanhSachGhe() {
    // Lay danh sach ghe
    this.paramsSub2 = this.movieService.LayDanhSachGhe(this.IDShowTime).subscribe(result => {
      this.dsGhe = result;
    }, error => {
      this.dsGhe = error;
    });
  }

  GetImage() {
    //Lay Image phim
    this.paramsSub3 = this.movieService.LayChiTietPhim_LichChieuTheoNhom(this.IDMovie, this.MaNhom).subscribe((result: any) => {
      this.MovieDetailImage = result;
    }, error => {
      this.MovieDetailImage = error;
    });
  }

  DisableClick() {
    // Disable click 
    if (this.SoLuongVe == 0 || this.SoLuongCombo == 0) {
      $(".giamsl1").addClass("disable");
      $(".giamsl2").addClass("disable");
    } else {
      $(".giamsl1").removeClass("disable");
      $(".giamsl2").removeClass("disable");
    }
  }



}