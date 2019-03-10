import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MovieService } from '../../../Services/movie.service';
import { Subscription } from 'rxjs/Subscription';
import { LichChieu } from '../../../Models/LichChieu';
import { GioChieu } from '../../../Models/GioChieu';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-quick-book',
  templateUrl: './quick-book.component.html',
  styleUrls: ['./quick-book.component.scss']
})
export class QuickBookComponent implements OnInit {

  formBooking: FormGroup;
  TenRap: FormControl;
  TenPhim: FormControl;
  NgayChieu: FormControl;
  SuatChieu: FormControl;

  public dsphim:any;
  public MaNhom = "GP07";
  public MovieID = 0;

  public trangthai:boolean;

  public arrLichChieu: any = [];
  public LichChieu = new LichChieu();
  public GioChieu = new GioChieu();
  public SuatTheoNgay:any;
  public ngaychieu;
  public giochieu;
  public tenrap;
  public idrap;

  public dsrap:any = [
    {ten:"GALAXY"},
    {ten:"CGV"},
    {ten:"LOTTE"},
    {ten:"MEGASTAR"},
  ];

  constructor(public moviesService:MovieService, public router:Router) {}

  ngOnInit() {
    this.createFormControl();
    this.createForm();
    this.getStorage();
    this.onChange();

    $(".BookResponsive").hide();
  }

 
  onChange()
  {
   
    //Lấy ID phim khi giá trị thay đổi
    this.formBooking.get('TenPhim').valueChanges.subscribe(id => {
      this.MovieID = id;

      //Reset form khi tên phim thay đổi
      this.formBooking.get('NgayChieu').reset();
      this.formBooking.get('SuatChieu').reset();
      this.arrLichChieu = [];
      this.LichChieu = new LichChieu();
      this.GioChieu = new GioChieu();

      if(this.MovieID != 0)
      {
        //Mỗi lần thay đổi phim sẽ thay đổi lịch chiếu
        this.moviesService.LayChiTietPhim_LichChieuTheoNhom(this.MovieID, this.MaNhom).subscribe((result: any) => {
          if(result.ShowTimes != null)
          {    
            for (let i = 0; i < result.ShowTimes.length; i++) {
              let ShowTimes = result.ShowTimes[i];
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
          }
        });
        //Mỗi lần thay đổi phim sẽ thay đổi lịch chiếu
      }
      //if
    });
    // Lấy ID phim


     //Lấy suất chiếu
     this.formBooking.get('NgayChieu').valueChanges.subscribe(suat => {
      this.ngaychieu = suat;
      for(let i = 0; i< this.arrLichChieu.length; i++){
          if(suat == this.arrLichChieu[i].NgayChieu){
            this.SuatTheoNgay = this.arrLichChieu[i].Suat;
          }
        }
      });
     //Lấy suất chiếu


     //Lấy thông tin của Suất chiếu
     this.formBooking.get('SuatChieu').valueChanges.subscribe(ttsuat => {
       if(this.SuatTheoNgay != undefined){
         console.log(this.SuatTheoNgay);
        for(let i = 0; i< this.SuatTheoNgay.length; i++){
          if(ttsuat == this.SuatTheoNgay[i].ShowTimeID){
            this.tenrap = this.SuatTheoNgay[i].TenRap;
            this.idrap = this.SuatTheoNgay[i].IDRap;
          }
        }
       }
      });


      // Khi form hợp lệ sẽ tiến hành qua trang đặt vé
      this.formBooking.valueChanges.subscribe(val => {
        if(this.formBooking.valid == true){
          let ShowTimeID = this.formBooking.get('SuatChieu').value;
          for(let i = 0; i < this.SuatTheoNgay.length; i++){
            if(ShowTimeID == this.SuatTheoNgay[i].ShowTimeID){
              this.giochieu = this.SuatTheoNgay[i].GioChieu;
            }
          }
          setTimeout(() => {
            this.DatVe(ShowTimeID,this.ngaychieu,this.giochieu);
          }, 500);
        }
      });
  }

 
  DatVe(ShowTimeID, ngaychieu, giochieu) {
    $(".close").trigger("click");
    this.router.navigate(['Home/DatVe'], {
      queryParams: {
        idShow: ShowTimeID,
        idPhim: this.MovieID,
        group: this.MaNhom,
        ngaychieu: ngaychieu,
        giochieu: giochieu,
        tenrap: this.tenrap
      }
    });
  }

  getStorage()
  {
    var storage = localStorage.getItem("DanhSachPhim");
    this.dsphim = JSON.parse(storage);
  }

  createFormControl()
  {
      this.TenRap = new FormControl('',[Validators.required]),
      this.TenPhim =  new FormControl('',[Validators.required]),
      this.NgayChieu = new FormControl('',[Validators.required]),
      this.SuatChieu = new FormControl('',[Validators.required])
  }
  createForm()
  {
    this.formBooking = new FormGroup({
      TenRap: this.TenRap,
      TenPhim: this.TenPhim,
      NgayChieu: this.NgayChieu,
      SuatChieu:this.SuatChieu,
    })
  }

}
