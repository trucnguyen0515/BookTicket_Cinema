import { Component, OnInit } from '@angular/core';
import { ThongTinCheckout } from '../../../Models/ThongTinCheckout';

declare var $:any;

@Component({
  selector: 'app-trang-checkout',
  templateUrl: './trang-checkout.component.html',
  styleUrls: ['./trang-checkout.component.scss']
})
export class TrangCheckoutComponent implements OnInit {

  constructor() { }

  public MangUser:any;
  public ThongTinCheckOut:ThongTinCheckout = new ThongTinCheckout;
  public dsghengoi:any = [];

  ngOnInit() {
    this.ShowComponent();
    this.LocalStorage();
    
  }

  LocalStorage()
  {
    var json = localStorage.getItem("ThongTinCheckout");
    var kq = JSON.parse(json)
    this.ThongTinCheckOut = kq;
    console.log(this.ThongTinCheckOut);
    for (let i = 1; i < this.ThongTinCheckOut.GheNgoi.length; i++) {
      let string = ",";
      var kq = this.ThongTinCheckOut.GheNgoi[0].SeatName.concat(string);
      this.ThongTinCheckOut.GheNgoi[0].SeatName = kq;
      break;
    }
  }

  ShowComponent()
  {
    $("#HeaderNew").show();
    $("#HeaderNew").css({
      "box-shadow":"none"
    })
    $("#Footer").show();
    $("#Footer").css({
      "margin-bottom":"0"
    })
  }

}
