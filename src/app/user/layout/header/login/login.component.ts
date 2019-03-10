import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserLogin } from '../../../../Models/UserLogin';
import { Router } from '@angular/router';
import { UserService } from '../../../../Services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ThongBaoService } from '../../../../Services/thong-bao.service';

declare var $:any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() ThongTinUser = new EventEmitter();

  private UserLogin:UserLogin;
  private ThongTin;
  public Groups = "GP07";


  constructor(private router:Router, private userService:UserService, private thongbao:ThongBaoService) { }
  
  myform: FormGroup;
  UserName: FormControl;
  PassWord: FormControl;

  ngOnInit() {
    this.createFormControl();
    this.createForm();
  }

  Login(userLogin:UserLogin,event)
  {
    if(this.myform.valid)
    {
      $(".spinner").show();

      setTimeout(() => {
        userLogin.GroupID = this.Groups;
      this.userService.DangNhap(userLogin).subscribe((result) => {
        this.ThongTin = result;
        if(result == "The account or password is incorrect"){
          this.thongbao.Error("Sai tài khoản hoặc mật khẩu!");
        }else {
          this.ThongTinUser.emit(result);
          console.log(this.ThongTin);
        }
        $(".spinner").hide();

      
      }, error => {
        this.ThongTin = error;
        console.log(this.ThongTin);
      });
      event.preventDefault();
      }, 1000);

      
    }
    else
    {
      this.validateAllFormFields(this.myform);
    }
  }

  // validate when submit
  validateAllFormFields(formGroup: FormGroup) {        
    Object.keys(formGroup.controls).forEach(field => { 
      const control = formGroup.get(field);             
      if (control instanceof FormControl) {             
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {        
        this.validateAllFormFields(control);            
      }
    });
  }

  createFormControl()
  {
      this.UserName = new FormControl('',[
      Validators.required,
      ]),
      this.PassWord =  new FormControl('',[
      Validators.required
      ])
  }

  createForm()
  {
    this.myform = new FormGroup({
      UserName: this.UserName,
      PassWord: this.PassWord,
    })
  }

}
