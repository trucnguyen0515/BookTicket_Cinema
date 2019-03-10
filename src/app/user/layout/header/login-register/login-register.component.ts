import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../Services/user.service';

declare var $:any;

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {

  constructor(public userService:UserService) { }

  public statusLogin:boolean = false;
  public TenUser:any;


  ngOnInit() {
    this.CheckLogin();
  }

  // ThongTinUser(ThongTinUser)
  // {
  //   if(ThongTinUser != null || ThongTinUser != undefined){
  //     this.statusLogin = true;
  //     this.TenUser = ThongTinUser.FullName;
      
  //     setTimeout(() => {
  //       $(".close").trigger("click");
  //     }, 200);
      
  //   }
  // }

 
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
