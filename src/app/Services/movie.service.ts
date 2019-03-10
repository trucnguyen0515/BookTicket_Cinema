import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http,Response,Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MovieService {

    private MaNhom:string = 'GP07';
    //Link trỏ đến api backend lấy danh sách phim
    private apiUrlGetMovie = 'http://sv.myclass.vn/api/movie/getmovie'; 
   
    //khởi tạo 1 đối tượng http để thực hiện các phương thức post, get về server
    constructor(private _http:Http) { }

    //Gọi service lấy danh sách phim từ server backend về
    public LayDanhSachPhim():Observable<any[]> {

      //get(): goi phương thức get gửi đến server yêu cầu lấy dữ liệu.
      /*map(): để đưa kiểu dữ liệu 1 chuỗi về dạng đối tượng response => từ reponse ta có thể parse ra
              kiểu dữ liệu json */
              let obServe:Observable<any>;
        obServe = this._http.get(this.apiUrlGetMovie).map((result:Response) => result.json());

        return obServe;

      
    }
  


    //Link trỏ đến api backend lấy thông tin phim, lịch chiếu, ...
    private apiUrlGetMovieDetail = 'http://sv.myclass.vn/api/movie/GetMovieDetail';
    //Lấy thông tin chi tiết của 1 phim dựa trên mã phim 
    public LayChiTietPhim_LichChieu(MaPhim:number):any {
      //map(): để đưa kiểu dữ liệu 1 chuỗi về dạng đối tượng response => từ reponse ta có thể parse ra kiểu dữ liệu json
      let obServe:Observable<any> = this._http.get(`${this.apiUrlGetMovieDetail}?id=${MaPhim}`).map((result:Response) => result.json());
      return obServe;
    }


  

    //Link trỏ đến api backend lấy thông tin phim, lịch chiếu, ... theo nhóm
    private apiUrlGetMovieDetailByGroup = 'http://sv.myclass.vn/api/movie/GetMovieDetailByGroup';
    //Lấy thông tin chi tiết của 1 phim dựa trên mã phim và mã nhóm
    public LayChiTietPhim_LichChieuTheoNhom(MaPhim:number,MaNhom:string):any {
         //map(): để đưa kiểu dữ liệu 1 chuỗi về dạng đối tượng response => từ reponse ta có thể parse ra kiểu dữ liệu json
         let obServe:Observable<any> = this._http.get(`${this.apiUrlGetMovieDetailByGroup}?id=${MaPhim}&groupID=${MaNhom}`)
         .map((result:Response) => result.json());
         return obServe;
    }

    
    private apiLoadGhe =`http://sv.myclass.vn/api/movie/GetCinimaRoomDetail`
    public LayDanhSachGhe(ShowTimeID:number):Observable<any[]> {
      let obServe:Observable<any> = this._http.get(`${this.apiLoadGhe}?ShowTimeID=${ShowTimeID}`).map((result:Response) => result.json());
      return obServe;
    }
      
  



     //Link trỏ đến api backend post thông tin danh sách ghế ngồi đã đặt , ... theo nhóm, theo người dùng
     private apiUrlPostBookingTickets = 'http://sv.myclass.vn/api/movie/BookingTickets';  
     public DatVe(lstVe:any):Observable<any> {
  
      //Để post được json lên server phải có header và body : tùy backend quy định khác nhau
      let header = new Headers();
      header.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      //Body là nội dung tham số gửi lên server ở đây là chuỗi json với tên tham số là data (server quy định)
      // lstVe = {ShowTimeID:3,Tickets:[{SeatID:'GP01_Rap01_A02',Price:85},{SeatID:'GP01_Rap01_A03',Price:85}],UserID:'khai123',GroupID:'GP01'};
    
      let body = `data=${JSON.stringify(lstVe)}`;
      var obServe = this._http.post(this.apiUrlPostBookingTickets, body, { headers: header }).map((result: Response) => result.json());
      return obServe;
     }


     public SearchPhim(dsphim,tenphim){
      let dsphimsearch = [];
      if(tenphim == ""){
        let mangRong = []
        return mangRong;
      }
      else {
        for(let i = 0; i < dsphim.length; i++){
          if(dsphim[i].Title.toLowerCase().indexOf(tenphim.toLowerCase()) > -1) {
            dsphimsearch.push(dsphim[i]);
          } 
        }
        return dsphimsearch;
      }
    }
  }
  