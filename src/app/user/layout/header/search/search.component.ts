import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../../../Services/movie.service';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(public servicePhim:MovieService, public router: Router) {
   }

  public dsPhim = [];
  public urlHost: string = 'http://sv.myclass.vn/Images/Movies/';
  public MaNhom: string = 'GP07';
  public IDphim;
  public dschon = [];
  public trangthai = false;


  ngOnInit() {
    this.GetLocalPhim();

    function search()
    {
      alert("a");
    }

  }

  SearchPhim(){
    let kq = $(".inputSearch").val();
    let kqsearch:any = this.servicePhim.SearchPhim(this.dsPhim,kq);
    this.dschon = kqsearch;
    if(kqsearch == []){
      this.trangthai = false;
    }else{
      this.trangthai = true;
    }
  }

  
  XemChiTiet(phimID,event) {
    $(".modal").trigger("click");

        this.router.navigate(['Home/ChiTietPhim'], {
          queryParams: {
            id: phimID,
            groupid: this.MaNhom
          }
        });
      // location.reload();
      event.preventDefault();
  }




  GetLocalPhim(){
    let StoPhim = localStorage.getItem("DanhSachPhim");
    this.dsPhim = JSON.parse(StoPhim);
    

    $(".bodycontent").niceScroll({
			cursorcolor: 'silver',
			cursorwidth: 4,
			cursorborder: 'none'
    });
  }

}
