import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  state
} from '@angular/core';
import {
  Subscription
} from 'rxjs/Subscription';
import {
  MovieService
} from '../../../../Services/movie.service';
import {
  ActivatedRoute
} from '@angular/router';
import {
  dsGheNhom
} from '../../../../Models/dsGheNhom';
import {
  Alert
} from 'selenium-webdriver';
import { ThongBaoService } from '../../../../Services/thong-bao.service';


declare var $: any;

@Component({
  selector: 'app-danh-sach-ghe',
  templateUrl: './danh-sach-ghe.component.html',
  styleUrls: ['./danh-sach-ghe.component.scss']
})
export class DanhSachGheComponent implements OnInit {

  public dsGhe: any = [];
  public dsGheChon: any = [];
  public dsGheDaDat:any = [];
  public dsGheCheckSpace:any = [];

  public IDShowTime: any;
  public MaGhe: string;
  public TenGhe: string;

  public paramsSub1: Subscription;
  public paramsSub2: Subscription;

  public timer: any;
  public minutes: number;
  public seconds: number;
  public duration: number = 60 * 5;

  public stt: number = 0;
  public tong: any = 0;
  public checklength: number = 0;

  public kebenphaibandau;
  public kebentraibandau;
  public khoangcachtraibandau;
  public khoangcachphaibandau;

  public kebenphai;
  public kebentrai;
  public khoangcachtrai;
  public khoangcachphai;

  public kebenphai2 = 0;
  public kebentrai2 = 0;
  public khoangcachtrai2 = 0;
  public khoangcachphai2 = 0;

  public kebenphaitrai = 0;

  public hientai = 0;

  public errors: boolean = true;


  @Output() ThongTinGhe = new EventEmitter();
  @Output() TrangThai = new EventEmitter();
  @Output() Loi = new EventEmitter();
  @Input() SoLuongVe: number;

  constructor(public movieService: MovieService, public activatedRoute: ActivatedRoute, public thongbao:ThongBaoService) {}

  ChonGheOutput(ghe) {
    let sove = this.SoLuongVe;
    if (ghe.selected == true) {
      if (this.dsGheChon.length >= sove) {
        let xoaghe = this.dsGheChon.splice(0, 1);
        this.dsGhe.Seats.forEach((ghe) => {
          if (xoaghe[0].SeatName == ghe.SeatName) {
            ghe.selected = false;
          }
        });
      }
      this.dsGheChon.push(ghe);

    } else {
      for (let j = 0; j < this.dsGheChon.length; j++) {
        if (this.dsGheChon[j].SeatName == ghe.SeatName) {
          this.dsGheChon.splice(j, 1);
        }
      }
    }

    this.CheckKhoangTrong();

    let objson = JSON.stringify(this.dsGheChon)
    this.ThongTinGhe.emit(objson);
  }

  CheckKhoangTrong() {
    let errors = 0;
    let khoangcachphai = 0;
    let khoangcachtrai = 0;
    let loaitruoc;
    let loaicheck;
    let sttloaitruoc;
    let sttloaitruoc2;



    this.dsGheCheckSpace = [];
    for(let j = 0; j < this.dsGheDaDat.length;j++)
    {
      this.dsGheCheckSpace.push(this.dsGheDaDat[j]);
    }
    for(let i = 0; i < this.dsGheChon.length; i++)
    {
      this.dsGheCheckSpace.push(this.dsGheChon[i]);
    }
    this.dsGheCheckSpace.sort((a, b) => a.NumOrder - b.NumOrder);
    console.log(this.dsGheCheckSpace);


    for (let i = 0; i < this.dsGheCheckSpace.length; i++) {
      let stthientai = this.dsGheCheckSpace[i].SoThuTu;
      let loaihientai = this.dsGheCheckSpace[i].LoaiGhe;
      let tenghehientai = this.dsGheCheckSpace[i].SeatName;

     

      if (i == 0) {
        khoangcachphai = stthientai + 2;
        loaitruoc = this.dsGheCheckSpace[i].LoaiGhe;
        sttloaitruoc = stthientai;

        //Check lần đầu có khoảng trống đầu dãy
        if (stthientai == 2) {
          errors = 2;
        }

      } else {
          khoangcachtrai = stthientai - 2;

        
          //Check khoảng trắng đầu mỗi dãy 
          if(loaihientai != loaitruoc){
            if(stthientai == 2){
              errors = 2;
            }
            if(sttloaitruoc == 9){
              errors = 2;
            }
            sttloaitruoc = stthientai
          } 
          else {
            sttloaitruoc = stthientai;
          }


          //Check khoảng cách trái phải
          if (tenghehientai == loaitruoc+this.khoangcach(khoangcachphai)) {
            khoangcachphai = stthientai + 2;
            loaitruoc = loaihientai;
            errors = 1;
          } else {
            khoangcachphai = stthientai + 2;
            loaitruoc = loaihientai;
          }
          if (stthientai == khoangcachtrai) {
            errors = 1;
          }
      }
      
      if (i == this.dsGheCheckSpace.length - 1) {
        //Check lần đầu có khoảng trống cuối dãy
        if (stthientai == 9) {
          errors = 2;
        }
      }
      
    }

    if (errors == 1) {
      this.thongbao.Error("Không để 1 chỗ trống ở giữa!");
    }
    else if (errors == 2) {
      this.thongbao.Error("Không để 1 chỗ trống ở đầu dãy!");
    }
    else
    {
      this.thongbao.clear();
    }

    this.Loi.emit(errors);
    console.log(errors);
  }

  khoangcach(so){
    if(so < 10){
      return "0"+so;
    }else{
      return so;
    }
  }



  SetThamSo() {
    //Lấy danh sach ghe  dựa vào 1 tham số
    this.paramsSub1 = this.activatedRoute.queryParams.subscribe(thamso => {
      this.IDShowTime = thamso['idShow'];
    });
  }

  GetDanhSachGhe() {
    // Lay danh sach ghe
    this.paramsSub2 = this.movieService.LayDanhSachGhe(this.IDShowTime).subscribe(result => {
      this.dsGhe = result;
      let sttA = 1;
      let sttB = 1;
      let sttC = 1;

      for (let i = 0; i < this.dsGhe.Seats.length; i++) {
        //Phan loai 
        let getString = this.dsGhe.Seats[i].SeatName.charAt(0);
        if (getString == "A") {
          this.dsGhe.Seats[i].LoaiGhe = "A";
          this.dsGhe.Seats[i].SoThuTu = sttA;
          sttA++;
        }
        if (getString == "B") {
          this.dsGhe.Seats[i].LoaiGhe = "B";
          this.dsGhe.Seats[i].SoThuTu = sttB;
          sttB++;
        }
        if (getString == "C") {
          this.dsGhe.Seats[i].LoaiGhe = "C";
          this.dsGhe.Seats[i].SoThuTu = sttC;
          sttC++;
        }

        //Check ghe da dat
        let tinhtrang = this.dsGhe.Seats[i].UserName;
        if(tinhtrang != "no people booked"){
          this.dsGheDaDat.push(this.dsGhe.Seats[i]);
        }

      }

      console.log(this.dsGheDaDat);
      console.log(this.dsGhe);
    });
  }

  ngOnInit() {
    this.SetThamSo();
    this.GetDanhSachGhe();
  }

}