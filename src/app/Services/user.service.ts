import { Injectable } from '@angular/core';
import { User } from '../Models/User';
import { UserLogin } from '../Models/UserLogin';
import { Observable } from 'rxjs/Observable';
import { Http,Response,Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class UserService {

  private apiRegister = 'http://sv.myclass.vn/api/user/registeruser';
  private apiLogin = 'http://sv.myclass.vn/api/user/login';

  constructor(private _http:Http) { }

  public TaoTaiKhoan(user:User):Observable<any>
  {
    // de post dc json len server phai co header va body: tuy backend qui dinh khac nhau
    let header = new Headers();
    // phan nay do server qui dinh la json hay x-www
    header.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
    //Body la noi dung tham so dc gui len server o day la chuoi json voi ten tham so la data(serve qui dinh)
    let body = `data=${JSON.stringify(user)}`;
    var obServe = this._http.post(this.apiRegister,body,{headers:header}).map((result:Response) => result.json());
    return obServe;
  }

  public DangNhap(userLogin:UserLogin)
  {
    let header = new Headers();
    header.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
    let body = `data=${JSON.stringify(userLogin)}`;
    // goi service dang nhap
    let userResult:UserLogin = new UserLogin();
    let obServe = this._http.post(this.apiLogin,body,{headers:header}).map((result:Response)=> result.json());
    obServe.subscribe((result:any)=>{
      // lay ve kq => kt ket qua
      let kq = result;
      if(kq == 'The account or password is incorrect')
      {
        console.log(kq);
      }
      else
      {
        // Dang nhap thanh cong luu thong tin vao localstorage
        userResult.UserName = kq.UserName;
        userResult.FullName = kq.FullName;
        userResult.Email = kq.Email;
        userResult.Status = kq.Status;
        userResult.GroupID = kq.GroupID;
        // Xoa local storage dang nhap roi xet lai
        localStorage.removeItem('localUser');
        localStorage.setItem('localUser',JSON.stringify(userResult));
        location.reload();
      }
    });
    return obServe;
  }

  public DangNhap2(userLogin:UserLogin)
  {
    let header = new Headers();
    header.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
    let body = `data=${JSON.stringify(userLogin)}`;
    // goi service dang nhap
    let userResult:UserLogin = new UserLogin();
    let obServe = this._http.post(this.apiLogin,body,{headers:header}).map((result:Response)=> result.json());
    obServe.subscribe((result:any)=>{
      // lay ve kq => kt ket qua
      let kq = result;
      if(kq == 'The account or password is incorrect')
      {
        console.log(kq);
      }
      else
      {
        // Dang nhap thanh cong luu thong tin vao localstorage
        userResult.UserName = kq.UserName;
        userResult.FullName = kq.FullName;
        userResult.Email = kq.Email;
        userResult.Status = kq.Status;
        userResult.GroupID = kq.GroupID;
        // Xoa local storage dang nhap roi xet lai
        localStorage.removeItem('localUser');
        localStorage.setItem('localUser',JSON.stringify(userResult));
      }
    });
    return obServe;
  }

  public CheckLogin():boolean
  {
    let user = localStorage.getItem("localUser");
    if (user == null) {
      return false;
    }
    else{
      return true;
    }
  }

  public LayThongTinUser()
  {
    if (this.CheckLogin() == true) {
      let user: UserLogin = JSON.parse(localStorage.getItem("localUser"));
      return user;
    }
    return null;
  }

  public DangXuat(): void {
    localStorage.removeItem('localUser');
    location.reload();
  }

  public getUrl()
  {
    let url = window.location.href;
    return url;
  }

}
