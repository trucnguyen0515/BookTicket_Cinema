import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Services/user.service';
import { CheckLoginGuard } from '../../../Services/check-login.guard';
import {
  Router
} from '@angular/router';

declare var $:any;


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private userSerivce:UserService, private router: Router) { }



  ngOnInit() {
    $("#myNavbar").css("top","0px");
    this.PopoverSearch();
    this.StickyTop();
  }

  chuyentrang() {
    this.router.navigate(['/Home'])
  }



  StickyTop()
  {
      // Sticky top
      window.onscroll = function () {
        myFunction();
      };
      
      // Sticky top
      var header = document.getElementById("myNav");
      var sticky = header.offsetTop;

      function myFunction() {
        if (window.pageYOffset >= sticky) {

          $("#logo2").addClass("showLogo");
          $(".navbar").css("box-shadow" , "0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12)");
          $("#myNav").css("background","#1f2531");
        } else {
          $("#logo2").removeClass("showLogo");
          $(".navbar").css("box-shadow","none");
          $("#myNav").css("background","#1f2531");
        }
      }
  }

  PopoverSearch()
  {
    // Popover Search
    $('#popover-content').hide();
    $("[data-toggle=popover]").popover({
      html: true,
      content: function () {
        return $('#popover-content').html();
      }
    });

    $("body").delegate("#searchok", "click", function () {
      $(".popover-body").css("border","4px solid #81d8d0");
      $(".arrow").css("margin-top","4px");
      $(".popover .fade .bs-popover-bottom .show").css("margin-top","40px");
      $(".popover").css("z-index","3000");
      $(".popover").css("margin-top","14px")
    });
  }

}
