import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-trang-chu',
  templateUrl: './trang-chu.component.html',
  styleUrls: ['./trang-chu.component.scss']
})
export class TrangChuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $("#myNav").show();
    $("#logoMovie").show();
    $("#Footer").show();
    $(".ThanhToan").show();
    $(".ThanhToan2").show();
  }

}
