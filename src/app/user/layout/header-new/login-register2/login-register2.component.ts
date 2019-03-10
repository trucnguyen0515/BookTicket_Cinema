import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../Services/user.service';

@Component({
  selector: 'app-login-register2',
  templateUrl: './login-register2.component.html',
  styleUrls: ['./login-register2.component.scss']
})
export class LoginRegister2Component implements OnInit {

  constructor(public userService:UserService) { }

  public statusLogin:boolean = false;
  public TenUser:any;

  ngOnInit() {
    this.CheckLogin();

  }

  ThongTinUser(thongtin){
    if(thongtin != null){
      this.statusLogin = true;
      this.TenUser = thongtin.FullName;
    }
    else{
      this.statusLogin = false;
    }
  }

  DangXuat(event)
  {
    this.userService.DangXuat();
    event.preventDefault();
  }

  CheckLogin()
  {
    if(this.userService.CheckLogin() == true)
    {
      this.statusLogin = true;
      let ThongTinUser = this.userService.LayThongTinUser();
      this.TenUser = ThongTinUser.FullName;
    }
    else
    {
      this.statusLogin = false;
    }
  }

}
