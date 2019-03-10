import {CanActivate, Router} from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

declare var $:any;
@Injectable()
export class CheckLoginGuard implements CanActivate{
    constructor(private userService:UserService,private router:Router){
    }

    canActivate()
    {
        if(this.userService.CheckLogin() == false)
        {
            return false;
        }
        return true
    
    }
}