import { Component, OnInit } from '@angular/core';
import { HostListener} from "@angular/core";
declare var $:any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  //scroll display button
  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
      $("#myBtn").show();
    } else {
      $("#myBtn").hide();
    }
  }

  //auto uptop when redirect
  onActivate(event: Event) {
    window.scrollTo(0, 0);
  }

  constructor() { }

  ngOnInit() {

    //click scroll smooth
    $('.navbar-nav a.nav-link').on('click', function(e) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
    });

    // upto smooth
    $('#myBtn').click(function () {
      $('body,html').animate({
        scrollTop: 0
      }, 800);
      return false;
    });
    

    }

}
