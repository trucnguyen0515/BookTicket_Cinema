import { Component, OnInit } from '@angular/core';
import { User } from '../../../../Models/User';
import { UserService } from '../../../../Services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validateConfig } from '@angular/router/src/config';
import { ThongBaoService } from '../../../../Services/thong-bao.service';


declare var $:any;

@Component({
  selector: 'app-register2',
  templateUrl: './register2.component.html',
  styleUrls: ['./register2.component.scss']
})
export class Register2Component implements OnInit {

  private userRegister:User;

  myformRes: FormGroup;
  FirstName: FormControl;
  LastName: FormControl;
  UserName: FormControl;
  PassWord: FormControl;
  RePass: FormControl;
  Email: FormControl;
  // DateOfBirth: FormControl; 
  Phone:FormControl;

  public Group:any = "GP07";

  constructor(private userService:UserService, private thongbao:ThongBaoService) { }

  ngOnInit() {
    this.createFormControl();
    this.createForm();
    $(".loi2").hide();
    $(".loi1").hide();

  }

  validateDate()
  {
    var regex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    var date = $("#DateOfBirth2");
    date.on("blur",function(){
      if(date.val() != "")
      {
          $(".loi1").hide();
      }
      if (regex.test(date.val()) == false) {
        $(".loi2").show();
        date.addClass("thatbai");
        $(".bar2").addClass("thatbai");
        $(".label2").addClass("thatbai2");
        $(".loi2").show();
      }
      else
      {
        $(".loi2").hide()
        date.removeClass("thatbai");
        $(".bar2").removeClass("thatbai");
        $(".label2").removeClass("thatbai2");
        $(".loi2").hide();
      }
    });
  }

  getToday()
  {
    var today:any = new Date();
    var dd:any = today.getDate();
    var mm:any = today.getMonth()+1;
    var yyyy:any = today.getFullYear();
    if(dd<10) {
        dd = '0'+dd
    } 
    if(mm<10) {
        mm = '0'+mm
    } 
    today = mm + '/' + dd + '/' + yyyy;
    return today;
  }

  
  //Form register value
  Register(user,sinhnhat)
  {
    if(this.myformRes.valid)
    {
      user.DateRegister = this.getToday();
      user.DateOfBirth = sinhnhat;
      user.GroupID = this.Group;

      $(".spinner").show();

      setTimeout(() => {
        this.userService.TaoTaiKhoan(user).subscribe((result:any)=>{
          this.userRegister = result;
          $(".spinner").hide();
          if(result == "Username already exists"){
            this.thongbao.Error("Tài khoản đã tồn tại!");
          }else{
            this.thongbao.Success("Đăng Ký thành công!");
            setTimeout(() => {
              this.myformRes.reset();
              $("#DateOfBirth2").val("");
              $(".lbdangnhap").trigger("click");
            }, 1000);
          }
          console.log(result);
        });
        
      }, 2000);
    
      
      


    }
    else
    {
      this.validateAllFormFields(this.myformRes);
    }

    // validate Date
    var date = $("#DateOfBirth2");
    if(date.val() == "")
    {
        $(".loi1").show();
        date.addClass("thatbai");
        $(".bar2").addClass("thatbai");
        $(".label2").addClass("thatbai2");
    }
    
  }

  // validate when submit
  validateAllFormFields(formGroup: FormGroup) {        
    Object.keys(formGroup.controls).forEach(field => { 
      const control = formGroup.get(field);             
      if (control instanceof FormControl) {             
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        
        this.validateAllFormFields(control);            
      }
    });
  }

  createFormControl()
  {
      this.FirstName = new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(8),
      Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$")
      ]),
      this.LastName = new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(8),
      Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$")
      ]),
      this.UserName = new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-zA-Z0-9]+$"),
      Validators.minLength(8),
      Validators.maxLength(15),
      ]),
      this.PassWord =  new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(8),
      ]),
      this.RePass = new FormControl('',[
      Validators.required,
      ])
      this.Email =  new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")      
      ]),
      // this.DateOfBirth = new FormControl();
      // this.DateOfBirth =  new FormControl('',[
      // Validators.required,
      // Validators.pattern("^(?:(?:10|12|0?[13578])/(?:3[01]|[12][0-9]|0?[1-9])/(?:1[8-9]\\d{2}|[2-9]\\d{3})|(?:11|0?[469])/(?:30|[12][0-9]|0?[1-9])/(?:1[8-9]\\d{2}|[2-9]\\d{3})|0?2/(?:2[0-8]|1[0-9]|0?[1-9])/(?:1[8-9]\\d{2}|[2-9]\\d{3})|0?2/29/[2468][048]00|0?2/29/[3579][26]00|0?2/29/[1][89][0][48]|0?2/29/[2-9][0-9][0][48]|0?2/29/1[89][2468][048]|0?2/29/[2-9][0-9][2468][048]|0?2/29/1[89][13579][26]|0?2/29/[2-9][0-9][13579][26])$"),
      // ]),
      this.Phone =  new FormControl('',[
      Validators.required
      ])
  }

  createForm()
  {
    this.myformRes = new FormGroup({
      FirstName: this.FirstName,
      LastName: this.LastName,
      UserName: this.UserName,
      PassWord: this.PassWord,
      RePass: this.RePass,
      Email: this.Email,
      // DateOfBirth: this.DateOfBirth,
      Phone: this.Phone,
    });
  }


}
