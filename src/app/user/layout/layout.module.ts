import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDatePickerModule } from 'mydatepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlModule } from 'ngx-owl-carousel';


import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TrangChuComponent } from './trang-chu/trang-chu.component';
import { SlideBannerComponent } from './trang-chu/slide-banner/slide-banner.component';
import { SlideListMovieComponent } from './trang-chu/slide-list-movie/slide-list-movie.component';
import { GroupCinemaComponent } from './trang-chu/group-cinema/group-cinema.component';
import { TrangChiTietComponent } from './trang-chi-tiet/trang-chi-tiet.component';

import { AniHoverDirective } from './HoverButton/ani-hover.directive';
import { LichChieuComponent } from './trang-chi-tiet/lich-chieu/lich-chieu.component';
import { ChiTietPhimComponent } from './trang-chi-tiet/chi-tiet-phim/chi-tiet-phim.component';
import { TrangDatVeComponent } from './trang-dat-ve/trang-dat-ve.component';
import { TongTienComponent } from './trang-dat-ve/tong-tien/tong-tien.component';
import { ChonSoLuongVeComponent } from './trang-dat-ve/chon-so-luong-ve/chon-so-luong-ve.component';
import { DetailShowtimeComponent } from './trang-dat-ve/detail-showtime/detail-showtime.component';
import { DanhSachGheComponent } from './trang-dat-ve/danh-sach-ghe/danh-sach-ghe.component';
import { GheComponent } from './trang-dat-ve/danh-sach-ghe/ghe/ghe.component';
import { ThanhToanComponent } from './trang-dat-ve/thanh-toan/thanh-toan.component';
import { LoginComponent } from './header/login/login.component';
import { RegisterComponent } from './header/register/register.component';
import { MovieService } from '../../Services/movie.service';
import { LoginRegisterComponent } from './header/login-register/login-register.component';
import { TrangCheckoutComponent } from './trang-checkout/trang-checkout.component';
import { HeaderNewComponent } from './header-new/header-new.component';
import { SearchComponent } from './header/search/search.component';
import { NewsComponent } from './trang-chu/news/news.component';
import { EventsComponent } from './trang-chu/events/events.component';
import { QuickBookComponent } from './quick-book/quick-book.component';
import { LoginRegister2Component } from './header-new/login-register2/login-register2.component';
import { Login2Component } from './header-new/login2/login2.component';
import { Register2Component } from './header-new/register2/register2.component';






@NgModule({
  imports: [
    CommonModule,
    MyDatePickerModule,
    FormsModule,
    ReactiveFormsModule,
    OwlModule
  ],
  exports:[
    HeaderComponent, 
    FooterComponent,
    TrangChuComponent,
    SlideBannerComponent, 
    SlideListMovieComponent, 
    GroupCinemaComponent,
    TrangChiTietComponent, 
    LichChieuComponent, 
    ChiTietPhimComponent,
    TrangDatVeComponent, 
    TongTienComponent, 
    ChonSoLuongVeComponent, 
    DetailShowtimeComponent,
    DanhSachGheComponent, 
    GheComponent, 
    ThanhToanComponent,
    LoginComponent, 
    RegisterComponent,
    LoginRegisterComponent,
    TrangCheckoutComponent,
    HeaderNewComponent,
    SearchComponent,
    NewsComponent,
    EventsComponent,
    QuickBookComponent,
    LoginRegister2Component,
    Login2Component,
    Register2Component

    ],
  declarations: [
    HeaderComponent,
    FooterComponent, 
    TrangChuComponent, 
    SlideBannerComponent, 
    SlideListMovieComponent, 
    GroupCinemaComponent, 
    TrangChiTietComponent, 
    AniHoverDirective, 
    LichChieuComponent, 
    ChiTietPhimComponent, 
    TrangDatVeComponent, 
    TongTienComponent, 
    ChonSoLuongVeComponent, 
    DetailShowtimeComponent, 
    DanhSachGheComponent, 
    GheComponent, 
    ThanhToanComponent, 
    LoginComponent, 
    RegisterComponent, LoginRegisterComponent, TrangCheckoutComponent, HeaderNewComponent, SearchComponent, NewsComponent, EventsComponent, QuickBookComponent, LoginRegister2Component, Login2Component, Register2Component, 
    
  ],
})
export class LayoutModule { }
