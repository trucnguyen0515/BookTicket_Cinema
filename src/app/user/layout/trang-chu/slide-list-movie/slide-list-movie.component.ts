import {
  Component,
  OnInit,
  Sanitizer,
  ViewChild
} from '@angular/core';
import {
  Movie
} from '../../../../Models/Movie';
import {
  MovieService
} from '../../../../Services/movie.service';
import {
  Router
} from '@angular/router';

import {
  DomSanitizer
} from '@angular/platform-browser';
import { OwlCarousel } from 'ngx-owl-carousel';




declare var $: any;

@Component({
  selector: 'app-slide-list-movie',
  templateUrl: './slide-list-movie.component.html',
  styleUrls: ['./slide-list-movie.component.scss']
})
export class SlideListMovieComponent implements OnInit {

  private MaNhom: string = 'GP07';

  //url hinh anh
  private urlHost: string = 'http://sv.myclass.vn/Images/Movies/';

  //Đối tượng nhận dữ liệu trả về khi gọi đến server
  public DanhSachPhimSapChieu = [];
  public DanhSachPhimDangChieu = [];
  private DanhSachPhim;
  

  private DanhSachChiTietPhim: Array<any> = [];

  private tenphim: any;
  public urlPhim: any;
  private url: any;

  public check: boolean = false;

  customOptions: any = {
    margin: 20,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    nav: true,
    responsive: {
      0: {
        items: 2
      },
      550: {
        items: 3
      },
      940: {
        items: 4
      }
    },
  }



  constructor(private servicePhim: MovieService, private router: Router, private doom: DomSanitizer) {
  }

  ngOnInit() {
    this.GetPhim();
  }

  activeSlide(){
    this.check = true;
  }



  XemChiTiet(phimID, groupID) {
    this.router.navigate(['Home/ChiTietPhim'], {
      queryParams: {
        id: phimID,
        groupid: this.MaNhom
      }
    });
  }

  thongtin(title, url) {
    url = url.replace("watch?v=", "embed/");
    this.tenphim = title;
    this.urlPhim = this.doom.bypassSecurityTrustResourceUrl(url);
  }

  SetStorage(result) {
    localStorage.removeItem("DanhSachPhim");
    localStorage.setItem("DanhSachPhim", JSON.stringify(result));
  }

  GetPhim() {
    this.servicePhim.LayDanhSachPhim().subscribe((result: Array<any>) => {
      this.DanhSachPhim = result;
      this.PhanLoaiPhim(result);     
    })
  }

  PhanLoaiPhim(kq) {
    for (let i = 0; i < kq.length; i++) {
      this.servicePhim.LayChiTietPhim_LichChieu(kq[i].ID).subscribe(result => {

        if (result.ShowTimes === null) {
          this.DanhSachPhimSapChieu.push(result);
        } else {
          this.DanhSachPhimDangChieu.push(result);
        }

      });
    }
  }


 
 


 

}