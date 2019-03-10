import { Component, Output, OnInit, Input,EventEmitter } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-ghe',
  templateUrl: './ghe.component.html',
  styleUrls: ['./ghe.component.scss']
})
export class GheComponent implements OnInit {

  private TrangThaiGheChon:boolean = true;

  // @Input() dsGheChon:Array<any>;
  @Input() ghe:any;
  @Output() eventChonGhe = new EventEmitter();


  constructor() { }

  ChonGhe()
  {
    this.ghe.selected = !this.ghe.selected;
    this.eventChonGhe.emit(this.ghe);
  }

  ngOnInit() {
   
  }

}
