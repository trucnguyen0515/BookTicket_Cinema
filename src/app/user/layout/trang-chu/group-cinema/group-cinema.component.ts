import { Component, OnInit } from '@angular/core';
import { Movie } from '../../../../Models/Movie';
import { MovieService } from '../../../../Services/movie.service';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-group-cinema',
  templateUrl: './group-cinema.component.html',
  styleUrls: ['./group-cinema.component.scss']
})
export class GroupCinemaComponent implements OnInit {

  private MaNhom:string = 'GP07';

  //url hinh anh
  private urlHost:string = 'http://sv.myclass.vn/Images/Movies/';

  //Đối tượng nhận dữ liệu trả về khi gọi đến server
  public DanhSachPhim; 
  private DanhSachChiTietPhim:any;

  XemChiTiet(phimID,groupID)
  {
    this.router.navigate(['Home/ChiTietPhim'],{queryParams:{id:phimID,groupid:groupID}});
  }

  constructor(private servicePhim:MovieService, private router:Router) { 
  }

  ngOnInit() {
    this.GetPhim();
    this.ScrollBar();
  }

  GetPhim()
  {
    this.servicePhim.LayDanhSachPhim().subscribe((result:any)=>{ 
      this.DanhSachPhim = result;
      console.log(this.DanhSachPhim)
    },error => {
      this.DanhSachPhim = error;
    });  
  }

  // Tạo Scroll Sidebar Left
  ScrollBar()
  {
    $(".lichchieu").niceScroll({
      cursorcolor: 'silver',
      cursorwidth: 4,
      cursorborder: 'none'
    });
  }

}
