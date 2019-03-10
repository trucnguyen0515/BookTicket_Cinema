import { Component, OnInit, Output , EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare var $:any;

@Component({
  selector: 'app-thanh-toan',
  templateUrl: './thanh-toan.component.html',
  styleUrls: ['./thanh-toan.component.scss']
})
export class ThanhToanComponent implements OnInit {

  formThanhToan: FormGroup;
  PhuongThuc: FormControl;
  SoThe: FormControl;
  TenChuThe: FormControl;
  NgayHetHan: FormControl;
  CVV: FormControl;

  private checkTrangThai:any = [];

  @Output() ThongTinThanhToan = new EventEmitter;
  @Output() TenNguoiGD = new EventEmitter;

  constructor() { }

  ngOnInit() {
     this.createFormControl();
     this.createForm();
     this.onChange();
  }

  onChange()
  {
    this.formThanhToan.valueChanges.subscribe(val => {
        this.ThongTinThanhToan.emit(this.formThanhToan.valid);
        this.TenNguoiGD.emit(this.formThanhToan.get('TenChuThe'));
    })
  }

  createFormControl()
  {
      this.PhuongThuc = new FormControl('',[
      Validators.required,
      ]),
      this.SoThe =  new FormControl('',[
      Validators.required
      ]),
      this.TenChuThe = new FormControl('',[
      Validators.required
      ]),
      this.NgayHetHan = new FormControl('',[
      Validators.required
      ])
      this.CVV = new FormControl('',[
      Validators.required
      ])
  }

  createForm()
  {
    this.formThanhToan = new FormGroup({
      PhuongThuc: this.PhuongThuc,
      SoThe: this.SoThe,
      TenChuThe: this.TenChuThe,
      NgayHetHan:this.NgayHetHan,
      CVV:this.CVV
    })
  }

  ngayhethan()
  {
    let value = $(".ngayhethan").val();
    console.log(value);
    if(value == "")
    {
      $(".ngayhethan").attr("placeholder","MM/YY");
    }
    else
    {
      $(".ngayhethan").attr("placeholder","");
    }

    $(".ngayhethan").blur( () =>{
      $(".ngayhethan").attr("placeholder","");
    })
  }

}
