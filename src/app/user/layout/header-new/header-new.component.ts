import { Component, OnInit } from '@angular/core';
import { ThongBaoService } from '../../../Services/thong-bao.service';
import {
  Router
} from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-header-new',
  templateUrl: './header-new.component.html',
  styleUrls: ['./header-new.component.scss']
})
export class HeaderNewComponent implements OnInit {

  constructor(private router: Router) { }


  chuyentrang() {
    this.router.navigate(['/Home'])
  }


  ngOnInit() {

  }

  

}
