import { Injectable } from '@angular/core';

declare var toastr:any;

@Injectable()
export class ThongBaoService {

  constructor() { 
    this.Setting();
  }

  Success(title:string, message?:string){
    toastr.success(title,message);
  }

  Error(title:string, message?:string){
    toastr.error(title,message);
  }

  clear(){
    toastr.clear();
  }

  Setting(){

    toastr.options = {
      "allowHtml":true,
      "closeButton": true,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-top-center",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "1000",
      "hideDuration": "1000",
      "timeOut": "2000",
      "extendedTimeOut": "2000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut",
      "tapToDismiss": false
    }
    
  }

}
