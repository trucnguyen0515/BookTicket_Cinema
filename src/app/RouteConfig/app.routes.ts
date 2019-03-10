import {Routes,RouterModule} from '@angular/router'
import { from } from 'rxjs/observable/from';
import { componentFactoryName } from '@angular/compiler';
import { UserComponent } from '../user/user.component';
import { TrangChuComponent } from '../user/layout/trang-chu/trang-chu.component';
import { TrangChiTietComponent } from '../user/layout/trang-chi-tiet/trang-chi-tiet.component';
import { TrangDatVeComponent } from '../user/layout/trang-dat-ve/trang-dat-ve.component';
import { CheckLoginGuard } from '../Services/check-login.guard';
import { TrangCheckoutComponent } from '../user/layout/trang-checkout/trang-checkout.component';


const routing: Routes = [
    {path:'',component:UserComponent,children:
        [
            {path:'',component:TrangChuComponent},
            {path:'Home',component:TrangChuComponent}
        ]},

    {path:'Home',component:UserComponent,children:
        [
            {path:'ChiTietPhim',component:TrangChiTietComponent},
            {path:'DatVe',component:TrangDatVeComponent},
            {path:'Checkout',component:TrangCheckoutComponent}
        ]},
];
export const appRoutes = RouterModule.forRoot(routing)