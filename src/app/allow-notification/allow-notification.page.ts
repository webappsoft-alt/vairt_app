import { Component, OnInit } from '@angular/core';
import { FcmService } from '../services/fcm.service'
import { AppComponent } from '../app.component'
@Component({
  selector: 'app-allow-notification',
  templateUrl: './allow-notification.page.html',
  styleUrls: ['./allow-notification.page.scss'],
})
export class AllowNotificationPage implements OnInit {
  loading :any
  ios_header:any

  constructor(public fcmService:FcmService,
    public appcomponent:AppComponent) {
      let check = window.localStorage.getItem('phone-model')
      if(check=='10'){
        this.ios_header = true;
      }else{
        this.ios_header = false
      }
     }

  ngOnInit() {
  }
  next(){
    this.loading = true
    this.fcmService.initPush();
    this.appcomponent.leftSlide('login')
  }
  move(){
    this.appcomponent.leftSlide('login')
  }
}
