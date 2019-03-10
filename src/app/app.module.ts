import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LayoutModule } from './user/layout/layout.module';
import { appRoutes } from './RouteConfig/app.routes';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { MovieService } from './Services/movie.service';
import { UserService } from './Services/user.service';
import { CheckLoginGuard } from './Services/check-login.guard';
import { ThongBaoService } from './Services/thong-bao.service';




@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    appRoutes,
    RouterModule,
    HttpModule,

    
  ],
  providers: [MovieService, UserService,CheckLoginGuard,ThongBaoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
