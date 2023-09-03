import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router'
import { ModalController, NavParams } from '@ionic/angular';
import { EmailConnectedPage } from '../email-connected/email-connected.page';
import { ApiService } from '../api/api.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from '../app.component'
@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  _currentPlatform:any
  email:any
  user_id:any
  user_email:any
  phone_no:any
  phone_connected:any
  email_stauts:any
  phone_status:any
  constructor(public platform:Platform,
    public modalController:ModalController,
    public service:ApiService,
    public appcomponent:AppComponent,
    public statusbar:StatusBar,
    public router:Router) { 
    }

    ionViewDidEnter(){
      this.email =  window.localStorage.getItem('email')
      let check_email =  window.localStorage.getItem('email_auth')
      
      if(check_email != null){
        this.email_stauts = window.localStorage.getItem('email_auth')
      }else{
        this.email_stauts = 'Not Connected'
      }
      let chk = window.localStorage.getItem('phone_auth')
      if(chk!=null){
        this.phone_connected = window.localStorage.getItem('phone_auth')
      }else{
        this.phone_connected = 'Not Connected'
      }
      this.statusbar.hide();

      this.user_id = window.localStorage.getItem('user_id')
      this.service.get_user_data(this.user_id).subscribe(res=>{
        console.log(res)
        this.user_email = res['user']['user_email']
        if(res['user']['user_mobile']==null){
          this.phone_connected = 'Not Connected'
        }else{
          this.phone_connected = 'Connected'
        }
        window.localStorage.setItem('phone_no',res['user']['user_mobile'])
      })
    }

  ngOnInit() {
    if (this.platform.is('ios')) {
      this._currentPlatform = 'ios';
    } else {
      this._currentPlatform = 'android';
    }
  }
  async email_(){
    // const modal = await this.modalController.create({
    //   component: EmailConnectedPage,
    //   cssClass:'email-slider',
    //   componentProps:{email:this.user_email}
    // });
    // modal.onDidDismiss().then((dataReturned) => {
    //   console.log(dataReturned)
    //   this.ionViewDidEnter()
    // });
    // return await modal.present();
      this.appcomponent.leftSlide('email')
  }
  phone(){
    this.appcomponent.leftSlide('phone')
  }
  close(){
   let page = this.service.getSettingBackPage()
   this.appcomponent.downSlidePre(page)
  }
  signout(){
    window.localStorage.clear()
    this.appcomponent.downSlidePre('login')
  }
  transaction(){
    this.appcomponent.leftSlide('transaction')
  }
  change_currency(){}
  feedback(){}
  privacy(){}
}
